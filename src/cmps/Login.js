import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login, signup } from '../actions/UserActions';

class Login extends Component {
    state = {
        msg: '',
        loginCred: { email: '', password: '' },
        signupCred: { firstName: '', lastName: '', username: '', email: '', password: '' }
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
        if (this.state.msg !== '') this.setState({ msg: '' });
        const { email, password } = this.state.loginCred;
        if (!email || !password) {
            return this.setState({ msg: window.i18nData.loginError });
        }
        const userCreds = { email, password };
        try {
            await this.props.login(userCreds);
        } catch (err) {
            this.setState({ msg: window.i18nData.loginError });
        }
        this.setState({ loginCred: { email: '', password: '', msg: '' } });
        setTimeout(() => this.props.toggleLogin(), 500);
    }

    doSignup = async (ev) => {
        ev.preventDefault();
        const { firstName, lastName, username, email, password } = this.state.signupCred;
        if (!firstName || !lastName || !username || !email || !password) {
            return this.setState({ msg: window.i18nData.signupError });
        }
        const signupCreds = { firstName, lastName, username, email, password };
        try {
            this.props.signup(signupCreds);
        } catch (err) {
            this.setState({ msg: window.i18nData.signupError });
        }
        this.setState({ signupCred: { firstName: '', lastName: '', username: '', email: '', password: '' } });
    }

    doStopPropagation = (ev) => {
        ev.stopPropagation();
    }

    render() {

        const { loginCred, msg, signupCred } = this.state;
        const { direction, user } = this.props;
        const { firstName, lastName, username, email, password, signup, login, welcome } = window.i18nData;

        let signupSection = (
            <form onSubmit={this.doSignup}>
                <div className="capitalize form-title">{signup}:</div>
                <input type="text" name="firstName" value={signupCred.firstName} className="login-input"
                    onChange={this.signupHandleChange} placeholder={firstName} />
                <input type="text" name="lastName" value={signupCred.lastName} className="login-input"
                    onChange={this.signupHandleChange} placeholder={lastName} />
                <input type="text" name="username" value={signupCred.username} className="login-input"
                    onChange={this.signupHandleChange} placeholder={username} />
                <input type="text" name="email" value={signupCred.email} className="login-input"
                    onChange={this.signupHandleChange} placeholder={email} />
                <input type="password" name="password" value={signupCred.password} className="login-input"
                    onChange={this.signupHandleChange} placeholder={password} />
                <button>{signup}</button>
            </form>
        );

        let loginSection = (
            <form onSubmit={this.doLogin}>
                <div className="capitalize form-title">{login}:</div>
                <input type="text" name="email" value={loginCred.email} className="login-input"
                    onChange={this.loginHandleChange} placeholder={email} />
                <input type="password" name="password" value={loginCred.password} className="login-input"
                    onChange={this.loginHandleChange} placeholder={password} />
                <button>{login}</button>
            </form>
        );


        return (
            <div className="flex column side-menu-container" onClick={this.doStopPropagation} dir={direction} style={{ right: direction === 'ltr' ? 0 : 'unset', left: direction === 'rtl' ? 0 : 'unset' }}>
                <h2>{msg}</h2>
                <div>
                    {user ?
                        <div>
                            <h2 className="capitalize">
                                {welcome} {user.username}
                            </h2>
                        </div>
                        :
                        <div>
                            {loginSection}
                            <hr />
                            {signupSection}
                        </div>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        direction: state.languageState.direction,
        user: state.userState.user
    };
}

const mapDispatchToProps = {
    login,
    signup
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);