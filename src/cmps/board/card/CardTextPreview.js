import React from 'react';

import CreateIcon from '@material-ui/icons/Create';
import SubjectIcon from '@material-ui/icons/Subject';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import TeamMemberIcon from '../../TeamMemberIcon';

export default function CardTextPreview({ card, innerRef, isDragging, list, onCardId, provided, style, toggleEditBtn, toggleMiniCardDetailsHandler }) {

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

    const isDraggingClassName = isDragging ? " isDragging" : "";

    return (
        <section ref={cardContainer}>
            <div className={`flex column card-preview-container ${isDraggingClassName}`}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={innerRef}
                style={style}>
                {card.url && <img title={card.id} alt='card' src={card.url} />}
                <div className="flex wrap">
                    {card.labels.map(label => <div key={label} className={`small-label ${label}`}></div>)}
                </div>
                <div className="flex card-title">{card.title}</div>
                {toggleEditBtn && (onCardId === card.id) &&
                    <div className="flex card-edit-icon-container">
                        <CreateIcon className="card-edit-icon" onClick={(ev) => toggleMiniCardDetails(ev)} />
                    </div>}
                <div className="flex align-center wrap card-details-container">
                    {card.description && <div className="flex card-detail-info"><SubjectIcon /></div>}
                    {card.todos.length > 0 &&
                        <div className="flex card-detail-info">
                            <CheckBoxIcon />
                            <div>{`${card.doneTodos}/${card.todos.length}`}</div>
                        </div>}
                    <div className="flex card-detail-info">
                        {card.cardMembers.map(member => <TeamMemberIcon user={member} key={member.username} style={{ height: 25 + 'px', width: 25 + 'px', fontSize: 12 + 'px' }} />)}
                    </div>
                </div>
            </div>
        </section>
    )
}