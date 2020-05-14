import React from 'react';

import CardMap from './CardMap';

export default function CardDynamicComponent({ card, innerRef, isDragging, list, onCardId, provided, style, toggleMiniCardDetailsHandler, toggleEditBtn }) {

    const Cmp = CardMap[card.type];

    return (

        <Cmp card={card}
            innerRef={innerRef}
            isDragging={isDragging}
            list={list}
            onCardId={onCardId}
            provided={provided}
            style={style}
            toggleEditBtn={toggleEditBtn}
            toggleMiniCardDetailsHandler={toggleMiniCardDetailsHandler}
        />

    )
}