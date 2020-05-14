import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

import CardDynamicComponent from '../card/CardDynamicComponent';

export default class CardsList extends Component {

    state = {
        currCardId: '',
        onCardId: '',
        toggleEditBtn: false
    }

    toggleEditBtnHandler = (cardId) => {
        this.setState(prevState => ({
            toggleEditBtn: !prevState.toggleEditBtn,
            onCardId: prevState.onCardId === cardId ? '' : cardId
        }))
    }

    render() {

        const { cards, list, provided, innerRef, isDraggingOver, toggleMiniCardDetailsHandler } = this.props;
        const { onCardId, toggleEditBtn } = this.state;

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
                                            onMouseEnter={() => this.toggleEditBtnHandler(card.id)}
                                            onMouseLeave={() => this.toggleEditBtnHandler(card.id)} >
                                            <CardDynamicComponent
                                                card={card}
                                                innerRef={provided.innerRef}
                                                isDragging={snapshot.isDragging}
                                                list={list}
                                                onCardId={onCardId}
                                                provided={provided}
                                                style={style}
                                                toggleEditBtn={toggleEditBtn}
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