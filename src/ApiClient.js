// import fetch from 'node-fetch';
// import _ from 'lodash'

export default class ApiClient {
  constructor(params) {
    this.base = params.base
    this.prefix = params.prefix

    if (params.auth) {
      this.setAuth(params.auth)
    }
  }

  setAuth(authParams) {
    return this.authPromise = this.authLogin(authParams)
    .then(data => {
      this.user = data.user
      this.authToken = data.token
    })
  }

  authLogin(data) {
    return this.fetch('/auth/login', {
      prefix: '',
      method: 'POST',
      body: data,
    })
  }

  authValidate(data) {
    return this.fetch('/auth/validate', {
      prefix: '',
      method: 'GET',
      body: data,
    })
  }


  authFetch(...args) {
    return this.authPromise.then(() => (
      this.fetch(...args)
    ))
  }

  fetch(path, options = {}) {
    const prefix = options.prefix || this.prefix
    let url
    if (path.substr(0, 5) === 'http:' || path.substr(0, 6) === 'https:') {
      url = path
    } else {
      if (path[0] === '/') {
        url = this.base + path
      } else {
        url = this.base + prefix  + '/' + path
      }
    }
    // if (_.isPlainObject(options.body)) {
    if (typeof options.body !== 'string') {
      options.body = JSON.stringify(options.body)
    }
    if (!options.headers) options.headers = {}
    if (!options.headers['Accept']) options.headers['Accept'] = 'application/json'
    if (!options.headers['Content-Type']) options.headers['Content-Type'] = 'application/json; charset=utf-8'
    if (!options.headers['Authorization'] && this.authToken)
      options.headers['Authorization'] = 'Bearer ' + this.authToken


    return fetch(url, options) ///
    .then(res => {
      return res.json()
    })
    .then(pack => {
      if(pack.err) {
        console.log('pack.err', pack.err)
        // console.error ? console.error(pack.err) : console.log(pack.err)
        throw pack.err
      }
      return pack.data
    })
  }
}
