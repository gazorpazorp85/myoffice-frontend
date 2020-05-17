import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

import CardPreview from '../card/CardPreview';

export default class CardsList extends Component {

    state = {
        currCardId: '',
        isEditButtonShown: false,
        onCardId: '',
    }

    showEditBtn = (cardId) => {
        this.setState({ isEditButtonShown: true, onCardId: cardId });
    }

    hideEditBtn = () => {
        this.setState({ isEditButtonShown: false })
    }

    cardDetailsToggleHandler = (card, list) => {
        const { selectedCardHandler, toggle } = this.props;
        toggle('isCardDetailsShown');
        selectedCardHandler(card, list);
    }

    render() {

        const { cards, list, provided, innerRef, isDraggingOver, toggleMiniCardDetailsHandler } = this.props;
        const { onCardId, isEditButtonShown } = this.state;

        const isDraggingOverHandler = isDraggingOver ? "isDraggingOver" : "";

        return (
            <div className={`card-list ${isDraggingOverHandler}`} {...provided.droppableProps} ref={innerRef}>
                {cards.map((card, idx) => (
                    <div key={card.id} className="card-container">
                        <Draggable draggableId={card.id} index={idx}>
                            {(provided, snapshot) => (
                                <NaturalDragAnimation style={provided.draggableProps.style} snapshot={snapshot} rotationMultiplier={1.3}>
                                    {style => (
                                        <div key={card.id}
                                            onClick={() => this.cardDetailsToggleHandler(card, list)}
                                            onMouseEnter={() => this.showEditBtn(card.id)}
                                            onMouseLeave={() => this.hideEditBtn(card.id)} >
                                            <CardPreview
                                                card={card}
                                                innerRef={provided.innerRef}
                                                isDragging={snapshot.isDragging}
                                                isEditButtonShown={isEditButtonShown}
                                                list={list}
                                                onCardId={onCardId}
                                                provided={provided}
                                                style={style}
                                                toggleMiniCardDetailsHandler={toggleMiniCardDetailsHandler}
                                            />
                                        </div>
                                    )}
                                </NaturalDragAnimation>
                            )}
                        </Draggable>
                    </div>
                ))}
                {provided.placeholder}
            </div>
        )
    }
}