import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLecture, editLecture } from '../../actions/lectures';
import LectureForm from './LectureForm';

class LectureEdit extends Component {
    componentDidMount() {
        this.props.getLecture(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editLecture(this.props.match.params.id, formValues);
        this.props.history.push('/');
    };

    render() {
        return (
            <div className="ui container">
                <h2 style={{ marginTop: '2rem' }}>Edit Lecture</h2>
                <LectureForm
                    initialValues={_.pick(this.props.lecture, 'lecturename')}
                    enableReinitialize={true}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    lecture: state.lectures[ownProps.match.params.id]
});
  
export default connect(
    mapStateToProps,
    { getLecture, editLecture }
)(LectureEdit);