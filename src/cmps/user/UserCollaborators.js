import React from 'react';

import AddIcon from '@material-ui/icons/Add'
import NewRequestIcon from '@material-ui/icons/PersonAddOutlined';

import TeamMemberIcon from '../TeamMemberIcon';

// export default function UserCollaborators({ collaborators, requests, toggle }) {
export default function UserCollaborators({ collaborators, toggle }) {

    // const requestsNumber = requests.length > 0 ? requests.length : null;

    return (
        <div className="flex user-collaborators-container">
            {collaborators.length > 0 ?
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
                </div> :
                <div className="flex column no-collaborators-container">
                    <div>{window.i18nData.noCollaboratorsToShowPt1}</div>
                    <div>{window.i18nData.noCollaboratorsToShowPt2}</div>
                </div>}
            <div>
                <div className="btn add-collaborator" onClick={toggle}>
                    <div>
                        <AddIcon style={{ fontSize: 'small' }} />
                        {window.i18nData.addCollaborators}
                    </div>
                </div>
                {/* {requestsNumber &&
                    <div className="flex align-center" style={{ marginTop: '20px' }}>
                        <NewRequestIcon />
                        <div className="pointer capitalize requests-container">
                            you have {requestsNumber} new request
                        </div>
                    </div>} */}
            </div>
        </div>
    )
}