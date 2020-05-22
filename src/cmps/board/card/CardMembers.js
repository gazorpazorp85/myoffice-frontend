import React from 'react';

import CloseIcon from '@material-ui/icons/Close';

import TeamMemberIcon from '../../TeamMemberIcon';

import CardService from '../../../services/CardService';

export default function CardMembers(props) {

    const { board, cardMembers, style, toggle } = props;
    console.log(cardMembers);
    const availableCollaborators = board.boardMembers.filter(member => !cardMembers.find(cardMember => cardMember._id === member._id));

    return (
        <div className="flex column card-members-container" style={style}>
            <CloseIcon className="pointer close-btn-card-members" onClick={() => toggle('toggleMembers')} />
            <div className="uppercase card-members-section-title">{window.i18nData.addRemoveCardMembers}</div>
            <div className="flex column">
                {cardMembers.map(member => {
                    return (
                        <div className="flex pointer card-members-preview" key={member._id} onClick={() => CardService.updateCardMembers(props, member)}>
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
                        <div className="flex pointer card-members-preview" key={member._id} onClick={() => CardService.updateCardMembers(props, member)}>
                            <TeamMemberIcon user={member} />
                            <div className="flex center align-center capitalize">{member.firstName} {member.lastName}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}