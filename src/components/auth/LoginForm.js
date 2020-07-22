import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../actions/auth';

import styles from './LoginForm.module.css';

class LoginForm extends Component {
    // input
    renderField = ({ input, label, type, meta: { touched, error } }) => {
        return (
            <div className={`ui left icon input field ${touched && error ? 'error' : ''}`}>
                {type==='text'
                    ? <i aria-hidden='true' className='user icon' style={{ color: 'white' }}/>
                    : <i aria-hidden='true' className='lock icon' style={{ color: 'white' }}/>}
                <input {...input} type={type} placeholder={label} style={{
                        width: '270px',
                        border: '2px solid white',
                        borderRadius: '0',
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0)'}}/>
                {touched && error && (
                    <span className='ui pointing red basic label'>{error}</span>
                )}
            </div>
        );
    };

    // login form
    loginRenderField = ({ style }) => {
        return (
            <div data-anijs="if: click, do: slideInUp animated" className={`${styles['login']} ${styles[style]}`}>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form'>
                    <div className={ styles['input-form'] }>
                        <Field
                            name='username'
                            type='text'
                            component={this.renderField}
                            label='아이디' />
                        <Field
                            name='password'
                            type='password'
                            component={this.renderField}
                            label='비밀번호' />
                        <Field
                            name='non_field_errors'
                            type='hidden'
                            component={this.hiddenField} />
                    </div>
                    {style==='p'
                        ? <button className={`ui primary button ${styles['input-form']} ${styles['input-button']} `}
                            style={{ backgroundColor: '#17B0BB'}}>Login</button>
                        : <button className={`ui primary button ${styles['input-form']} ${styles['input-button']} `}
                            style={{ backgroundColor: '#9A5CE5'}}>Login</button>}
                    <div style={{ clear: 'left' }}></div>
                </form>
            </div>
        )
    }

    hiddenField = ({ type, meta: { error } }) => {
        return (
            <div className="field">
                <input type={type}/>
                {error && <div className='ui red massage'>{error}</div>}
            </div>
        );
    };

    onSubmit = formValues => {
        this.props.login(formValues);
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to='/' />;
        }

        return (
            <div className={ styles['main'] }>
                <div className={ styles['pSection'] }>
                    <p className={ styles['pStyle'] }>
                        WHATEVER YOU WANT
                    </p>
                </div>
                <div className={ styles['loginSection'] }>
                    <Field name='p-login' style='p' component={this.loginRenderField} />
                    <Field name='s-login' style='s' component={this.loginRenderField} />
                    <div style={{ clear: 'left' }}></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

LoginForm = connect(
    mapStateToProps,
    { login }
)(LoginForm);

export default reduxForm({
    form: 'loginForm'
})(LoginForm);