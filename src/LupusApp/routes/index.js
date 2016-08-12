import App from '../components/App'
import Wrapper from './Wrapper'

const home = {
  path: '/',

  children: [
  ],
  async action() {
    return <div>
      123123
      <App />
    </div>
  },
}


export default {

  path: '/',

  children: [
    home,
    // contact,
    // login,
    // register,
    // content,
    // error,
  ],

  async action({ next, render, context }) {
    const component = await next();
    return render(
      <Wrapper context={context}>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css" />
        {component}
      </Wrapper>
    );
  },

};
