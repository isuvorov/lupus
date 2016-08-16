// import App from '../components/Projects'
import Projects from '../containers/Projects'
// import Auth from '../containers/Auth'
import LoginPage from './LoginPage'
import ErrorPage from './ErrorPage'
import Wrapper from './Wrapper'

import { Provider } from 'react-redux'

import App from '../App'


export default {

  path: '/',

  children: [
    // {
    //   path: '/auth',
    //   action() {
    //     return <Auth />
    //   },
    // },
    {
      path: '/login',
      action() {
        return <LoginPage />
      },
    },
    {
      path: '/projects/:name',
      action(ctx, {name}) {
        return <div>projects {name}</div>
      },
    },
    {
      path: '/projects',
      async action() {
        return <div>
          <Projects />
        </div>
      },
    },
    {
      path: '/',
      action() {
        return <div>Home</div>
      },
    },
    {
      path: '/error',
      action({ render, context, error }) {
        return render(
          <App context={context} error={error}>
            <ErrorPage error={error} />
          </App>,
          error.status || 500
        );
      },
    },
  ],

  async action({ next, render, context }) {
    const component = await next();
    if (component === undefined) return component;
    // const component = await next();
    return render(
      <App context={context}>
        {component}
      </App>
    );
  },

};
