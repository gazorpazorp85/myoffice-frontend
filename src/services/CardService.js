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
    const newCard = { ...card, id: utils.getRandomId(), labels: [...card.labels], todos: [...card.todos], cardMembers: [...card.cardMembers] };
    const newBoard = { ...board, cards: { ...board.cards, [newCard.id]: newCard } };
    newBoard.lists[list.id].cardIds.push(newCard.id);
    const historyItem = { user: user.username, item: newCard.title, key1: 'theCard', key2: 'cardDuplicated' };
    const msg = `${window.i18nData.theCard}${newCard.title}${window.i18nData.cardDuplicated}${user.username}`;
    const notificationType = 'success';
    newCard.title = `${window.i18nData.clonedList} ${newCard.title}`;
    updateBoard(newBoard, msg, notificationType, historyItem);
    console.log('cardService duplicateCard: ', newBoard);
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
    console.log('cardService deleteCard: ', newBoard);
}

function updateChoosenLabels(props, labelName) {
    const { board, card, labels, toggle, updateBoard, user } = props;
    let newCardLabels = [...labels];
    const idx = newCardLabels.findIndex(cardLabel => cardLabel === labelName);
    (idx >= 0) ? newCardLabels.splice(idx, 1) : newCardLabels.push(labelName);
    const newCard = { ...card, labels: newCardLabels };
    const newBoard = { ...board, cards: { ...board.cards, [newCard.id]: newCard } };
    const msg = (idx >= 0) ? `${window.i18nData.aLabel}${newCard.title}${window.i18nData.listAdded}${user.username}`
        : `${window.i18nData.aLabel}${newCard.title}${window.i18nData.listRemoved}${user.username}`;
    const notificationType = (idx >= 0) ? 'danger' : 'success';
    const historyItem = { user: user.username, item: newCard.title, key1: 'aLabel', key2: (idx >= 0) ? 'listDeleted' : 'listAdded' }
    updateBoard(newBoard, msg, notificationType, historyItem);
    toggle('toggleLabels');
}

function updateCardMembers(props, collaborator) {
    const { board, card, cardMembers, toggle, updateBoard, user } = props;
    const newCardMembers = [...cardMembers];
    const idx = newCardMembers.findIndex(currMember => currMember._id === collaborator._id);
    (idx >= 0) ? newCardMembers.splice(idx, 1) : newCardMembers.push(collaborator);
    const newCard = { ...card, cardMembers: newCardMembers };
    const newBoard = { ...board, cards: { ...board.cards, [newCard.id]: newCard } };
    const msg = (idx >= 0) ? `${window.i18nData.theCard}${newCard.title}${window.i18nData.cardAssigned}${user.username}`
        : `${window.i18nData.theCard}${newCard.title}${window.i18nData.listRemoved}${user.username}`;
    const notificationType = (idx >= 0) ? 'danger' : 'success';
    const historyItem = (idx >= 0) ?
        { user: `"${newCard.title}"`, item: collaborator.username, key1: 'theUser', key2: 'userDismissed' } :
        { user: collaborator.username, item: newCard.title, key1: 'theCard', key2: 'cardAssigned' }

    updateBoard(newBoard, msg, notificationType, historyItem);
    toggle('toggleMembers');
}

function saveCardTitleUrlHandler(props, id, value) {
    const { board, cardField, updateBoard, user } = props;
    const cardFieldValue = board.cards[id][cardField];
    if (cardFieldValue === value) return;
    let newCard = { ...board.cards[id] };
    newCard = cardField === 'title' ? _checkCardType(newCard, value) : newCard[cardField] = value
    const cardTitle = newCard.title;

    const newBoard = { ...board, cards: { ...board.cards, [id]: newCard } };
    const historyItem = { user: user.username, item: cardTitle, key1: 'theCard', key2: 'cardEdited' };
    const msg = `${window.i18nData.theCard}${cardTitle}${window.i18nData.cardEdited}${user.username}`;
    const notificationType = 'success';
    updateBoard(newBoard, msg, notificationType, historyItem);
}

function updateCardDescription(props, description) {
    const { board, updateBoard, user } = props;
    const card = board.cards[props.card.id];
    const newCard = { ...card, description: description };
    const newBoard = { ...board, cards: { ...board.cards, [newCard.id]: newCard } };
    const historyItem = { user: user.username, item: newCard.title, key1: 'theDescription', key2: 'changed' };
    const msg = `${window.i18nData.theDescription}${newCard.title}${window.i18nData.changed}${user.username}`;
    const notificationType = 'success';
    updateBoard(newBoard, msg, notificationType, historyItem);
}

