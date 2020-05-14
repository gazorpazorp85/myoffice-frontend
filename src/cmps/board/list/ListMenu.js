import React from 'react';

import utils from '../../../services/utils';

export default function ListMenu({ board, closeListMenu, list, updateBoard, user }) {

    const onDuplicateList = () => {
        let newBoard = { ...board };
        let newList = { ...list };
        const newListId = utils.getRandomId();
        const idx = newBoard.listsOrder.findIndex(id => id === list.id);
        
        newList.id = newListId;
        newBoard.listsOrder.splice(idx + 1, 0, newListId);
        
        newList.cardIds.forEach(cardId => {
            const newCardId = utils.getRandomId();
            const cardIdIdx = list.cardIds.findIndex(id => id === cardId);
            newBoard.cards[newCardId] = { ...newBoard.cards[cardId], id: newCardId };
            newList.cardIds = [...newList.cardIds];
            newList.cardIds.splice(cardIdIdx, 1, newCardId);
        });
        newBoard.lists[newListId] = newList;
        const historyItem = { user: user.username, item: newList.title, key1: 'theList', key2: 'listDuplicated' };
        const msg = `${window.i18nData.theList}${newList.title}${window.i18nData.listDuplicated}${user.username}`;
        const notificationType = 'success';
        newList.title = `${window.i18nData.clonedList} ${list.title}`;
        updateBoard(newBoard, msg, notificationType, historyItem);
        console.log('listMenuDuplicateBoard: ', newBoard);
        closeListMenu();
    }

    const onDelete = (id) => {
        let newBoard = { ...board };
        let list = newBoard.lists[id];

        for (const cardId of list.cardIds) {
            for (const cardKey in newBoard.lists) {
                if (cardId === cardKey) delete newBoard.cards[cardKey];
            }
        }

        const idx = newBoard.listsOrder.findIndex(listId => listId === id);
        newBoard.listsOrder.splice(idx, 1);
        delete newBoard.lists[id];
        const historyItem = { user: user.username, item: list.title, key1: 'theList', key2: 'listDeleted' };
        const msg = `${window.i18nData.theList}${list.title}${window.i18nData.listDeleted}${user.username}`;
        const notificationType = 'danger';
        updateBoard(newBoard, msg, notificationType, historyItem);
        console.log('listMenuOnDelete: ', newBoard);
        closeListMenu();
    }

    return (
        <div className="flex column list-menu-container">
            <h2 className="capitalize">{window.i18nData.listOptionsTitle}</h2>
            <div className="flex column options-container">
                <div className="pointer capitalize option" onClick={onDuplicateList}>{window.i18nData.duplicateListText}</div>
                <div className="pointer capitalize option" onClick={() => onDelete(list.id)}>{window.i18nData.deleteListText}</div>
            </div>
        </div>
    )
}