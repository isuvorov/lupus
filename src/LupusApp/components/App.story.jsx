import AppContainer from './AppContainer';
/* eslint-disable */
const project = {
  "_id": "578752bbf1f2f80ae6e18765",
  repos: {
    src: "https://github.com/mgbeta/chat"
  },
  "name": "bot.mgbeta.ru",
  "dir": "/Users/isuvorov/projects/remote/bot.mgbeta.ru",
  "files": {
    "docker-compose.yml": "version: '2'\nservices:\n  app:\n    image: node:5.11.1-onbuild\n    working_dir: /app/src\n    command: /bin/bash -c \"npm start\"\n    volumes:\n        - ./install.sh:/root/install.sh\n        - ./app:/app/src\n    ports:\n      - 127.0.0.1:8000:8080\n",
    "install.sh": "npm install\n# docker-compose run app bash /root/install.sh\n",
    "nginx.conf": "server {\n  server_name bot.s3.mgbeta.ru;\n  listen 80;\n\n  access_log /projects/bot.mgbeta.ru/logs/access.log;\n  error_log /projects/bot.mgbeta.ru/logs/error.log;\n\n  include /projects/.nginx/errors.conf;\n\n  location / {\n    proxy_pass  http://127.0.0.1:8099;\n    include /projects/.nginx/proxy.conf;\n  }\n}\n"
  },
  "repositories": {
    "chat": "https://github.com/mgbeta/chat",
    "bot": "https://github.com/mgbeta/bot"
  },
  "general": {
    "foo": "bar"
  }
}
const user = {
  username: "admini",
  avatar: "https://cdn2.iconfinder.com/data/icons/danger-problems/512/anonymous-512.png"
}

/* eslint-enable */

module.exports = ({ storiesOf, action }) => {
  const projects = [
    // Object.assign({}, project, { name: 'chat.mgbeta.ru' }),
    // Object.assign({}, project, { name: 'biz-accord.ru' }),
    project,
  ]
  // onChange={action('onChange')}
  // onSubmit={action('onSubmit')}
  return storiesOf('Lupus', module)
    .add('Default', () => (
      <AppContainer
        user={user}
        projects={projects}
      />
    ))
}
