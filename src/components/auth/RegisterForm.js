import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { register } from '../../actions/auth';

import styles from './RegisterForm.module.css';

class RegisterForm extends Component {
    renderField = ({ input, label, type, meta: { touched, error } }) => {
        return (
            <div className={`field ${touched && error ? 'error' : ''}`}>
                <label>{label}</label>
                <input {...input} type={type} />
            </div>
        );
    };

    onSubmit = formValues => {
        this.props.register(formValues);
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to='/' />;
        }
        return (
            <div className='ui container'>
                <div className={`ui segment ${styles['form-wrapper']}`}>
                    <form
                        onSubmit={this.props.handleSubmit(this.onSubmit)}
                        className='ui form'>
                        <Field
                            name='username'
                            type='text'
                            component={this.renderField}
                            label='이름'
                            validate={[required, minLength(2), maxLength(15)]} />
                        <Field
                            name='email'
                            type='email'
                            component={this.renderField}
                            label='이메일'
                            validate={required} />
                        <Field
                            name='password'
                            type='password'
                            component={this.renderField}
                            label='비밀번호'
                            validate={required} />
                        <Field
                            name='password2'
                            type='password'
                            component={this.renderField}
                            label='비밀번호 확인'
                            validate={[required, passwordsMatch]} />
                        <Field
                            name="is_staff"
                            type='checkbox'
                            component={this.renderField}
                            label='교수입니까'
                            validate={required_staff}
                            />
                        <button className={`ui primary button ${styles['r-btn']}`}>가입하기</button>
                    </form>
                </div>
            </div>
        );
    }
}

const required = value => (value ? undefined : 'Required');
const required_staff = value => (value);

const minLength = min => value =>
    value && value.length < min
        ? `Must be at least ${min} characters`
        : undefined;

const maxLength = max => value =>
    value && value.length > max
        ? `Must be ${max} characters or less`
        : undefined;

const passwordsMatch = (value, allValues) =>
    value !== allValues.password ? 'Passwords do not match' : undefined;

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

RegisterForm = connect(
    mapStateToProps,
    { register }
)(RegisterForm);

export default reduxForm({
    form: 'registerForm'
})(RegisterForm);