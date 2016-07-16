import 'babel-polyfill';

import config from './config'
import logger from '~/utils/logger'
import App from '#/LupusApp'


const ctx = {
  config,
  log: logger({name: 'app'})
}
const app = new App(ctx)
app.run().then((app) => {
  console.log(`🎃  The server is running at http://127.0.0.1:${app.config.port}/`)
})
