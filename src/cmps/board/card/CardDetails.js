import React from 'react';
import moment from 'moment';

import CardDescriptionIcon from '@material-ui/icons/NotesOutlined';
import CardDueDateIcon from '@material-ui/icons/EventOutlined';
import CardTitleIcon from '@material-ui/icons/DescriptionOutlined';
import CloseIcon from '@material-ui/icons/Close';

import CardDetailsEditor from './CardDetailsEditor';
import TeamMemberIcon from '../../TeamMemberIcon';
import TitleContainer from '../TitleContainer';
// import CardDueDate from './CardDueDate';
// import CardLabels from './CardLabels';
// import CardMembers from './CardMembers';

// import CardService from '../../../services/CardService';


export default function CardDetails({ board, card, direction, language, list, selectedCardHandler, toggle, updateBoard, user }) {

    console.log(card, list);

    const toggleHandler = () => {
        toggle('isCardDetailsShown');
        selectedCardHandler(card, list);
    }

    moment.locale(language);

    const rotateIcon = direction === 'rtl' ? { transform: 'rotate3d(0, -100, 7, 180deg)' } : {};
    const cardTitleIconRotate = direction === 'rtl' ? {} : { transform: 'rotate3d(0, -100, 7, 180deg)' };

    return (
        <div className="flex screen card-details">
            <div className="flex card-details-container" dir={direction}>
                <div className="flex column card-details-info-container">
                    <div className="flex card-details-title-container">
                        <CardTitleIcon className="card-details-card-title-icon" style={cardTitleIconRotate} />
                        <div className="flex column">
                            <TitleContainer board={board} card={card} updateBoard={updateBoard} user={user} />
                            <div className="in-list-container">
                                {window.i18nData.inList}{list.title}
                            </div>
                        </div>
                    </div>

                    {card.labels.length !== 0 &&
                        <div className="card-details-labels-container">
                            <div className="uppercase labels-title-container">{window.i18nData.cardLabelsIcon}</div>
                            <div className="flex">
                                {card.labels.map(label => <div key={label} className={`${label} medium-label`}></div>)}
                            </div>
                        </div>}

                    {card.cardMembers.length !== 0 &&
                        <div className="card-details-members-container">
                            <div className="uppercase members-title-container">{window.i18nData.cardMembersIcon}</div>
                            <div className="flex align-center">
                                {card.cardMembers.map(member => <TeamMemberIcon key={member.username} style={{ height: 25, width: 25, fontSize: 12 }} user={member} />)}
                            </div>
                        </div>
                    }

                    <div className="flex card-details-duedate-container">
                        <CardDueDateIcon className="card-details-card-duedate-icon" style={rotateIcon} />
                        <div className="flex column">
                            <div className="capitalize">{window.i18nData.cardDetailsDueDate}</div>
                            {card.dueDate ?
                                <div className="card-details-card-duedate-time">{moment(card.dueDate).format('LLLL')}</div> :
                                <div>{window.i18nData.cardDueDateNotSet}</div>}
                        </div>
                    </div>

                    <div className="flex card-details-description-container">
                        <CardDescriptionIcon className="card-details-card-description-icon" style={rotateIcon} />
                        <div className="flex column">
                            <div className="capitalize">{window.i18nData.cardDetailsDescription}</div>
                            <textarea
                                className="card-description-textarea"
                                cols="32"
                                name="description"
                                spellCheck="false"
                                value={card.description}
                                placeholder={window.i18nData.enterCardDescription} />
                        </div>
                    </div>

                </div>
                <div className="flex column card-details-editor-container">
                    <CloseIcon className="pointer card-details-close-btn" onClick={() => toggleHandler()} />
                    <CardDetailsEditor rotateIcon={rotateIcon}/>
                </div>
            </div>
        </div>
    )
}