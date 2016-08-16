import _ApiClient from './_ApiClient'

export default class ApiClient extends _ApiClient {
  getProject(projectID) {
    return this.fetch(`projects/${projectID}`, {
      method: 'GET',
    })
  }
  setProject(projectID, data) {
    return this.fetch(`projects/${projectID}`, {
      method: 'PUT',
      body: data,
    })
  }
  getProjects() {
    return this.fetch('projects', {
      method: 'GET',
    })
  }
  createProject(name) {
    return this.fetch('projects', {
      method: 'POST',
      body: JSON.stringify({ name }),
    })
  }
}
