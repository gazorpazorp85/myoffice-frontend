import React from 'react';

export default function UserBoardPreview({ deleteBoard, duplicateBoard, openBoard, userBoards }) {
    return (
        userBoards.map(board => {
            return (
                <div className="flex user-board-preview-container" key={board._id}>
                    <div className="board-preview-thumbnail-container">
                        <img className="board-preview-thumbnail" src={board.boardBgThumbnail} alt="" />
                    </div>
                    <div className="flex column">
                        <div>{window.i18nData.boardTitle}{board.title}</div>
                        <div className="flex">
                            <div style={{ marginInlineEnd: '5px' }}>{window.i18nData.collaborators}</div>
                            {board.boardMembers.length > 0 ?
                                <div className="flex column">{
                                    board.boardMembers.map(member => <div key={member._id}>{member.username}</div>)}
                                </div> :
                                <div className="capitalize">
                                    {window.i18nData.noBoardMembers}
                                </div>}
                        </div>
                        <div className="flex board-btn-panel" onClick={(ev) => duplicateBoard(ev, board)}>
                            <div className="btn board-panel">
                                <div>{window.i18nData.duplicateBoard}</div>
                            </div>
                            <div className="btn board-panel delete" onClick={(ev) => deleteBoard(ev, board)}>
                                <div>{window.i18nData.deleteBoard}</div>
                            </div>
                            <div className="btn board-panel" onClick={(ev) => openBoard(ev, board._id)}>
                                <div>{window.i18nData.openBoard}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    )
}