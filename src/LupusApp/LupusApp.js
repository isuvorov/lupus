import ReactApp from 'babel!lego-starter-kit/src/ReactApp'
import api from './api'

export default class LupusApp extends ReactApp {
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
    // const Project = this.models.Project
    this.app.get('/', (req, res) => {
      return res.send(this.renderHtml(<div>Lupus home</div>))
    })
    this.app.use('/api', api(this))
    this.useStaticPublic(__dirname + '/../../public')
  }
  useDefaultRoute() {
    this.app.use('*', (req, res) => res.err(this.errors.e404('Route not found')))
  }
}
