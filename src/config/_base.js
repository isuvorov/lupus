/* eslint key-spacing:0 spaced-comment:0 */
import _debug from 'debug'
import path from 'path'
import { argv } from 'yargs'
const pkg = require('../../package.json')

const config = {
  name: pkg.name,
  env : process.env.NODE_ENV || process.env.ENV || 'development',
  port : process.env.PORT || 8080,
  // port : process.env.PORT || 3000,
  host: 'localhost',

  projectsDir: process.env.projectsDir || '/Users/isuvorov/projects/remote',


  db: {
    uri: 'mongodb://s2.mgbeta.ru:10098/lupus',
    options: {},
  },
  jwt: {
    secret: 'qweqweqwe12312312',
    devToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1NzU1NjU0YWYxZjJmODA1N2JhM2U3NWUiLCJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNDY1MjU2Mzc2fQ._eEmsRtL_FuFOwVAtDf5GYio2YSvJwFB0lkSEMxkkbQ'
  }
}

  // env : process.env.NODE_ENV || process.env.ENV || 'development',
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test',
  '__DEBUG__'    : config.env === 'development' && !process.env.NODEBUG,
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

export default config
