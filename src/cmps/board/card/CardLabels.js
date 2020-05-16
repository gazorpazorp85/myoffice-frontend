import React from 'react';

import CloseIcon from '@material-ui/icons/Close';

export default function CardLabels({ board, card, direction, labels, toggle, updateBoard, user }) {

    const updateChoosenLabels = (labelName) => {
        let newCardLabels = [...labels];
        const idx = newCardLabels.findIndex(cardLabel => cardLabel === labelName);
        (idx >= 0) ? newCardLabels.splice(idx, 1) : newCardLabels.push(labelName);
        const newCard = { ...card, labels: newCardLabels };
        const newBoard = { ...board, cards: { ...board.cards, [newCard.id]: newCard } };
        const msg = (idx >= 0) ? `${window.i18nData.aLabel}${newCard.title}${window.i18nData.listAdded}${user.username}`
            : `${window.i18nData.aLabel}${newCard.title}${window.i18nData.listRemoved}${user.username}`;
        const notificationType = (idx >= 0) ? 'danger' : 'success';
        const historyItem = { user: user.username, item: newCard.title, key1: 'aLabel', key2: (idx >= 0) ? 'listDeleted' : 'listAdded' }
        updateBoard(newBoard, msg, notificationType, historyItem);
        toggle('toggleLabels');
    }

    const labelsClassNames = ['label-color-1', 'label-color-2', 'label-color-3', 'label-color-4', 'label-color-5', 'label-color-6'];
    const style = direction === 'ltr' ? 'left' : 'right';

    return (
        <div className="flex column labels-container" style={{ [style]: 9, top: 37 }}>
            <CloseIcon className="pointer close-btn-labels" onClick={() => toggle('toggleLabels')} />
            <div className="uppercase label-title">{window.i18nData.addRemoveLabels}</div>
            <div className="flex column align-center">
                {labelsClassNames.map(labelClassName => {
                    return (
                        <div className={`${labelClassName} large-label`}
                            key={labelClassName}
                            onClick={() => updateChoosenLabels(labelClassName)}>
                        </div>)
                })}
            </div>
        </div>
    )
}