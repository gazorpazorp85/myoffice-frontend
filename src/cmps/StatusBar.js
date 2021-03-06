import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import LoginIcon from '@material-ui/icons/PersonOutline';

import Login from './Login';
import TeamMemberIcon from './TeamMemberIcon';
import UserMenu from './UserMenu';

import { changeLanguage } from '../actions/LanguageActions';
import { logout } from '../actions/UserActions';

class StatusBar extends Component {

    state = {
        toggleLogin: false,
        toggleUserMenu: false
    }

    toggleHandler = (field) => {
        this.setState((prevState) => ({
            toggleLogin: field === 'toggleLogin' ? !prevState.toggleLogin : false,
            toggleUserMenu: field === 'toggleUserMenu' ? !prevState.toggleUserMenu : false,
        }))
    }

    transitionClassNamesHandler = (direction) => {
        return direction === 'ltr' ? 'modal-rtl' : 'modal-ltr';
    }

    render() {

        const { changeLanguage, direction, logout, user, userRequests } = this.props;
        const { toggleLogin, toggleUserMenu } = this.state;
        const cssTransitionClassNames = this.transitionClassNamesHandler(direction);

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
                {/* {toggleUserMenu && <UserMenu logout={logout} requests={userRequests} toggle={() => this.toggleHandler('toggleUserMenu')} userId={user._id} />} */}
                {toggleUserMenu && <UserMenu logout={logout} toggle={() => this.toggleHandler('toggleUserMenu')} userId={user._id} />}
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
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);