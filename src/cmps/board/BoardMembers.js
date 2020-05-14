import React, { Component } from 'react';

import BoardMembersPreview from './BoardMembersPreview';

export default class BoardMembers extends Component {

    state = {
        currentBoardMembers: [],
    }

    componentDidMount = () => {
        this.setState({ currentBoardMembers: this.props.board.boardMembers });
    }

    updateBoardMembers = (user) => {
        const newBoard = { ...this.props.board };
        let boardMembers = newBoard.boardMembers;
        let historyItem = {};
        let msgBody = '';
        let notificationType = '';
        if (boardMembers.find(boardMember => boardMember._id === user._id)) {
            const idx = boardMembers.findIndex(boardMember => boardMember._id === user._id);
            boardMembers.splice(idx, 1);
            msgBody = window.i18nData.removedCollaborator;
            notificationType = 'danger';
            historyItem = { user: user.username, key: 'removedCollaborator' };
        } else {
            boardMembers.push(user);
            msgBody = window.i18nData.addedCollaborator;
            notificationType = 'success';
            historyItem = { user: user.username, key: 'addedCollaborator' };
        }
        const msg = `${user.username} ${msgBody}`;
        this.setState({ currentBoardMembers: boardMembers });
        this.props.updateBoard(newBoard, msg, notificationType, historyItem);
        this.props.close('toggleBoardMembers');
    }

    onStopPropagation = (ev) => {
        ev.stopPropagation();
    }

    render() {

        const currentBoardMembers = this.state.currentBoardMembers;
        const collaborators = this.props.collaborators;
        let direction = this.props.direction;

        return (
            <div className='flex column side-menu-container boardmembers-container'
                dir={direction}
                style={{ right: direction === 'ltr' ? 0 : 'unset', left: direction === 'rtl' ? 0 : 'unset' }}>
                <div>
                    <h2 className="uppercase">{window.i18nData.boardMembers}:</h2>
                    <hr />
                    {currentBoardMembers.length === 0 ? 
                    <div>
                        {window.i18nData.inviteMembers}
                    </div>
                    : <BoardMembersPreview members={currentBoardMembers} updateBoardMembers={this.updateBoardMembers} />}
                </div>
                <hr />
                <div>
                    <div className="uppercase">{window.i18nData.addRemoveUser}</div>
                    <BoardMembersPreview members={collaborators} updateBoardMembers={this.updateBoardMembers} />
                </div>
            </div>
        )
    }
}