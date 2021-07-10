import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import LogIn from './components/LogIn'
import Register from './components/Register'
import { AuthProvider } from './components/Auth'
import FirebaseCrud from './components/FirebaseCrud'

function App() {
  return (
    <AuthProvider>
      <Router>
          <Switch>
          <Route exact path="/" component={Home} /> 
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/firebasecrud" component={FirebaseCrud} />
          </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
