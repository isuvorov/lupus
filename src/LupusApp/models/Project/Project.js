import _ from 'lodash'
import fs from 'fs'
// import rr from 'react-routing/src/resolve'
// import Repo from 'git-repository/src/Repository'
const Repo = require('babel!git-repository/src/Repository').default
const cp = require('babel!git-repository/src/utils/cp').default

export function getSchema(ctx) {
  const mongoose = ctx.db

  const schema = new mongoose.Schema({
    name: {
      type: String,
    },
    repos: {
      type: Object,
    }
  },
  {
    timestamps: true
  })


  schema.methods.createDir = function(dir) {
    try{
      fs.mkdirSync(this.getDir());
    } catch(e){}
  }

  schema.methods.getDir = function(path) {
    if(path){
      return ctx.config.projectsDir + '/' + this.name + '/' + path
    }
    return ctx.config.projectsDir + '/' + this.name
  }
  schema.methods.getFiles = function(path) {
    const files = {}
    const filenames = fs.readdirSync(this.getDir())
    filenames.map(filename => {
      try{
        const filepath = path + '/' + filename
        files[filename] = fs.readFileSync(filepath).toString()
      } catch(e) {}
    })
    return files
  }

  schema.statics.repoRefresh = async function(path, repoUrl) {
    let repo = null
    try {
      repo = await Repo.open(path)
      try{
        const code = await repo.pull()
        ctx.log.trace('repo.pull code', code)
      }catch(e){
        ctx.log.error('repo.pull', e)
      }
    }catch(e){
      try {
        repo = await Repo.clone(path, repoUrl)
      }catch(e){
        ctx.log.error('repo.clone', e)
      }
    }
    return repo
  }
  schema.methods.reposRefresh = function() {
    ctx.log.trace('gitRefresh', this.repos)
    const promises =_.map(this.repos, (repoUrl, path) => {
      const repoPath = this.getDir(path)
      return schema.statics.repoRefresh(repoPath, repoUrl)
    })
    return Promise.all(promises)
  }

  // schema.statics.dockerRefresh = async function(path) {
  //   const opts = { cwd: path, stdio: 'inherit' };
  //   return cp.spawn('docker-compose', ['up', 'run']);
  // }
  schema.statics.dockerRefresh = async function(path) {
    const opts = { cwd: path, stdio: 'inherit' };
    return cp.spawn('docker-compose', ['up','-d']);
  }

  schema.methods.dockerRefresh = async function(path) {
    return schema.statics.dockerRefresh(this.getDir())
  }

  schema.statics.nginxRefresh = async function() {
    const opts = { cwd: '/', stdio: 'inherit' };
    return cp.spawn('service', ['nginx','reload']);
  }
  // schema.methods.nginxRefresh = async function(path) {
  //   return schema.statics.nginxRefresh(this.getDir())
  // }

  schema.statics.npmRefresh = async function(path) {
    const opts = { cwd: path, stdio: 'inherit' };
    return cp.spawn('npm', ['install'], opts);
  }

  schema.methods.npmsRefresh = function() {
    this.npms = ['some']
    ctx.log.trace('npmRefresh', this.npms)

    const promises =_.map(this.npms, (path) => {
      const npmPath = this.getDir(path)
      return schema.statics.npmRefresh(npmPath)
    })
    return Promise.all(promises)
  }

  schema.methods.refresh = async function() {
    this.createDir()

    // const isChanged = this.reposRefresh()
    // if (!isChanged) return false

    ctx.log.trace('reposRefresh start')
    try{
      await this.reposRefresh()
    }catch(err){
      ctx.log.error(err)
      return false
    }

    ctx.log.trace('npmsRefresh start')
    try{
      await this.npmsRefresh()
    }catch(err){
      ctx.log.error(err)
      return false
    }

    ctx.log.trace('dockerRefresh start')
    try{
      await this.dockerRefresh()
    }catch(err){
      ctx.log.error(err)
      return false
    }

    ctx.log.trace('nginxRefresh start')
    try{
      await schema.statics.nginxRefresh()
    }catch(err){
      ctx.log.error(err)
      return false
    }
    
    ctx.log.verbose('refresh complete')
    return true
  }
  schema.methods.toJSON = function() {
    return Object.assign({}, this.toObject(), {
      dir: this.getDir(),
      files: this.getFiles(this.getDir())
    })
  }





  return schema
}

export default (ctx) => {
  return ctx.db.model('Project', getSchema(ctx), 'project')
}
