import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <div>
          <Switch>
            <Route path='/' component={HomePage} exact />
            <Route path='/about' component={AboutPage} />
            <Route path='/login' component={LoginPage} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}