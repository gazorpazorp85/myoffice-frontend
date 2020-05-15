import React, { Component } from 'react';

import MiniCardDetailsButton from './MiniCardDetailsButton';

import utils from '../../../services/utils';

export default class MiniDetailsEditor extends Component {

    state = {
        toggleDueDate: false,
        toggleLabels: false,
        toggleMembers: false,
    }

    toggleHandler = (toggleKey) => {
        this.setState(prevState => ({ [toggleKey]: !prevState[toggleKey] }));
    }

    duplicateCard = () => {
        const { board, miniCard, toggleMiniCardDetailsHandler, updateBoard, user } = this.props;
        const { card } = this.props.miniCard;
        const newCard = { ...card, id: utils.getRandomId(), labels: [...card.labels], todos: [...card.todos], cardMembers: [...card.cardMembers] };
        const newBoard = { ...board, cards: { ...board.cards, [newCard.id]: newCard } };
        newBoard.lists[miniCard.list.id].cardIds.push(newCard.id);
        const historyItem = { user: user.username, item: newCard.title, key1: 'theCard', key2: 'cardDuplicated' };
        const msg = `${window.i18nData.theCard}${newCard.title}${window.i18nData.cardDuplicated}${user.username}`;
        const notificationType = 'success';
        newCard.title = `${window.i18nData.clonedList} ${newCard.title}`;
        updateBoard(newBoard, msg, notificationType, historyItem);
        toggleMiniCardDetailsHandler(miniCard);
        console.log('duplicateCard: ', newBoard);
    }

    deleteCard = () => {
        const { miniCard, toggleMiniCardDetailsHandler, updateBoard, user } = this.props;
        const newBoard = { ...this.props.board };
        const list = miniCard.list;
        const cardIds = newBoard.lists[list.id].cardIds;
        const card = newBoard.cards[miniCard.card.id];
        const idx = cardIds.findIndex(cardId => cardId === miniCard.card.id);
        cardIds.splice(idx, 1);
        delete newBoard.cards[miniCard.card.id];
        const historyItem = { user: user.username, item: card.title, key1: 'theCard', key2: 'cardDeleted' };
        const msg = `${window.i18nData.theCard}${card.title}${window.i18nData.cardDeleted}${user.username}`;
        const notificationType = 'danger';
        updateBoard(newBoard, msg, notificationType, historyItem);
        toggleMiniCardDetailsHandler(miniCard);
        console.log('duplicateCard: ', newBoard);
    }

    render() {
        const { direction } = this.props;
        const { boundingClientRect } = this.props.miniCard;
        let top = boundingClientRect.top;

        if (top + 180 > window.innerHeight) top = window.innerHeight - 180;

        return (
            <div className="flex column mini-card-editor-container"
                dir={direction}
                style={{
                    left: (direction === 'ltr') ? boundingClientRect.left + 265 + 'px' : boundingClientRect.left - 295 + 'px',
                    top: (top + 1) + 'px'
                }}>
                <MiniCardDetailsButton text={`🖊️ ${window.i18nData.editLabels}`} onClick={() => this.toggleHandler('toggleLabels')} direction={direction} />
                <MiniCardDetailsButton text={`🎭 ${window.i18nData.editCardMembers}`} onClick={() => this.toggleHandler('toggleMembers')} direction={direction} />
                <MiniCardDetailsButton text={`📅 ${window.i18nData.editLabels}`} onClick={() => this.toggleHandler('toggleDueDate')} direction={direction} />
                <MiniCardDetailsButton text={`⎘ ${window.i18nData.duplicateCard}`} onClick={this.duplicateCard} direction={direction} />
                <MiniCardDetailsButton text={`🗑️ ${window.i18nData.deleteCard}`} onClick={this.deleteCard} direction={direction} />
                <button className="save-mini-card-btn" onClick={this.props.onSave}>
                    {window.i18nData.save}
                </button>
            </div>
        )
    }

}