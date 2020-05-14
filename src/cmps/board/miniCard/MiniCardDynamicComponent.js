import React from 'react';

import MiniCardMap from './MiniCardMap';

export default function MiniCardDynamicComponent({ board, direction, miniCard, toggleMiniCardDetailsHandler, updateBoard, user }) {

    const Cmp = MiniCardMap[miniCard.card.type];

    return (

        <Cmp
            board={board}
            direction={direction}
            miniCard={miniCard}
            toggleMiniCardDetailsHandler={toggleMiniCardDetailsHandler}
            updateBoard={updateBoard}
            user={user}
        />
    )
}