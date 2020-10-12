import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Sidebar from '../layout/Sidebar';
import LectureList from './LectureList';
import Room from './Room/Room';
import AssignmentView from './assignments/AssignmentView';
import AssignmentUpload from './assignments/AssignmentUpload';

import './Dashboard.css';

class Dashboard extends Component {
    render() {
        return (
            <div className='p-dashboard'>
                <div className='sidebar'>
                    <Sidebar />
                </div>
                <div className='dashboard'>
                    <Route exact path='/' component={LectureList} />
                    <Route path='/lecture/:id' component={Room} />
                    <Route path='/assignment/view' component={AssignmentView} />
                    <Route path='/assignment/upload' component={AssignmentUpload} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(Dashboard);