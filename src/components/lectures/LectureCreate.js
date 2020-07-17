import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLecture } from '../../actions/lectures';
import LectureForm from './LectureForm';

class LectureCreate extends Component {
    onSubmit = formValues => {
        this.props.addLecture(formValues);
    };

    render() {
        return (
            <div style={{ marginTop: '2rem' }}>
                <LectureForm destroyOnUnmount={false} onSubmit={this.onSubmit} />
            </div>
        );
    }
}

export default connect(
    null,
    { addLecture }
)(LectureCreate);