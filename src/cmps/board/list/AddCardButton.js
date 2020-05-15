import React from 'react';

export default function AddCardButton({ list, toggleAddCardFormHandler }) {

    const addCardText = (list) => {
        return (list.cardIds.length === 0) ? window.i18nData.addCard : window.i18nData.addAnotherCard;
    }
    
    return (
        <div className="flex pointer list-footer" onClick={() => toggleAddCardFormHandler(list.id)}>
            <div style={{ height: '22px', lineHeight: '22px' }}>
                <span className="list-footer-add-icon">+</span>{addCardText(list)}
            </div>
        </div>
    )
}