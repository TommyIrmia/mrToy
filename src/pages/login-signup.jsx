import React from 'react'
import { connect } from 'react-redux'
import { onLogin, onSignup } from '../store/user.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'


import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField } from '@material-ui/core';

class _Login extends React.Component {
    state = {
        isSignup: false
    }
    componentDidMount() {
        // if (this.props.user) this.props.history.push('/')
    }

    toggleSignup = () => {
        this.setState({ isSignup: !this.state.isSignup })
    }

    validate = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = 'Required username';
        }
        if (!values.password) {
            errors.password = 'Required password';
        }
        if (this.state.isSignup && !values.fullname) {
            errors.fullname = 'Required fullname';
        }
        return errors;
    }

    onFormSubmit = async (values, { setSubmitting }) => {
        if (this.state.isSignup) {
            const user = await this.props.onSignup(values)
            setSubmitting(false);
            (!user) ? showErrorMsg('User already exists') : this.props.history.push('/')
        } else {
            const user = await this.props.onLogin(values)
            setSubmitting(false);
            (!user) ? showErrorMsg('Wrong credentials') : this.props.history.push('/')

        }
    }


    render() {
        const { isSignup } = this.state;
        const initialValues = { fullname: '', username: '', password: '' }
        const TextFieldOutlined = (props) => <TextField {...props} variant={'outlined'} color={'primary'} />
        return (
            <section className="login-page">

                <div className="login-section">
                    <h1>Welcome to Mister-Toy!</h1>
                    <Formik
                        initialValues={initialValues}
                        validate={this.validate}
                        onSubmit={this.onFormSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                {isSignup && <><Field type="text" name="fullname" label="fullname" as={TextFieldOutlined} />
                                    <ErrorMessage name="fullname" component="div" /></>}
                                <Field type="text" name="username" label="username" as={TextFieldOutlined} />
                                <ErrorMessage name="username" component="div" />
                                <Field type="password" name="password" label="password" as={TextFieldOutlined} />
                                <ErrorMessage name="password" component="div" />
                                <Button
                                    variant={'contained'}
                                    // color={'primary'}
                                    className="login-btn"
                                    type="submit"
                                    disabled={isSubmitting}>
                                    {!isSignup ? 'Login' : 'Signup'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>

                <p> {!isSignup ? `Don't have an account yet?\n` : 'Already a member?\n'}
                    <Button className="btn-link" onClick={this.toggleSignup} variant={'outlined'}>
                        {!isSignup ? 'Signup' : 'Login'}
                    </Button>
                </p>
            </section>

        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    onLogin,
    onSignup,
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)