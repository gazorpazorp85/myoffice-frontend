import React from 'react';

import AddIcon from '@material-ui/icons/Add';

export default function AddListButton({ isBgDark, toggleHandler }) {
    return (
        <div className={`btn add-list ${isBgDark ? 'dark' : 'light'}`} onClick={() => toggleHandler('toggleListForm')}>
            <AddIcon style={{ fontSize: 'small' }} /> {window.i18nData.addList}
        </div>
    )
}