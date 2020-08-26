import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Lectures.css';

class Lectures extends Component {
    render () {
        return (
            <div>
                <div className='a-title'>강의실</div>
                {this.props.assignments.map(assignment => (
                    // Link로 바꾸기
                    <div className='assignment-item' key={assignment.id}>
                        <p>{assignment.assignmentname}</p>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    assignments: Object.values(state.assignments),
});

export default connect(
    mapStateToProps,
)(Lectures);