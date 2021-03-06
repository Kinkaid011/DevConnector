import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import './App.css';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={ Landing } />
      <section className="container">
        <switch>
          <Route exact path="/register" component={ Register } />
          <Route exact path="/Login" component={ Login } />
        </switch>
      </section> 
    </Fragment>
  </Router>
  
);
  
 
 

export default App;
