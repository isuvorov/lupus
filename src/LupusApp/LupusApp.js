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
    this.app.get('/', (req, res) => {
      return res.send(this.renderHtml(<div>LUPUS</div>))
    })



    this.app.get('/projects', (req, res) => {
      Project.find().then(projects => {


        return res.send(this.renderHtml(
          <div>
             Проекты
             <table>
              <tr>

              </tr>
              
             </table>
          </div>
        ));

        return res.ok({projects})
      }).catch(res.err)
    })


    this.app.get('/api/v1/projects', (req, res) => {
      Project.find().then(projects => {
        return res.ok({projects})
      }).catch(res.err)
    })




    this.app.all('/projects/refresh', (req, res) => {
      Project.findOne({name: req.query.name}).then(project => {
        project.refresh()
        return res.ok(true)
      }).catch(res.err)
    })
  }
  useDefaultRoute() {
    this.app.use('*', (req, res) => res.send(this.renderHtml(<div>renderComponent</div>)))
  }

}
