import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Sidebar from '../layout/Sidebar';
import LectureList from './LectureList';
import Room from './Room/Room';
import AssignmentView from './assignments/AssignmentView';
import AssignmentUpload from './assignments/AssignmentUpload';
import AssignmentEval from './assignments/AssignmentEval';

import './Dashboard.css';

class Dashboard extends Component {
    ProfStudRoute = () => {
        if (this.props.auth.user.is_staff===false) {
            return (
                <div className='dashboard'>
                    <Route exact path='/' component={LectureList} />
                    <Route path='/lecture/:id' component={Room} />
                    <Route path='/assignment/view' component={AssignmentView} />
                    <Route path='/assignment/upload' component={AssignmentUpload} />
                </div>
            )
        } else if (this.props.auth.user.is_staff===true) {
            return (
                <div className='dashboard'>
                    <Route exact path='/' component={LectureList} />
                    <Route path='/lecture/:id' component={Room} />
                    <Route path='/assignment/view' component={AssignmentView} />
                </div>
            )
        }
    }

    render() {
        return (
            <div className='p-dashboard'>
                <div className='sidebar'>
                    <Sidebar />
                </div>
                {this.ProfStudRoute()}
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