import React from 'react';

import ListService from '../../../services/ListService';

export default function ListMenu({ board, closeListMenu, list, updateBoard, user }) {

    const onDuplicateList = () => {
        ListService.duplicateList(board, list, updateBoard, user);
        closeListMenu();
    }

    const onDelete = (id) => {
        ListService.deleteList(board, id, updateBoard, user);
        closeListMenu();
    }

    return (
        <div className="flex column list-menu-container">
            <h2 className="capitalize">{window.i18nData.listOptionsTitle}</h2>
            <div className="flex column options-container">
                <div className="pointer capitalize option" onClick={() => onDuplicateList()}>{window.i18nData.duplicateListText}</div>
                <div className="pointer capitalize option" onClick={() => onDelete(list.id)}>{window.i18nData.deleteListText}</div>
            </div>
        </div>
    )
}