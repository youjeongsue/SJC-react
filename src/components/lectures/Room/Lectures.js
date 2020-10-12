import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                        <p className='title-settings a-main' style={{ marginRight: 'calc(100vw - 1000px)'}}>{assignment.assignmentname}</p>
                        <div className='title-settings'>
                            <Link to={{
                                pathname : '/assignment/view',
                                state : {
                                    assignment : assignment
                                }
                            }}>
                                <button className='title-settings a-btn'>강의 보기</button>
                            </Link>
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
)(Lectures);