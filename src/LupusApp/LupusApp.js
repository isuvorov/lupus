import ReactApp from 'babel!lego-starter-kit/src/ReactApp'

export default class LupusApp extends ReactApp{

  init() {
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
    console.log('useRoutes')
    this.app.get('/', (req, res) => {
      console.log('get /')
      Project.find().then(projects => {
        console.log('Project.find then')
        res.json({projects})
        console.log('res.json')
      }).catch(res.err)
    })
    this.app.get('/projects', (req, res) => {
      Project.find().then(projects => {
        return res.ok({projects})
      }).catch(res.err)
    })

    this.app.all('/projects/refresh', (req, res) => {
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
