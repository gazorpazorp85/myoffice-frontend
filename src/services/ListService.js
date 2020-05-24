import utils from './utils';

export default { saveListName, duplicateList, deleteList }

function saveListName(props, listId, title) {
    const { board, updateBoard, user } = props;
    const listTitle = board.lists[listId].title;
    if (listTitle === title) return;

    const newBoard = { ...board };
    newBoard.lists[listId].title = title;
    const historyItem = { user: user.username, item: listTitle, key1: 'theList', key2: 'listRenamed' };
    _saveListHandler(newBoard, 'success', historyItem, updateBoard);
}

function duplicateList(board, list, updateBoard, user) {
    let newBoard = { ...board, lists: { ...board.lists }, listsOrder: [...board.listsOrder] };
    let newList = { ...list, cardIds: [...list.cardIds] };
    const newListId = utils.getRandomId();
    const idx = newBoard.listsOrder.findIndex(id => id === list.id);

    newList.id = newListId;
    newBoard.listsOrder.splice(idx + 1, 0, newListId);

    newList.cardIds.forEach(cardId => {
        const newCardId = utils.getRandomId();
        const cardIdIdx = list.cardIds.findIndex(idx => idx === cardId);
        const card = newBoard.cards[cardId];
        newBoard.cards[newCardId] = { ...card, id: newCardId, labels: [...card.labels], todos: [...card.todos], cardMembers: [...card.cardMembers] };
        newList.cardIds = [...newList.cardIds];
        newList.cardIds.splice(cardIdIdx, 1, newCardId);
    });
    newBoard.lists[newListId] = newList;
    const historyItem = { user: user.username, item: newList.title, key1: 'theList', key2: 'listDuplicated' };
    newList.title = `${window.i18nData.clonedList} ${list.title}`;
    _saveListHandler(newBoard, 'success', historyItem, updateBoard)
}

function deleteList(board, id, updateBoard, user) {
    const listsOrder = [...board.listsOrder];
    let updatedLists = { ...board.lists };
    let updatedCards = { ...board.cards };
    const idx = listsOrder.findIndex(listId => listId === id);
    listsOrder.splice(idx, 1);
    const list = board.lists[id];

    for (const cardId of list.cardIds) {
        for (const cardKey in board.cards) {
            if (cardId === cardKey) delete updatedCards[cardKey];
        }
    }

    delete updatedLists[id];
    const newBoard = { ...board, cards: updatedCards, lists: updatedLists, listsOrder: listsOrder };
    const historyItem = { user: user.username, item: list.title, key1: 'theList', key2: 'listDeleted' };
    _saveListHandler(newBoard, 'delete', historyItem, updateBoard)
}

function _saveListHandler(newBoard, notificationAction, historyItem, updateBoard) {
    const msg = `${window.i18nData[historyItem.key1]}${historyItem.item}${window.i18nData[historyItem.key2]}${historyItem.user}`;
    const notificationType = notificationAction === 'delete' ? 'danger' : 'success';
    updateBoard(newBoard, msg, notificationType, historyItem);
}