import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store';

import { loadUser } from '../actions/auth';

import Header from '../components/layout/Header';
import Dashboard from '../components/lectures/Dashboard';
import LectureEdit from '../components/lectures/LectureEdit';
// import Assignment from '../components/assignments/Assignment';

import PrivateRoute from '../components/common/PrivateRoute';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser());

    const script = document.createElement("script");
    script.src = "https://anijs.github.io/lib/anijs/anijs-min.js";
    document.body.appendChild(script);

    const script2 = document.createElement("script");
    script2.src = "https://anijs.github.io/lib/anijs/helpers/dom/anijs-helper-dom-min.js";
    document.body.appendChild(script2);
  }

  render(){
    return (
      <Provider store={store}>
          <Header />
          <PrivateRoute path='/' component={Dashboard} />
          <Route path='/edit/:id' component={LectureEdit} />
          <Route path='/register' component={RegisterForm} />
          <Route exact path='/login' component={LoginForm} />
      </Provider>
    );
  }
}

export default App;