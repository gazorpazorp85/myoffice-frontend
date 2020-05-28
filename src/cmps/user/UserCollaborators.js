import React from 'react';

export default function UserCollaborators({ collaborators }) {
    return (
        <div>
            {collaborators.map(collaborator => {
                return (
                    <div key={collaborator._id}>{collaborator.firstName} {collaborator.lastName}</div>
                )
            })}
        </div>
    )
}