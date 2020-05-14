import React from 'react';

import utils from '../services/utils';

export default function TeamMemberIcon({ user, style }) {
    return (
        <div className="flex center align-center team-member-icon" style={style}>
            <div>{utils.createUserIcon(user.firstName, user.lastName)}</div>
        </div>
    )
}