import React from 'react';
import { Link } from 'react-router-dom';

import ExitIcon from '@material-ui/icons/ExitToApp';

export default function UserMenu({ logout, requests, toggle, user }) {

    const logoutHandler = () => {
        logout();
        toggle();
    }

    const amountOfRequests = requests.length > 0 ? ` (${requests.length})` : '';

    return (
        <div className="flex column user-menu-container">
            <div className="my-profile-btn-container" onClick={() => toggle()}>
                <Link to={`/user/${user._id}`} className="capitalize flex center align-center">
                    <div style={amountOfRequests ? { fontWeight: 700 } : {}}>{window.i18nData.myProfile}{amountOfRequests}</div>
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