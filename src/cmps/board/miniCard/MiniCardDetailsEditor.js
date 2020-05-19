import React, { Component } from 'react';

import CardDueDate from '../card/CardDueDate';
import CardLabels from '../card/CardLabels';
import CardMembers from '../card/CardMembers';
import MiniCardDetailsButton from './MiniCardDetailsButton';

import CardService from '../../../services/CardService';

export default class MiniCardDetailsEditor extends Component {

    state = {
        toggleDueDate: false,
        toggleLabels: false,
        toggleMembers: false,
    }

    toggleHandler = (toggleKey) => {
        this.setState(prevState => ({ [toggleKey]: !prevState[toggleKey] }));
    }

    duplicateCard = () => {
        const newProps = { ...this.props };
        newProps.card = newProps.miniCard.card;
        newProps.list = newProps.miniCard.list;
        delete newProps.miniCard;
        CardService.duplicateCard(newProps);
        this.props.toggleMiniCardDetailsHandler(newProps.card);
    }

    deleteCard = () => {
        const newProps = { ...this.props };
        newProps.card = newProps.miniCard.card;
        newProps.list = newProps.miniCard.list;
        delete newProps.miniCard;
        CardService.deleteCard(newProps);
        this.props.toggleMiniCardDetailsHandler(newProps.card);
    }

    adjustLeft = () => {
        const { direction, miniCard } = this.props;
        let { left } = miniCard.boundingClientRect;
        return (direction === 'ltr') ? left + 265 : left - 295;
    }

    render() {
        const { board, direction, labels, miniCard, top, updateBoard, user } = this.props;
        const { toggleDueDate, toggleLabels, toggleMembers } = this.state;
        const cardMembers = board.cards[miniCard.card.id].cardMembers;
        const left = this.adjustLeft();
        const styleDirection = direction === 'ltr' ? 'left' : 'right';

        return (
            <div className="flex column mini-card-editor-container"
                dir={direction}
                style={{
                    left: left + 'px',
                    top: top + 'px'
                }}>
                <MiniCardDetailsButton text={`🖊️ ${window.i18nData.editLabels}`} onClick={() => this.toggleHandler('toggleLabels')} direction={direction} />
                {toggleLabels &&
                    <CardLabels
                        board={board}
                        card={miniCard.card}
                        labels={labels}
                        style={{ [styleDirection]: 9, top: 37 }}
                        toggle={this.toggleHandler}
                        updateBoard={updateBoard}
                        user={user} />}
                <MiniCardDetailsButton text={`🎭 ${window.i18nData.editCardMembers}`} onClick={() => this.toggleHandler('toggleMembers')} direction={direction} />
                {toggleMembers &&
                    <CardMembers
                        board={board}
                        card={miniCard.card}
                        cardMembers={cardMembers}
                        style={{ [styleDirection]: 9, top: 76 }}
                        toggle={this.toggleHandler}
                        updateBoard={updateBoard}
                        user={user} />}
                <MiniCardDetailsButton text={`📅 ${window.i18nData.editDueDate}`} onClick={() => this.toggleHandler('toggleDueDate')} direction={direction} />
                {toggleDueDate &&
                    <CardDueDate
                        board={board}
                        card={miniCard.card}
                        language={direction === 'ltr' ? 'en' : 'he'}
                        toggle={this.toggleHandler}
                        style={{ [styleDirection]: 9, top: 112 }}
                        updateBoard={updateBoard}
                        user={user} />}
                <MiniCardDetailsButton text={`⎘ ${window.i18nData.duplicateCard}`} onClick={this.duplicateCard} direction={direction} />
                <MiniCardDetailsButton text={`🗑️ ${window.i18nData.deleteCard}`} onClick={this.deleteCard} direction={direction} />
                <button className="save-mini-card-btn" onClick={this.props.onSave}>
                    {window.i18nData.save}
                </button>
            </div>
        )
    }
}