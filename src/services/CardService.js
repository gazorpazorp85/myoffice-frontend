import utils from './utils';

export default {
    addNewCard,
    cardTodoHandler,
    duplicateCard,
    deleteCard,
    miniCardSaveHandler,
    saveCardTitleUrlHandler,
    updateCardDueDate,
    updateCardDescription,
    updateChoosenLabels,
    updateCardMembers,
    updateCardTodos
}

function duplicateCard(props) {
    const { board, card, list, updateBoard, user } = props;
    const newCard = {
        ...card,
        id: utils.getRandomId(),
        title: `${window.i18nData.clonedList} ${card.title}`,
        labels: [...card.labels],
        todos: [...card.todos],
        cardMembers: [...card.cardMembers]
    };
    const newBoard = { ...board, cards: { ...board.cards, [newCard.id]: newCard } };
    newBoard.lists[list.id].cardIds.push(newCard.id);
    const historyItem = { user: user.username, item: newCard.title, key1: 'theCard', key2: 'cardDuplicated' };
    _saveBoardHandler(newBoard, newCard, 'success', historyItem, updateBoard);
}

function deleteCard(props) {
    const { board, card, list, updateBoard, user } = props;
    const newBoard = { ...board };
    const cardIds = newBoard.lists[list.id].cardIds;
    const idx = cardIds.findIndex(cardId => cardId === card.id);
    cardIds.splice(idx, 1);
    delete newBoard.cards[card.id];
    const historyItem = { user: user.username, item: card.title, key1: 'theCard', key2: 'cardDeleted' };
    const msg = `${window.i18nData.theCard}${card.title}${window.i18nData.cardDeleted}${user.username}`;
    const notificationType = 'danger';
    updateBoard(newBoard, msg, notificationType, historyItem);
}

function updateChoosenLabels(props, labelName) {
    const { board, card, labels, toggle, updateBoard, user } = props;
    let newCardLabels = [...labels];
    const idx = newCardLabels.findIndex(cardLabel => cardLabel === labelName);
    (idx >= 0) ? newCardLabels.splice(idx, 1) : newCardLabels.push(labelName);
    const newCard = { ...card, labels: newCardLabels };
    const notificationAction = (idx >= 0) ? 'delete' : 'success';
    const historyItem = { user: user.username, item: newCard.title, key1: 'aLabel', key2: (idx >= 0) ? 'listDeleted' : 'listAdded' }
    _saveBoardHandler(board, newCard, notificationAction, historyItem, updateBoard);
    toggle('toggleLabels');
}

function updateCardMembers(props, collaborator) {
    const { board, card, cardMembers, toggle, updateBoard } = props;
    const newCardMembers = [...cardMembers];
    const idx = newCardMembers.findIndex(currMember => currMember._id === collaborator._id);
    (idx >= 0) ? newCardMembers.splice(idx, 1) : newCardMembers.push(collaborator);
    const newCard = { ...card, cardMembers: newCardMembers };
    const historyItem = (idx >= 0) ?
        { user: `"${newCard.title}"`, item: collaborator.username, key1: 'theUser', key2: 'userDismissed' } :
        { user: collaborator.username, item: newCard.title, key1: 'theCard', key2: 'cardAssigned' }
    const notificationAction = (idx >= 0) ? 'delete' : 'success';
    _saveBoardHandler(board, newCard, notificationAction, historyItem, updateBoard);
    toggle('toggleMembers');
}

function saveCardTitleUrlHandler(props, id, value) {
    const { board, cardField, updateBoard, user } = props;
    const cardFieldValue = board.cards[id][cardField];
    if (cardFieldValue === value) return;
    let newCard = { ...board.cards[id] };
    newCard = cardField === 'title' ? _checkCardType(newCard, value) : newCard[cardField] = value;
    const historyItem = { user: user.username, item: newCard.title, key1: 'theCard', key2: 'cardEdited' };
    _saveBoardHandler(board, newCard, 'success', historyItem, updateBoard);
}

function updateCardDescription(props, description) {
    const { board, updateBoard, user } = props;
    const card = board.cards[props.cardId];
    const newCard = { ...card, description: description };
    const historyItem = { user: user.username, item: newCard.title, key1: 'theDescription', key2: 'changed' };
    _saveBoardHandler(board, newCard, 'success', historyItem, updateBoard);
}

