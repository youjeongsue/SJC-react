import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useForm } from 'react-hook-form';

function AssignmentUploadForm(props) {

    const onSubmit = formValues => {
        // var formData = new FormData();
        // formData.append("student", props.student);
        // formData.append("assignment", props.assignment);
        // formData.append("s_video", formValues.s_video[0]);
        formValues['student']=props.student;
        formValues['assignment']=props.assignment;
        formValues['s_video']=formValues.s_video[0];
        console.log(formValues);
        props.onSubmit(formValues);
    };

    const hiddenRenderField = ({input_name, input_value, meta: {touched, error}}) => {
        return (
            <input readOnly={true} className='hidden-field' name={input_name} type='text' value={input_value}/>
        )
    }
    const renderField = ({ input, meta: { touched, error } }) => {
        return (
            <label className='title-settings a-btn'>
                <input type='file' ref={register} name="s_video"/>
                {touched && error && (
                    <span className='ui pointing red basic label'>{error}</span>
                )}
            </label>                                           
        );
    };

    const { register, handleSubmit } = useForm();

    return (
        <form className='title-settings' onSubmit={handleSubmit(onSubmit)}>
            <Field name='student' input_name='student' component={hiddenRenderField} type='text' input_value={props.student} />
            <Field name='assignment' input_name='assignment' component={hiddenRenderField} type='text' input_value={props.assignment} />
            <Field name='s_video' component={renderField} type='file' value={null}/>
            <button className='title-settings a-btn' type="submit">업로드</button>
        </form>
    )

}

const validate = formValues => {
    const errors = {};
    console.log(formValues);

    if (!formValues.s_video) {
        errors.s_video = "영상을 등록해주세요";
    }

    return errors;
}

export default reduxForm({
    form: 'svideoForm',
    // validate
})(AssignmentUploadForm);