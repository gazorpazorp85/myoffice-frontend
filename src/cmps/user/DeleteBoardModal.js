import React from 'react';

export default function DeleteBoardModal({ deleteConfirmation }) {
    return (
        <div className="flex center align-center screen delete-board-modal">
            <div className="flex column center align-center delete-board-modal-container">
                <div className="flex column board-delete-message">
                    <div>
                        {window.i18nData.deleteBoardWarningPt1}
                    </div>
                    <div>
                        {window.i18nData.deleteBoardWarningPt2}
                    </div>
                    <div>
                        {window.i18nData.deleteBoardWarningPt3}
                    </div>
                    <small>
                        {window.i18nData.deleteBoardWarningPt4}
                    </small>
                </div>
                <div className="flex board-delete-buttons-container">
                    <button className="board-delete" onClick={() => deleteConfirmation('delete')}>{window.i18nData.deleteBoard}</button>
                    <button className="board-delete-cancel" onClick={() => deleteConfirmation('cancel')}>{window.i18nData.cancelDeleteBoard}</button>
                </div>
            </div>
        </div>
    )
}