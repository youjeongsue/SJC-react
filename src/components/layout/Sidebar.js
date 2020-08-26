import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Sidebar.css';
import img from '../../static/images/user.png';
import active from '../../static/images/active.png';

class Sidebar extends Component {
    render() {
        const { user } = this.props.auth;

        return (
            <div className='sidebar'>
                <div className='s-user'>
                    <img src={img} />
                    <p className='s-name'>{user.username}</p>
                    <p>{user.email}</p>
                </div>
                <div className='s-menu'>
                    <p className='s-dashboard'>DASHBOARD</p>
                    <p>일정관리</p>
                    <p>메신저</p>
                </div>
                <img className='active-user' src={active} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Sidebar);