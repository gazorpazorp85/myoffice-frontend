import React from 'react';

import BoardsIcon from '@material-ui/icons/DeveloperBoardOutlined';
import CollaboratorsIcon from '@material-ui/icons/GroupOutlined';
import HomeIcon from '@material-ui/icons/Home';

// export default function UserNavBar({ direction, goBack, requests, toggle, userBoardsToggle }) {
export default function UserNavBar({ direction, goBack, toggle, userBoardsToggle }) {

    // const requestsNumber = requests.length > 0 ? ` (${requests.length})` : '';

    return (
        <div className="flex user-nav-bar-container" dir={direction}>
            <div
                className="pointer capitalize btn user-nav-bar-category home"
                onClick={goBack}
            >
                <HomeIcon />
            </div>
            <div
                className={`pointer capitalize btn user-nav-bar-category
                ${userBoardsToggle ? 'selected' : ''}`}
                onClick={() => toggle('userBoardsToggle')}
                style={userBoardsToggle ? { color: 'black', cursor: 'default' } : {}}
            >
                <BoardsIcon />
                <div style={{ marginInlineStart: '5px' }}>
                    {window.i18nData.boardsBtn}
                </div>
            </div>
            <div
                className={`pointer capitalize btn user-nav-bar-category
                ${userBoardsToggle ? '' : 'selected'}`}
                onClick={() => toggle('userCollaboratorsToggle')}
            >
                <CollaboratorsIcon />
                {/* <div style={{ marginInlineStart: '5px', fontWeight: requestsNumber ? '700' : '' }}>
                    {window.i18nData.collaboratorsBtn} {requestsNumber}
                </div> */}
            </div>
        </div>
    )
}