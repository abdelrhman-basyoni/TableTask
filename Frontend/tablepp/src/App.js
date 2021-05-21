import { BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom';
import LoginScreen from './Screens/LoginScreen'
import Main from './Screens/Main'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
      <Route {...rest}
          render={(props) =>
              localStorage.getItem("authToken") ? (
                  < Component {...props} />
              ) : (
                      <Redirect to="/login" />
                  )

          }

      />
  );
};

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Main} />
        <Route exact path="/login" component={LoginScreen} />
      </Switch>
    </Router>
  );
}

export default App;
