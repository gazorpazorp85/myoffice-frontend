import React from 'react';

import TeamMemberIcon from '../TeamMemberIcon';

export default function BoardMembersPreview({ members, updateBoardMembers }) {

    return (
        <div>
            {members.map(member => {
                return (
                    <div className="flex align-center pointer board-member-preview-container" key={member._id} onClick={() => updateBoardMembers(member)}>
                        <TeamMemberIcon user={member} />
                        <div>{member.firstName} {member.lastName}</div>
                    </div>
                )
            })}
        </div>
    )
}