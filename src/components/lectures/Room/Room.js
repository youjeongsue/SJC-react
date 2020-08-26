import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAssignments } from '../../../actions/assignments';

import Quick from '../../layout/Quick';
import './Room.css';
import Lectures from './Lectures';
import Assignments from './Assignments';

class Room extends Component {
    componentDidMount(){
        this.props.getAssignments(this.props.match.params.id);
    }

    render() {
        return (
            <div className='room-wrapper'>
                <div className='assignment-wrapper'>
                    <Route exact path={`/lecture/${this.props.match.params.id}`} component={Lectures}/>
                    <Route path={`/lecture/${this.props.match.params.id}/assignments`} component={Assignments} />
                </div>
                <div className='quick-wrapper'>
                    <Quick id={this.props.match.params.id}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    assignments: Object.values(state.assignments),
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getAssignments }
)(Room);