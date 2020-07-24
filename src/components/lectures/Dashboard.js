import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Sidebar from '../layout/Sidebar';
import LectureList from './LectureList';
import LectureCreate from './LectureCreate';

import styles from './Dashboard.module.css';

class Dashboard extends Component {
    render() {
        const { user } = this.props.auth;

        return (
            <div className='ui'>
                <div className={ styles['sidebar'] }>
                    <Sidebar />
                </div>
                <div className={ styles['dashboard'] }>
                    <div className={ styles['dashboard-wrapper'] }>
                        {/* {user.is_staff === true ? <LectureCreate /> : null} */}
                        <Route exact path='/' component={LectureList}/>
                    </div>
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