import React from 'react';
import { Link } from 'react-router-dom';

import ExitIcon from '@material-ui/icons/ExitToApp';

export default function UserMenu({ logout, user, toggle }) {
    const logoutHandler = () => {
        logout();
        toggle();
    }

    return (
        <div className="flex column user-menu-container">
            <div className="my-profile-btn-container" onClick={() => toggle()}>
                <Link to={`/user/${user.url_id}`} className="capitalize flex center align-center">
                    <div>{window.i18nData.myProfile}</div>
                </Link>
            </div>
            <div onClick={() => logoutHandler()}>
                <Link to='/' className="btn user-logout">
                    <div>{window.i18nData.logout}</div>
                    <ExitIcon />
                </Link>
            </div>
        </div>
    )
} 