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
  }

  render(){
    return (
      <Provider store={store}>
          <Header />
          <PrivateRoute exact path='/' component={Dashboard} />
          <Route path='/edit/:id' component={LectureEdit} />
          <Route path='/register' component={RegisterForm} />
          <Route path='/login' component={LoginForm} />
          {/* <Route path='/lecture/:id' component={Assignment} /> */}
      </Provider>
    );
  }
}

export default App;