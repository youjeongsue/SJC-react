import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Sidebar.module.css';

class Sidebar extends Component {
    render() {
        const { user } = this.props.auth;

        return (
            <div className={ styles['sidebar'] }></div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(Sidebar);