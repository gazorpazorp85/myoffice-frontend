import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login, logout, signup, getLoggedInUser } from '../actions/UserActions';

class Login extends Component {
    state = {
        msg: '',
        loginCred: { email: '', password: '' },
        signupCred: { firstName: '', lastName: '', username: '', email: '', password: '' }
    }

    componentDidMount() {
        this.props.getLoggedInUser();
    }

    loginHandleChange = (ev) => {
        const { name, value } = ev.target;
        this.setState(prevState => ({ loginCred: { ...prevState.loginCred, [name]: value } }));
    }

    signupHandleChange = (ev) => {
        const { name, value } = ev.target;
        this.setState(prevState => ({ signupCred: { ...prevState.signupCred, [name]: value } }));
    }

    doLogin = async (ev) => {
        ev.preventDefault();
        const { email, password } = this.state.loginCred;
        if (!email || !password) {
            return this.setState({ msg: window.i18nData.loginError });
        }
        const userCreds = { email, password };
        this.props.login(userCreds);
        this.props.getLoggedInUser();
        this.setState({ loginCred: { email: '', password: '' } });
    }

    doSignup = async (ev) => {
        ev.preventDefault();
        const { firstName, lastName, username, email, password } = this.state.signupCred;
        if (!firstName || !lastName || !username || !email || !password) {
            return this.setState({ msg: window.i18nData.signupError });
        }
        const signupCreds = { firstName, lastName, username, email, password };
        this.props.signup(signupCreds);
        this.setState({ signupCred: { firstName: '', lastName: '', username: '', email: '', password: '' } });
    }

    doLogout = () => {
        this.props.logout();
    }

    doStopPropagation = (ev) => {
        ev.stopPropagation();
    }

    render() {
        let signupSection = (
            <form onSubmit={this.doSignup}>
                <div className="capitalize form-title">{window.i18nData.signup}:</div>
                <input type="text" name="firstName" value={this.state.signupCred.firstName} className="login-input"
                    onChange={this.signupHandleChange} placeholder={window.i18nData.firstName} />
                <input type="text" name="lastName" value={this.state.signupCred.lastName} className="login-input"
                    onChange={this.signupHandleChange} placeholder={window.i18nData.lastName} />
                <input type="text" name="username" value={this.state.signupCred.username} className="login-input"
                    onChange={this.signupHandleChange} placeholder={window.i18nData.username} />
                <input type="text" name="email" value={this.state.signupCred.email} className="login-input"
                    onChange={this.signupHandleChange} placeholder={window.i18nData.email} />
                <input type="password" name="password" value={this.state.signupCred.password} className="login-input"
                    onChange={this.signupHandleChange} placeholder={window.i18nData.password} />
                <button>{window.i18nData.signup}</button>
            </form>
        );

        let loginSection = (
            <form onSubmit={this.doLogin}>
                <div className="capitalize form-title">{window.i18nData.login}:</div>
                <input type="text" name="email" value={this.state.loginCred.email} className="login-input"
                    onChange={this.loginHandleChange} placeholder={window.i18nData.email} />
                <input type="password" name="password" value={this.state.loginCred.password} className="login-input"
                    onChange={this.loginHandleChange} placeholder={window.i18nData.password} />
                <button>{window.i18nData.login}</button>
            </form>
        );

        let loggedInUser = this.props.user;
        let direction = this.props.direction;

        return (
            <div className="flex column side-menu-container" onClick={this.doStopPropagation} dir={direction} style={{ right: direction === 'ltr' ? 0 : 'unset', left: direction === 'rtl' ? 0 : 'unset' }}>
                <h2>{this.state.msg}</h2>
                <div>
                    {loggedInUser && (
                        <div>
                            <h2 className="capitalize">{window.i18nData.welcome} {loggedInUser.username} </h2>
                            <div className="flex">
                                <button className="logout" onClick={this.doLogout}>{window.i18nData.logout}</button>
                            </div>
                        </div>
                    )}

                    {!this.props.user && loginSection}
                    <hr />
                    {!this.props.user && signupSection}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user
    };
}

const mapDispatchToProps = {
    login,
    logout,
    signup,
    getLoggedInUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);