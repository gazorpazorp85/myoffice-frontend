import React from 'react';

import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CreateIcon from '@material-ui/icons/Create';
import SubjectIcon from '@material-ui/icons/Subject';

import TeamMemberIcon from '../../TeamMemberIcon';

export default function CardPreview({ card, innerRef, isDragging, isEditButtonShown, list, onCardId, provided, style, toggleMiniCardDetailsHandler }) {

    const cardContainer = React.createRef();

    const toggleMiniCardDetails = (ev) => {
        ev.stopPropagation();
        const miniCard = {
            card: card,
            boundingClientRect: cardContainer.current.getBoundingClientRect(),
            list: list
        };
        toggleMiniCardDetailsHandler(miniCard);
    }

    const isDraggingClassName = isDragging ? 'isDragging' : '';
    const withoutPadding = card.url ? 'without-padding' : '';

    return (
        <section ref={cardContainer}>
            <div className={`flex column card-preview-container ${isDraggingClassName} ${withoutPadding}`}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={innerRef}
                style={style}>
                {isEditButtonShown && (onCardId === card.id) &&
                    <div className="flex card-edit-icon-container">
                        <CreateIcon className="card-edit-icon" onClick={(ev) => toggleMiniCardDetails(ev)} />
                    </div>}
                {card.type === 'video' &&
                    <iframe title={card.id} type='text/html'
                        width="252" height="142"
                        allowFullScreen="allowfullscreen"
                        src={card.url} security="restricted" />}
                {card.type === 'image' && <img title={card.id} alt='card' src={card.url} />}
                <div className="flex wrap">
                    {card.labels.map(label => <div key={label} className={`${label} small-label`}></div>)}
                </div>
                {card.url === card.title ?
                    <div>
                        <a className="card-url" href={card.title} target='blank' onClick={(ev) => ev.stopPropagation()}>{card.title}</a>
                        <div className="flex card-title"></div>
                    </div> :
                    <div className="flex card-title">{card.title}</div>
                }
                {(card.description || card.dueDate || card.todos.length > 0 || card.cardMembers.length > 0) && <div className="flex align-center wrap card-preview-details-container">
                    {card.description && <div className="flex card-detail-info"><SubjectIcon /></div>}
                    {card.todos.length > 0 &&
                        <div className="flex card-detail-info">
                            <CheckBoxIcon />
                            <div>{`${card.doneTodos}/${card.todos.length}`}</div>
                        </div>}
                    {card.dueDate && <div className="flex card-detail-info"><AccessAlarmIcon /></div>}
                    <div className="flex card-detail-info">
                        {card.cardMembers.map(member => <TeamMemberIcon user={member} key={member.username} style={{ height: 25 + 'px', width: 25 + 'px', fontSize: 12 + 'px' }} />)}
                    </div>
                </div>}
            </div>
        </section>
    )
}