function updateCardDueDate(props, dueDate) {
    const { board, toggle, updateBoard, user } = props;
    const card = board.cards[props.card.id];
    const newCard = { ...card, dueDate: dueDate ? dueDate.getTime() : dueDate };
    const newBoard = { ...board, cards: { ...board.cards, [newCard.id]: newCard } };
    const historyItem = { user: user.username, item: newCard.title, key1: 'theDueDate', key2: 'changed' }
    const msg = `${window.i18nData.theDueDate}${newCard.title}${window.i18nData.changed}${user.username}`;
    const notificationType = 'success';
    updateBoard(newBoard, msg, notificationType, historyItem);
    toggle('toggleDueDate');
}

function updateCardTodos(props, todo) {
    const { board, updateBoard, user } = props;
    const card = board.cards[props.card.id];
    const newCard = { ...card };
    newCard.todos.push(todo);
    newCard.doneTodos = newCard.todos.length === 1 ? 0 : newCard.doneTodos;
    const newBoard = { ...board, cards: { ...board.cards, [newCard.id]: newCard } };
    const historyItem = { user: user.username, item: newCard.title, key1: 'theTodos', key2: 'updateTodos' }
    const msg = `${window.i18nData.theTodos}${newCard.title}${window.i18nData.updateTodos}${user.username}`;
    const notificationType = 'success';
    updateBoard(newBoard, msg, notificationType, historyItem);

}

function cardTodoHandler(props, id, key) {
    const { board, updateBoard, user } = props;
    const card = board.cards[props.card.id];
    const newCard = { ...card, todos: [...card.todos] };
    const todos = newCard.todos;
    const idx = todos.findIndex(todo => todo.id === id);
    const currTodoText = todos[idx].text;
    let historyItem = '';
    let msg = '';
    let notificationType = '';
    if (key === 'delete') {
        newCard.doneTodos = (todos[idx].isDone === true && newCard.doneTodos > 0) ? newCard.doneTodos - 1 : newCard.doneTodos;
        todos.splice(idx, 1);
        historyItem = { user: user.username, item: currTodoText, key1: 'theTodo', key2: 'listDeleted' };
        msg = `${window.i18nData.theTodo}${currTodoText}${window.i18nData.listDeleted}${user.username}`;
        notificationType = 'danger';
    } else if (key === 'updateTodoStatus') {
        todos[idx].isDone = !todos[idx].isDone;
        newCard.doneTodos = todos.filter(todo => todo.isDone).length;
        historyItem = { user: user.username, item: currTodoText, key1: 'todoStatus', key2: 'todoStatusUpdate' }
        msg = `${window.i18nData.theTodo}${currTodoText}${window.i18nData.todoStatusUpdate}${user.username}`;
        notificationType = 'success';
    }
    const newBoard = { ...board, cards: { ...board.cards, [newCard.id]: newCard } };
    updateBoard(newBoard, msg, notificationType, historyItem);
}

function addNewCard(props, card) {
    const { board, list, updateBoard, user } = props;
    let newCard = { ...card };
    const newList = { ...list };
    newCard = _checkCardType(newCard, newCard.title);
    const id = newCard.id;
    if (!newList.cardIds.includes(id)) newList.cardIds.push(id);
    const newBoard = { ...board, lists: { ...board.lists, [newList.id]: newList }, cards: { ...board.cards, [id]: newCard } };
    const historyItem = { user: user.username, item: card.title, key1: 'theCard', key2: 'cardAdded' };
    const msg = `${window.i18nData.theCard}${card.title}${window.i18nData.cardAdded}${user.username}`;
    const notificationType = 'success';
    updateBoard(newBoard, msg, notificationType, historyItem);
}

function miniCardSaveHandler(props, title) {
    const { board, card, updateBoard, user } = props;
    let newCard = { ...card };
    newCard = title ? _checkCardType(newCard, title) : newCard;
    const newBoard = { ...board, cards: { ...board.cards, [newCard.id]: newCard } };
    const historyItem = { user: user.username, item: newCard.title, key1: 'theCard', key2: 'cardEdited' };
    const msg = `${window.i18nData.theCardTitled}${newCard.title}${window.i18nData.cardEdited}${user.username}`;
    const notificationType = 'success';
    updateBoard(newBoard, msg, notificationType, historyItem);
    console.log('miniCardTextDetailsSave: ', newBoard);
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