import React from 'react';

export default function ListMenu({ list, onDelete, onDuplicateList }) {

    return (
        <div className="flex column list-menu-container">
            <h2 className="capitalize">{window.i18nData.listOptionsTitle}</h2>
            <div className="flex column options-container">
                <div className="pointer capitalize option" onClick={() => onDuplicateList(list)}>{window.i18nData.duplicateListText}</div>
                <div className="pointer capitalize option" onClick={() => onDelete(list.id)}>{window.i18nData.deleteListText}</div>
            </div>
        </div>
    )
}