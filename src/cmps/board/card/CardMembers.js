import React from 'react';

import CloseIcon from '@material-ui/icons/Close';

import TeamMemberIcon from '../../TeamMemberIcon';

export default function CardMembers({ board, card, cardMembers, direction, toggle, updateBoard, user }) {

    console.log(cardMembers)

    const updateCardMembers = (collaborator) => {
        const newCardMembers = [...cardMembers];
        const idx = newCardMembers.findIndex(currMember => currMember._id === collaborator._id);
        (idx >= 0) ? newCardMembers.splice(idx, 1) : newCardMembers.push(collaborator);
        const newCard = { ...card, cardMembers: newCardMembers };
        const newBoard = { ...board, cards: { ...board.cards, [newCard.id]: newCard } };
        const msg = (idx >= 0) ? `${window.i18nData.theCard}${newCard.title}${window.i18nData.cardAssigned}${user.username}`
            : `${window.i18nData.theCard}${newCard.title}${window.i18nData.listRemoved}${user.username}`;
        const notificationType = (idx >= 0) ? 'danger' : 'success';
        const historyItem = (idx >= 0) ?
            { user: `"${newCard.title}"`, item: collaborator.username, key1: 'theUser', key2: 'userDismissed' } :
            { user: collaborator.username, item: newCard.title, key1: 'theCard', key2: 'cardAssigned' }

        updateBoard(newBoard, msg, notificationType, historyItem);
        toggle('toggleMembers');

    }

    const availableCollaborators = board.boardMembers.filter(member => !cardMembers.find(cardMember => cardMember._id === member._id));
    const style = direction === 'ltr' ? 'left' : 'right';

    return (
        <div className="flex column card-members-container" style={{ [style]: 9, top: 75 }}>
            <CloseIcon className="pointer close-btn-card-members" onClick={() => toggle('toggleMembers')} />
            <div className="uppercase card-members-section-title">{window.i18nData.addRemoveCardMembers}</div>
            <div className="flex column">
                {cardMembers.map(member => {
                    return (
                        <div className="flex pointer card-members-preview" key={member._id} onClick={() => updateCardMembers(member)}>
                            <TeamMemberIcon user={member} />
                            <div className="flex center align-center capitalize">{member.firstName} {member.lastName}</div>
                        </div>
                    )
                })}
                {cardMembers.length === 0 && <div className="capitalize no-card-members">{window.i18nData.noCardMembers}</div>}
            </div>
            <div className="uppercase card-members-section-title">{window.i18nData.availableMembers}</div>
            <div className="flex column">
                {availableCollaborators.map(member => {
                    return (
                        <div className="flex pointer card-members-preview" key={member._id} onClick={() => updateCardMembers(member)}>
                            <TeamMemberIcon user={member} />
                            <div className="flex center align-center capitalize">{member.firstName} {member.lastName}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}