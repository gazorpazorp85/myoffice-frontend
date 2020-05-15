import React from 'react';

export default function MiniCardDetailsButton({ direction, onClick, text }) {
    return (
        <div className={`flex center align-center capitalize pointer mini-card-button ${direction}`} dir={direction} onClick={onClick}>
            <div>{text}</div>
        </div>
    )
}