import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Assignments.css';

class Assignments extends Component {
    render () {
        return (
            <div>
                <div className='a-title'>과제 및 평가</div>
                {this.props.assignments.map(assignment => (
                    // Link로 바꾸기
                    <div className='assignment-item' key={assignment.id}>
                        <p className='title-settings a-main'>{assignment.assignmentname}</p>
                        <div className='title-settings'>
                            <button className='title-settings a-btn'>과제 업로드</button>
                            <button className='title-settings a-btn'>성적확인</button>
                        </div>
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
)(Assignments);