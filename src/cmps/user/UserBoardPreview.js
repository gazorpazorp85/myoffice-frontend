import React from 'react';

export default function UserBoardPreview({ userBoards }) {
    return (
        userBoards.map(board => {
            return (
                <div className="flex" key={board._id}>
                    <div>
                        <img src={board.boardBgThumbnail} alt="" />
                    </div>
                    <div className="flex column">
                        <div>{window.i18nData.boardTitle}{board.title}</div>
                        <div className="flex">{window.i18nData.boardMembers}: <div className="flex column">{board.boardMembers.map(member => <div key={member._id}>{member.username}</div>)}</div></div>
                    </div>
                </div>
            )
        })
    )
}