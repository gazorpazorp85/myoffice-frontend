import React from 'react';

import AddIcon from '@material-ui/icons/Add';

export default function AddCardButton({ list, toggleAddCardFormHandler }) {

    const addCardText = (list) => {
        return (list.cardIds.length === 0) ? window.i18nData.addCard : window.i18nData.addAnotherCard;
    }

    return (
        <div className="flex pointer list-footer" onClick={() => toggleAddCardFormHandler(list.id)}>
            <div className="flex align-center" style={{ height: '22px' }}>
                {/* <span className="list-footer-add-icon">+</span>{addCardText(list)} */}
                <AddIcon style={{ fontSize: 'small' }} />{addCardText(list)}
            </div>
        </div>
    )
}