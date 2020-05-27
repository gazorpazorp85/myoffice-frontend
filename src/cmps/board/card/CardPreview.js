import React from 'react';

import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CreateIcon from '@material-ui/icons/Create';
import SubjectIcon from '@material-ui/icons/Subject';

import TeamMemberIcon from '../../TeamMemberIcon';

export default function CardPreview({ card, direction, innerRef, isDragging, isEditButtonShown, list, onCardId, provided, style, toggleMiniCardDetails }) {

    const cardContainer = React.createRef();
    const isDraggingClassName = isDragging ? 'isDragging' : '';
    const withoutPadding = card.url && card.type !== 'text' ? 'without-padding' : '';
    const rotateIcon = direction === 'rtl' ? { transform: 'rotate3d(0, -100, 7, 180deg)' } : {};

    return (
        <section ref={cardContainer}>
            <div className={`flex column card-preview-container ${isDraggingClassName} ${withoutPadding}`}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={innerRef}
                style={style}>
                {isEditButtonShown && (onCardId === card.id) &&
                    <div className="flex card-edit-icon-container">
                        <CreateIcon className="card-edit-icon" onClick={(ev) => toggleMiniCardDetails(ev, card, cardContainer, list)} />
                    </div>}
                {card.type === 'video' &&
                    <iframe title={card.id} type='text/html'
                        width="252" height="142"
                        allowFullScreen="allowfullscreen"
                        src={card.url} security="restricted" />}
                {card.type === 'image' && <img title={card.id} alt='card' src={card.url} />}
                {card.labels.length > 0 &&
                    <div className="flex wrap">
                        {card.labels.map(label => <div key={label} className={`${label} small-label`}></div>)}
                    </div>}
                {card.url && card.type === 'text' ?
                    <div className="card-url-container">
                        <a className="card-url"
                            href={card.url.substring(0, 4) === 'http' ? card.url : 'https://' + card.url}
                            target='blank'
                            onClick={(ev) => ev.stopPropagation()}>
                            {card.url}
                        </a>
                        <div className="flex card-title">{card.title}</div>
                    </div> : card.type !== 'text' ?
                    <div className="flex card-title no-url-no-text">{card.title}</div> :
                    <div className="flex card-title">{card.title}</div>
                }
                {(card.description || card.dueDate || card.todos.length > 0 || card.cardMembers.length > 0) && <div className="flex align-center wrap card-preview-details-container">
                    {card.description && <div className="flex card-detail-info"><SubjectIcon style={rotateIcon} /></div>}
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