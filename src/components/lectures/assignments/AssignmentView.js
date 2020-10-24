import React, { Component } from 'react';
import { connect } from 'react-redux';

import './AssignmentView.css';

class AssignmentView extends Component {
    assignment = this.props.location.state.assignment;

    goBack = () => {
        this.props.history.goBack();
    };

    render() {
        const {
            assignment,   
        } = this;

        return (
            <div className='assignment-view-wrapper'>
                <div className='assignment-view'>
                    <div className='assignment-item a-view-title'>
                        <p className='title-settings a-main' style={{ marginRight: 'calc(100vw - 1200px)'}}>{assignment.assignmentname}</p>
                        <div className='title-settings'>
                            {this.props.auth.user.is_staff === true
                                ? <input className='title-settings a-btn' type='file'></input>
                                : null}
                            <button className='title-settings a-btn'>업로드</button>
                            <button className='title-settings a-btn'>정확도</button>
                            <button className='title-settings a-btn back-btn' onClick={() => this.goBack()}>X</button>
                        </div>
                    </div>
                    <video className='a-view-video' src={assignment.p_video} controls></video>
                    <div className='a-view-score'>
                        요구정확도
                        <div>90</div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(AssignmentView);