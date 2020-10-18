import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAssignments } from '../../../actions/assignments';

import Quick from '../../layout/Quick';
import './Room.css';
import Lectures from './Lectures';
import Assignments from './Assignments';
import ProfAssignments from './ProfAssignments';
import AssignmentEval from '../assignments/AssignmentEval';
import AssignmentEvalDetail from '../assignments/AssignmentEvalDetail';

class Room extends Component {
    componentDidMount(){
        this.props.getAssignments(this.props.match.params.id);
    }

    ProfStudRoute = () => {
        if (this.props.auth.user.is_staff===false) {
            return (
                <div className='assignment-wrapper'>
                    <Route exact path={`/lecture/${this.props.match.params.id}`} component={Lectures}/>
                    <Route path={`/lecture/${this.props.match.params.id}/assignments`} component={Assignments} />
                </div>
            )
        } else if (this.props.auth.user.is_staff===true) {
            return (
                <div className='assignment-wrapper'>
                    <Route exact path={`/lecture/${this.props.match.params.id}`} component={Lectures}/>
                    <Route path={`/lecture/${this.props.match.params.id}/assignments`} component={ProfAssignments} />
                    <Route path={`/lecture/${this.props.match.params.id}/eval`} component={AssignmentEval} />
                    <Route path={`/lecture/${this.props.match.params.id}/stud/:student_id`} component={AssignmentEvalDetail} />
                </div>
            )
        }
    }

    render() {
        return (
            <div className='room-wrapper'>
                {this.ProfStudRoute()}
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