function updateCardDueDate(props, dueDate) {
    const { board, toggle, updateBoard, user } = props;
    const card = board.cards[props.card.id];
    const newCard = { ...card, dueDate: dueDate ? dueDate.getTime() : dueDate };
    const historyItem = { user: user.username, item: newCard.title, key1: 'theDueDate', key2: 'changed' }
    _saveBoardHandler(board, newCard, 'success', historyItem, updateBoard);
    toggle('toggleDueDate');
}

function updateCardTodos(props, todo) {
    const { board, updateBoard, user } = props;
    const card = board.cards[props.card.id];
    const newCard = { ...card };
    newCard.todos.push(todo);
    newCard.doneTodos = newCard.todos.length === 1 ? 0 : newCard.doneTodos;
    const historyItem = { user: user.username, item: newCard.title, key1: 'theTodos', key2: 'updateTodos' }
    _saveBoardHandler(board, newCard, 'success', historyItem, updateBoard);
}

function cardTodoHandler(props, id, key) {
    const { board, updateBoard, user } = props;
    const card = board.cards[props.cardId];
    const newCard = { ...card, todos: [...card.todos] };
    const todos = newCard.todos;
    const idx = todos.findIndex(todo => todo.id === id);
    const currTodoText = todos[idx].text;
    const historyItem = {
        user: user.username,
        item: currTodoText,
        key1: key === 'delete' ? 'theTodo' : 'todoStatus',
        key2: key === 'delete' ? 'listDeleted' : 'todoStatusUpdate'
    };
    if (key === 'delete') {
        newCard.doneTodos = (todos[idx].isDone === true && newCard.doneTodos > 0) ? newCard.doneTodos - 1 : newCard.doneTodos;
        todos.splice(idx, 1);
    } else if (key === 'updateTodoStatus') {
        todos[idx].isDone = !todos[idx].isDone;
        newCard.doneTodos = todos.filter(todo => todo.isDone).length;
    }
    _saveBoardHandler(board, newCard, key, historyItem, updateBoard);
}

function addNewCard(props, card) {
    const { board, list, updateBoard, user } = props;
    let newCard = { ...card };
    const newList = { ...list };
    newCard = _checkCardType(newCard, newCard.title);
    const id = newCard.id;
    if (!newList.cardIds.includes(id)) newList.cardIds.push(id);
    const editedBoard = { ...board, lists: { ...board.lists, [newList.id]: newList } };
    const historyItem = { user: user.username, item: card.title, key1: 'theCard', key2: 'cardAdded' };
    _saveBoardHandler(editedBoard, newCard, 'success', historyItem, updateBoard);
}

function miniCardSaveHandler(props, title) {
    const { board, card, updateBoard, user } = props;
    let newCard = { ...card };
    newCard = title ? _checkCardType(newCard, title) : newCard;
    const historyItem = { user: user.username, item: newCard.title, key1: 'theCard', key2: 'cardEdited' };
    _saveBoardHandler(board, newCard, 'success', historyItem, updateBoard);
}

function _checkCardType(card, title) {
    const youtubeREGEX = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const imgREGEX = /.(jpg|jpeg|png|gif)\/?$/;
    const httpREGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    if (title.match(youtubeREGEX)) {
        const url = title.replace('watch?v=', 'embed/');
        return { ...card, title: '', type: 'video', url: url };
    } else if (title.match(imgREGEX)) {
        return { ...card, title: '', type: 'image', url: title };
    } else if (title.match(httpREGEX)) {
        const stringSplit = title.split(httpREGEX);
        const cardUrl = stringSplit.filter(string => string.match(httpREGEX));
        const cardTitle = stringSplit.filter(string => !string.match(httpREGEX) && string.length > 1);
        return { ...card, title: cardTitle[0], url: cardUrl[0] };
    } else {
        return { ...card, title: title };
    }
}

function _saveBoardHandler(board, newCard, notificationAction, historyItem, updateBoard) {
    const newBoard = { ...board, cards: { ...board.cards, [newCard.id]: newCard } };
    const msg = `${window.i18nData[historyItem.key1]}${historyItem.item}${window.i18nData[historyItem.key2]}${historyItem.user}`;
    const notificationType = notificationAction === 'delete' ? 'danger' : 'success';
    updateBoard(newBoard, msg, notificationType, historyItem);
}