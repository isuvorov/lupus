import ReactApp from 'babel!lego-starter-kit/src/ReactApp'
import api from './api'
import routes from './routes'
import assets from './assets'; // eslint-disable-line import/no-unresolved
import UniversalRouter from 'universal-router';
import ReactDOM from 'react-dom/server';
import Html from './components/Html'

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
    // this.app.get('/', (req, res) => {
    //   return res.send(this.renderHtml(<div>Lupus home</div>))
    // })
    this.app.use('/api', api(this))
    this.app.get('*', this.applyUniversalRouter(routes, {script: assets.main.js}));
    this.useStaticPublic(__dirname + '/../../public')
  }
  applyUniversalRouter(routes, data) {
    return async (req, res, next) => {
      try {
        let css = [];
        let statusCode = 200;

        await UniversalRouter.resolve(routes, {
          path: req.path,
          query: req.query,
          context: {
            insertCss: (...styles) => {
              styles.forEach(style => css.push(style._getCss())); // eslint-disable-line no-underscore-dangle, max-len
            },
            setTitle: value => (data.title = value),
            setMeta: (key, value) => (data[key] = value),
          },
          render(component, status = 200) {
            css = [];
            statusCode = status;
            console.log('111');
            data.children = ReactDOM.renderToString(component);
            console.log(222);
            data.style = css.join('');
            return true;
          },
        });

        console.log(444);

        const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
        console.log(555);

        res.status(statusCode);
        res.send(`<!doctype html>${html}`);
      } catch (err) {
        console.log('!!!!!!!!!!!!');
        console.log(err)
        next(err);
      }
    }
  }

  useDefaultRoute() {
    this.app.use('*', (req, res) => res.err(this.errors.e404('Route not found')))
  }
}
