import ReactApp from '~/ReactApp'
// import ReactApp from '~/utils/AsyncRouter'

// import getModels from './getModels'

export default class LupusApp extends ReactApp{

  init() {
    this.config.projectsDir = '/Users/isuvorov/projects/remote/projects'
    super.init()
  }
  getModels() {
    const superModels = super.getModels()
    const models = {
      Project: require('./models/Project').default(this),
    }
    return Object.assign(superModels, models)
  }

  useRoutes() {
    const Project = this.models.Project
    this.app.get('/', (req, res) => {
      Project.find().then(projects => {
        return res.json({projects})
      })
    })
    this.app.get('/projects', (req, res) => {
      Project.find().then(projects => {
        return res.ok({projects})
      })
    })

    this.app.get('/projects/refresh', (req, res) => {
      Project.findOne({name: req.query.name}).then(project => {

        project.refresh()
        return res.ok({project})
      }).catch(res.err)
    })


  }
  useDefaultRoute() {
    this.app.use('*', (req, res) => res.send(this.renderHtml(<div>renderComponent</div>)))
  }

}
