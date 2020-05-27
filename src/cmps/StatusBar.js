import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import LoginIcon from '@material-ui/icons/PersonOutline';

import Login from './Login';
import TeamMemberIcon from './TeamMemberIcon';
import UserMenu from './UserMenu';

import { changeLanguage } from '../actions/LanguageActions';
import { getLoggedInUser, logout } from '../actions/UserActions';

class StatusBar extends Component {

    state = {
        toggleLogin: false,
        toggleUserMenu: false,
    }

    componentDidMount() {
        this.props.getLoggedInUser();
    }

    toggleHandler = (field) => {
        this.setState((prevState) => ({
            toggleLogin: field === 'toggleLogin' ? !prevState.toggleLogin : false,
            toggleUserMenu: field === 'toggleUserMenu' ? !prevState.toggleUserMenu : false,
        }))
    }

    render() {

        const { changeLanguage, direction, logout, user } = this.props;
        const { toggleLogin, toggleUserMenu } = this.state;
        const cssTransitionClassNames = direction === 'ltr' ? 'modal-rtl' : 'modal-ltr';
        const button = (user) ?
            <div className="flex pointer align-center" onClick={() => this.toggleHandler('toggleUserMenu')}>
                <TeamMemberIcon user={user} />
                <div className="flex capitalize" dir={direction} style={{ lineHeight: '40px' }}>
                    {window.i18nData.welcome} {user.username}
                </div>
            </div>
            :
            <div className="btn home-login" onClick={() => this.toggleHandler('toggleLogin')} dir={direction}>
                <LoginIcon />
                <div>{window.i18nData.login}</div>
            </div>

        return (
            <div className="flex status-bar-container" dir={direction}>
                {this.state.toggleLogin && <div className="screen status-bar" onClick={() => this.toggleHandler('toggleLogin')}></div>}
                {button}
                {toggleUserMenu && <UserMenu logout={logout} toggle={() => this.toggleHandler('toggleUserMenu')} user={user} />}
                <div className="flex center align-center">
                    <div className="pointer flag-icon en" onClick={() => changeLanguage('en')}></div>
                    <div className="pointer flag-icon he" onClick={() => changeLanguage('he')}></div>
                </div>
                <CSSTransition in={toggleLogin} timeout={700} classNames={cssTransitionClassNames} unmountOnExit>
                    <Login toggleLogin={() => this.toggleHandler('toggleLogin')} />
                </CSSTransition>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        direction: state.languageState.direction,
        language: state.languageState.language,
        user: state.userState.user
    };
};

const mapDispatchToProps = {
    changeLanguage,
    getLoggedInUser,
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);