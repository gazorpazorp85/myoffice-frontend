import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import Login from '../cmps/Login';
import TeamMemberIcon from '../cmps/TeamMemberIcon';

import LanguageService from '../services/LanguageService';

import { changeLanguage } from '../actions/LanguageActions';
import { getLoggedInUser, logout } from '../actions/UserActions';

class StatusBar extends Component {

    state = {
        toggleLogin: false
    }

    componentDidMount() {
        this.props.getLoggedInUser();
    }

    toggleLogin = (ev) => {
        ev.stopPropagation();
        this.setState((prevState) => ({ toggleLogin: !prevState.toggleLogin }))
    }

    render() {

        let language = this.props.language;
        let direction = LanguageService.languageDirection(language);
        let user = this.props.user;
        let button = (user) ?
            <Link to='/' className="btn home-logout">
                <ExitToAppIcon onClick={this.props.logout} />
            </Link>
            :
            <div className="btn home-login" onClick={this.toggleLogin} dir={direction}>
                <PersonOutlineIcon />
                <div>{window.i18nData.login}</div>
            </div>

        return (
            <div className="flex status-bar" dir={direction}>
                {this.state.toggleLogin && <div className="screen" onClick={this.toggleLogin}></div>}
                {user ?
                    <div className="flex align-center">
                        <TeamMemberIcon user={user} />
                        <div className="flex capitalize" dir={direction} style={{ lineHeight: '40px' }}>
                            {window.i18nData.welcome} {user.username}
                        </div>
                        {button}
                    </div>
                    : button}
                <div className="flex center align-center">
                    <div className="pointer flag-icon en" onClick={() => this.props.changeLanguage('en')}></div>
                    <div className="pointer flag-icon he" onClick={() => this.props.changeLanguage('he')}></div>
                </div>
                <CSSTransition in={this.state.toggleLogin} timeout={700} classNames={direction === 'ltr' ? 'modal-rtl' : 'modal-ltr'} unmountOnExit>
                    <Login toggleLogin={this.toggleLogin} direction={direction} />
                </CSSTransition>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
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