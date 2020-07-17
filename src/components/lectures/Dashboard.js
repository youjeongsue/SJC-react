import React, { Component } from 'react';
import { connect } from 'react-redux';

import LectureList from './LectureList';
import LectureCreate from './LectureCreate';

class Dashboard extends Component {
    render() {
        const { user } = this.props.auth;

        return (
            <div className="ui container">
                {user.is_staff === true ? <LectureCreate /> : null}
                <LectureList />
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