import React from 'react';
import { Link } from 'react-router-dom';

import ExitIcon from '@material-ui/icons/ExitToApp';

export default function UserMenu({ logout, user, toggle }) {

    const logoutHandler = () => {
        logout();
        toggle();
    }

    const requests = user.requests ? ` (${user.requests.length})` : '';

    return (
        <div className="flex column user-menu-container">
            <div className="my-profile-btn-container" onClick={() => toggle()}>
                <Link to={`/user/${user.url_id}`} className="capitalize flex center align-center">
                    <div style={requests ? { fontWeight: 700 } : {}}>{window.i18nData.myProfile}{requests}</div>
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