import utils from './utils';

export default {
    cardTodoHandler,
    duplicateCard,
    deleteCard,
    updateCardDueDate,
    updateCardDescription,
    updateChoosenLabels,
    updateCardMembers,
    updateCardTodos,
    saveCardName,
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

function saveCardName(props, id, title) {
    const { board, updateBoard, user } = props;
    const cardTitle = board.cards[id].title;
    if (cardTitle === title) return;

    const newBoard = { ...board };
    newBoard.cards[id].title = title;
    const historyItem = { user: user.username, item: title, key1: 'theCard', key2: 'cardEdited' };
    const msg = `${window.i18nData.theCard}${title}${window.i18nData.cardEdited}${user.username}`;
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