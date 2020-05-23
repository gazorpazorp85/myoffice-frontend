import React from 'react';

export default function MiniCardDetailsButton({ direction, Icon, onClick, text }) {
    return (
        <div className={`flex center align-center capitalize pointer mini-card-button ${direction}`} dir={direction} onClick={onClick}>
            <Icon className="mini-card-icon"/>
            <div>{text}</div>
        </div>
    )
}