import React from 'react';

import AddBoardMemberIcon from '@material-ui/icons/GroupAddOutlined';
import BoardHistoryIcon from '@material-ui/icons/HistoryOutlined';
import HomeIcon from '@material-ui/icons/Home';
import SearchImageIcon from '@material-ui/icons/ImageSearchOutlined';

export default function BoardBar({ direction, goBack, toggleHandler, isBgDark }) {
    return (
        <div className="flex board-bar" dir={direction}>
            <div className={`btn go-back ${isBgDark ? 'dark' : 'light'}`}
                onClick={goBack}>
                <HomeIcon />
            </div>
            <div className={`btn add-members ${isBgDark ? 'dark' : 'light'}`}
                onClick={() => toggleHandler('toggleBoardMembers')}>
                <AddBoardMemberIcon />
                {window.i18nData.addMembers}
            </div>
            <div className={`btn change-bg ${isBgDark ? 'dark' : 'light'}`}
                onClick={() => toggleHandler('toggleBoardBackground')}>
                <SearchImageIcon />
                {window.i18nData.changeBg}
            </div>
            <div className={`btn show-history ${isBgDark ? 'dark' : 'light'}`}
                onClick={() => toggleHandler('toggleBoardHistory')}>
                <BoardHistoryIcon />
                {window.i18nData.showHistory}
            </div>
        </div>
    )
}