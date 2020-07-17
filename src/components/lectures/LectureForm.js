import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class LectureForm extends Component {
    renderField = ({ input, label, meta: { touched, error } }) => {
        return (
            <div className={`field ${touched && error ? 'error' : ''}`}>
                <label>{label}</label>
                <input {...input} autoComplete='off' />
                {touched && error && (
                    <span className='ui pointing red basic label'>{error}</span>
                )}
            </div>
        );
    };

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    };

    render() {
        const btnText = `${this.props.initialValues ? 'Update' : 'Add'}`;
        return (
            <div className="ui segment">
                <form
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                    className='ui form error'>
                        <Field name='lecturename' component={this.renderField} label='Lecture' />
                        <button className="ui primary button">{btnText}</button>
                </form>
            </div>
        );
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.lecture) {
        errors.lecture = "Please enter at least 1 character";
    }

    return errors;
}

export default reduxForm({
    form: 'lectureForm',
    touchOnBlur: false,
    validate
})(LectureForm);