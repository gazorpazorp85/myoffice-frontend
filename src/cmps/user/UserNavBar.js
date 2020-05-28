import React from 'react';

export default function UserNavBar({ direction, toggle, userBoardsToggle, userCollaboratorsToggle }) {
    return (
        <div className="flex user-nav-bar-container" dir={direction}>
            <div
                className="pointer capitalize user-nav-bar-category"
                onClick={() => toggle('userBoardsToggle')}
                style={userBoardsToggle ? { color: 'black', cursor: 'default' } : {}}
            >
                {window.i18nData.boardsBtn}
            </div>
            <div
                className="pointer capitalize user-nav-bar-category"
                onClick={() => toggle('userCollaboratorsToggle')}
                style={userCollaboratorsToggle ? { color: 'black', cursor: 'default' } : {}}
            >
                {window.i18nData.collaboratorsBtn}
            </div>
        </div>
    )
}