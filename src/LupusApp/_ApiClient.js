// import fetch from 'node-fetch';
// import _ from 'lodash'

export default class ApiClient {
  constructor(params) {
    this.base = params.base
    if (params.prefix) {
      if (params.prefix[params.prefix.length - 1] === '/') {
        this.prefix = params.prefix.substr(0, params.prefix.length - 1)
      } else {
        this.prefix = params.prefix
      }
    }

    if (params.auth) {
      this.setAuth(params.auth)
    }
  }

  setAuth(authParams) {
    this.authPromise = this.authLogin(authParams)
    .then(data => {
      this.user = data.user
      this.authToken = data.token
    })
    return this.authPromise
  }

  authFetch(...args) {
    if (!this.authPromise) {
      return Promise.reject('!this.authPromise')
    }
    return this.authPromise.then(() => (
      this.fetch(...args)
    ))
  }

  authLogin(data) {
    console.log('data', data);
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

  onError(err) {
    console.log('pack.err', err)
    throw err
  }

  fetch(path, params = {}) {
    const options = Object.assign({}, params)
    const prefix = options.prefix || this.prefix || ''
    let url
    if (path.substr(0, 5) === 'http:' || path.substr(0, 6) === 'https:') {
      url = path
    } else {
      const base = this.base || ''
      if (path[0] === '/' || !prefix) {
        url = [base, path].join('/')
      } else {
        url = [base, prefix, path].join('/')
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


    return fetch(url, options)
    .then(res => {
      return res.json()
    })
    .then(pack => {
      if(pack.err) {
        return this.onError(pack.err, pack)
      }
      return pack.data
    })
  }
}
