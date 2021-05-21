import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginScreen from './Screens/LoginScreen'

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={LoginScreen} /> */}
        <Route exact path="/login" component={LoginScreen} />
      </Switch>
    </Router>
  );
}

export default App;
