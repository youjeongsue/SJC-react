import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAssignments } from '../../actions/assignments';

import Quick from '../layout/Quick';
import './Room.css';

class Room extends Component {
    componentDidMount(){
        this.props.getAssignments(this.props.match.params.id);
    }

    render() {
        return (
            <div className='room-wrapper'>
                {/* Router 들어갈자리! */}
                <div className='assignment-wrapper'>
                    <div className='a-title'>강의실</div>
                    {this.props.assignments.map(assignment => (
                        // Link로 바꾸기
                        <div className='assignment-item' key={assignment.id}>
                            <p>{assignment.assignmentname}</p>
                        </div>
                    ))}
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