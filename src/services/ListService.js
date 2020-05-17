export default { saveListName }

function saveListName(props, listId, title) {
    const { board, updateBoard, user } = props;
    const listTitle = board.lists[listId].title;
    if (listTitle === title) return;

    const newBoard = { ...board };
    newBoard.lists[listId].title = title;
    const historyItem = { user: user.username, item: listTitle, key1: 'theList', key2: 'listRenamed' };
    const msg = `${window.i18nData.theList}${listTitle}${window.i18nData.listRenamed}${user.username}`;
    const notificationType = 'success';
    updateBoard(newBoard, msg, notificationType, historyItem);
}