import App from '../components/App'
import Wrapper from './Wrapper'

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
export default {

  path: '/',

  children: [
    // home,
    // contact,
    // login,
    // register,
    // content,
    // error,
  ],

  async action({ next, render, context }) {
    // const component = await next();
    // if (component === undefined) return component;
    // <App
    //   projects={projects}
    //   onChange={action('onChange')}
    //   onSubmit={action('onSubmit')}
    // />
    return render(
      <div>
        {/*Test*/}
        <Wrapper>
          Wrapper!!!
          {/*<App
            projects={[project]}
          />*/}
        </Wrapper>
        {/*Div*/}
        {/*<App context={context}>{component}</App>*/}
      </div>
    );
  },

};
