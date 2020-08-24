import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import logo from '../../static/images/logo.png';

class Header extends Component {
    render() {
        const { user, isAuthenticated } = this.props.auth;

        const userLinks = (
            <div className="right menu">
                <div className="ui simple dropdown item" style={{color: 'black'}}>
                    {user ? user.username : ''}
                    <i className='dropdown icon' />
                    <div className="menu">
                        <a onClick={this.props.logout} className='item'>
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        );

        const guestLinks = (
            <div className="right menu">
                <Link to='/register' className='item' style={{color: 'black'}}>
                    Sign Up
                </Link>
                <Link to='/login' className='item' style={{color: 'black'}}>
                    Login
                </Link>
            </div>
        );

        return (
            <div className="ui inverted menu" style={{
                    borderRadius: '0',
                    backgroundColor: 'white',
                    padding: '5px 0',
                    margin: '0'}}>
                <Link to='/' className='header item' style={{color: 'black'}}>
                    <img src={logo}/></Link>
                {isAuthenticated ? userLinks : guestLinks}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logout }
)(Header);