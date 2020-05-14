import React from 'react';

export default function AddListButton({ isBgDark, toggleHandler }) {
    return (
        <div className={`btn add-list ${isBgDark ? 'dark' : 'light'}`} onClick={() => toggleHandler('toggleListForm')}>
            + {window.i18nData.addList}
        </div>
    )
}