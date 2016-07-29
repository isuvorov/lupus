import _ from 'lodash'
import fs from 'fs'
import cp from './cp'

export function getSchema(ctx) {
  const mongoose = ctx.db

  const schema = new mongoose.Schema({
    name: {
      type: String,
    },
    info: {
      type: Object,
    },
    repos: {
      type: Object,
    },
    tasks: [{
      // type: Object,
      name: String,
      type: {
        type: String,
        default: 'sh',
      },
      content: String,
      // type: Object,
    }],
    files: [{
      name: String,
      content: String,
    }],
  }, {
    timestamps: true,
  })

  //
  // schema.methods.createDir = function(dir) {
  //   try{
  //     fs.mkdirSync(this.getDir());
  //   } catch(e){}
  // }

  schema.methods.getDir = function (path) {
    if (path) {
      return ctx.config.projectsDir + '/' + this.name + '/' + path
    }
    return ctx.config.projectsDir + '/' + this.name
  }

  schema.methods.getFilenames = function () {
    return fs.readdirSync(this.getDir())
  }

  schema.methods.getFiles = function (path) {
    const files = {}
    const filenames = this.getFilenames()
    filenames.forEach(filename => {
      try {
        const filepath = path + '/' + filename
        files[filename] = fs.readFileSync(filepath).toString()
      } catch (e) { } // eslint-disable-line
    })
    return files
  }

  // schema.statics.repoRefresh = async (path, repoUrl) => {
  //   let repo = null
  //   try {
  //     repo = await Repo.open(path)
  //     try {
  //       const code = await repo.pull()
  //       ctx.log.trace('repo.pull code', code)
  //     } catch (e) {
  //       ctx.log.error('repo.pull', e)
  //     }
  //   } catch (e) {
  //     try {
  //       repo = await Repo.clone(path, repoUrl)
  //     } catch (e) {
  //       ctx.log.error('repo.clone', e)
  //     }
  //   }
  //   return repo
  // }
  // schema.methods.reposRefresh = function () {
  //   ctx.log.trace('gitRefresh', this.repos)
  //   const promises = _.map(this.repos, (repoUrl, path) => {
  //     const repoPath = this.getDir(path)
  //     return schema.statics.repoRefresh(repoPath, repoUrl)
  //   })
  //   return Promise.all(promises)
  // }
  // schema.statics.dockerRefresh = async function(path) {
  //   const opts = { cwd: path, stdio: 'inherit' };
  //   return cp.spawn('docker-compose', ['up', 'run']);
  // }
  // schema.statics.dockerRefresh = async function(path) {
  //   const opts = { cwd: path, stdio: 'inherit' };
  //   return cp.spawn('docker-compose', ['up', '-d']);
  // }
  //
  // schema.methods.dockerRefresh = async function(path) {
  //   return schema.statics.dockerRefresh(this.getDir())
  // }
  //
  // schema.statics.nginxRefresh = async function() {
  //   const opts = { cwd: '/', stdio: 'inherit' };
  //   return cp.spawn('service', ['nginx', 'reload']);
  // }
  // schema.methods.nginxRefresh = async function(path) {
  //   return schema.statics.nginxRefresh(this.getDir())
  // }
  // schema.statics.npmRefresh = async function(path) {
  //   const opts = { cwd: path, stdio: 'inherit' };
  //   return cp.spawn('npm', ['install'], opts);
  // }
  //
  // schema.methods.npmsRefresh = function () {
  //   this.npms = ['some']
  //   ctx.log.trace('npmRefresh', this.npms)
  //
  //   const promises = _.map(this.npms, (path) => {
  //     const npmPath = this.getDir(path)
  //     return schema.statics.npmRefresh(npmPath)
  //   })
  //   return Promise.all(promises)
  // }
  //
  // schema.methods.refresh = async function() {
  //   // const isChanged = this.reposRefresh()
  //   // if (!isChanged) return false
  //
  //   ctx.log.trace('reposRefresh start')
  //   try {
  //     await this.reposRefresh()
  //   } catch (err) {
  //     ctx.log.error(err)
  //     return false
  //   }
  //
  //   ctx.log.trace('npmsRefresh start')
  //   try {
  //     await this.npmsRefresh()
  //   } catch (err) {
  //     ctx.log.error(err)
  //     return false
  //   }
  //
  //   ctx.log.trace('dockerRefresh start')
  //   try {
  //     await this.dockerRefresh()
  //   } catch (err) {
  //     ctx.log.error(err)
  //     return false
  //   }
  //
  //   ctx.log.trace('nginxRefresh start')
  //   try {
  //     await schema.statics.nginxRefresh()
  //   } catch (err) {
  //     ctx.log.error(err)
  //     return false
  //   }
  //
  //   ctx.log.verbose('refresh complete')
  //   return true
  // }
  // schema.methods.toJSON = function () {
  //   return Object.assign({}, this.toObject(), {
  //     dir: this.getDir(),
  //     // files: this.getFiles(this.getDir())
  //   })
  // }

  schema.methods.syncFs = async function () {
    const writeFile = Promise.promisify(fs.writeFile)
    const mkdir2 = Promise.promisify(fs.mkdir)
    const mkdir = (dir) => mkdir2(dir).catch(e => {
      if (e.code !== 'EEXIST') throw e
    })

    await mkdir(this.getDir())
    await mkdir(this.getDir('logs'))
    await mkdir(this.getDir('tasks'))

    const tasks = this.tasks || []
    const promises1 = _.map(tasks, task => {
      return writeFile(this.getDir(`tasks/${task.name}.${task.type}`), task.content)
    })
    await Promise.all(promises1)

    const files = this.files || []
    const promises2 = _.map(files, file => {
      return writeFile(this.getDir(`${file.name}`), file.content)
    })
    await Promise.all(promises2)

    return {
      name: this.name,
      dit: this.getDir(),
      tasks,
    }
  }

  schema.methods.runTask = function (taskName) {
    const task = _.find(this.tasks, {name: taskName})
    console.log('taskName', taskName, task);
    if (task.type === 'sh') {
      const filename = this.getDir(`tasks/${task.name}.${task.type}`)

      // const opts = { cwd: this.getDir() }; // , stdio: 'inherit'
      // cp.spawn('echo', ["filename"]);
      //
      //   try{
      //   const [code, out, err] = cp.exec('/bin/sh', [filename], { cwd: this.getDir() })
      //   return {
      //     task,
      //     code,
      //     out,
      //     err,
      //   }
      // } catch(err) {
      //
      // }
      // return cp.exec('echo', [filename], { cwd: this.getDir() })
      return cp.exec('/bin/sh', [filename], { cwd: this.getDir() })
      .catch((code, out, err) => {
        console.log('err', code, out, err);
        return new Error(code, err)
      })
      .then(([code, out, err]) => {
        if (code !== 0) throw {status: 500, code, message: err}
        // if (code !== 0) throw new Error({code, message: err})
        return {
          task,
          code,
          out,
          err,
        }
      })
    }
    return {
      task,
    }
  }

  return schema
}

export default (ctx) => {
  return ctx.db.model('Project', getSchema(ctx), 'project')
}
