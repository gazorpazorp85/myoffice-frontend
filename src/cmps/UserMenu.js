import React from 'react';
import { Link } from 'react-router-dom';

import ExitIcon from '@material-ui/icons/ExitToApp';

// export default function UserMenu({ logout, requests, toggle, userId }) {
export default function UserMenu({ logout, toggle, userId }) {

    const logoutHandler = () => {
        logout();
        toggle();
    }

    // const amountOfRequests = requests.length > 0 ? ` (${requests.length})` : '';

    return (
        <div className="flex column user-menu-container">
            <div className="my-profile-btn-container" onClick={() => toggle()}>
                <Link to={`/user/${userId}`} className="capitalize flex center align-center">
                    {/* <div style={amountOfRequests ? { fontWeight: 700 } : {}}>{window.i18nData.myProfile}{amountOfRequests}</div> */}
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