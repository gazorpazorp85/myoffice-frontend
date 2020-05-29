import React from 'react';

import AddIcon from '@material-ui/icons/Add'

import TeamMemberIcon from '../TeamMemberIcon';

export default function UserCollaborators({ collaborators, toggle }) {
    return (
        <div className="flex user-collaborators-container">
            <div className="flex column user-collaborators-list-container">
                {collaborators.map(collaborator => {
                    return (
                        <div className="flex align-center collabolator-container" key={collaborator._id}>
                            <TeamMemberIcon user={collaborator} />
                            <div className="capitalize">
                                {collaborator.firstName} {collaborator.lastName}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div>
                <div className="btn add-collaborator" onClick={() => toggle('addCollaboratorModalToggle')}>
                    <div>
                        <AddIcon style={{ fontSize: 'small' }} />
                        {window.i18nData.addCollaborators}
                    </div>
                </div>
            </div>
        </div>
    )
}