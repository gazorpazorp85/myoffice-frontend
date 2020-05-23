import React from 'react';

import HomeIcon from '@material-ui/icons/Home';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import ImageSearchOutlinedIcon from '@material-ui/icons/ImageSearchOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';

export default function BoardBar({ direction, goBack, toggleHandler, isBgDark }) {
    return (
        <div className="flex board-bar" dir={direction}>
            <div className={`btn go-back ${isBgDark ? 'dark' : 'light'}`}
                onClick={goBack}>
                <HomeIcon />
            </div>
            <div className={`btn add-members ${isBgDark ? 'dark' : 'light'}`}
                onClick={() => toggleHandler('toggleBoardMembers')}>
                <GroupAddOutlinedIcon />
                {window.i18nData.addMembers}
            </div>
            <div className={`btn change-bg ${isBgDark ? 'dark' : 'light'}`}
                onClick={() => toggleHandler('toggleBoardBackground')}>
                <ImageSearchOutlinedIcon />
                {window.i18nData.changeBg}
            </div>
            <div className={`btn show-history ${isBgDark ? 'dark' : 'light'}`}
                onClick={() => toggleHandler('toggleBoardHistory')}>
                <HistoryOutlinedIcon />
                {window.i18nData.showHistory}
            </div>
        </div>
    )
}