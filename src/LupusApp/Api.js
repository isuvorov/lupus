import asyncRouter from '~/utils/AsyncRouter';

export default (ctx) => {
  const api = asyncRouter();

  const Project = ctx.models.Project
  const e404 = ctx.errors.e404('Project not found')

  api.all('/', (req, res) => res.ok({title: 'api', version: 1}))
  api.get('/projects', () => Project.find())
  api.post('/projects', (req) => {
    const project = new Project(req.body)
    return project.save()
  })

  api.get('/projects/byName/:name', (req) => Project.findOne({name: req.params.name}))
  api.get('/projects/:id', (req) => Project.findOne({_id: req.params.id}))
  api.get('/projects/byName/:name/runTask/:task', (req) => {
    return Project.findOne({name: req.params.name}).then(project => {
      if (!project) throw e404
      return project.runTask(req.params.task)
    })
  })
  api.get('/projects/:id/runTask/:task', (req) => {
    return Project.findOne({_id: req.params.id}).then(project => {
      if (!project) throw e404
      return project.runTask(req.params.task)
    })
  })
  api.get('/projects/byName/:name/syncFs', (req) => {
    return Project.findOne({name: req.params.name}).then(project => {
      if (!project) throw e404
      return project.syncFs()
    })
  })
  return api;
}
