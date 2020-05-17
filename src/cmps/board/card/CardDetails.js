import React from 'react';

import CardTitleIcon from '@material-ui/icons/DescriptionOutlined';
import CloseIcon from '@material-ui/icons/Close';

import CardDetailsEditor from './CardDetailsEditor';
import ListTitleContainer from '../list/ListTitleContainer';
// import CardDueDate from './CardDueDate';
// import CardLabels from './CardLabels';
// import CardMembers from './CardMembers';

// import CardService from '../../../services/CardService';

export default function CardDetails({ board, card, direction, list, selectedCardHandler, toggle, updateBoard, user }) {

    console.log(card, list);

    const toggleHandler = () => {
        toggle('isCardDetailsShown');
        selectedCardHandler(card, list);
    }

    return (
        <div className="flex screen card-details">
            <div className="flex card-details-container" dir={direction}>
                <div className="flex column card-details-info-container">
                    <div className="flex card-details-title-container">
                        <CardTitleIcon />
                        <ListTitleContainer board={board} list={list} updateBoard={updateBoard} user={user} />
                    </div>
                </div>
                <div className="flex column card-details-editor-container">
                    <CloseIcon className="pointer card-details-close-btn" onClick={() => toggleHandler()} />
                    <CardDetailsEditor />
                </div>
            </div>
        </div>
    )
}