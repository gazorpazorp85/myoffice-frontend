import React from 'react';

import CardDetailsEditorIcon from './CardDetailsEditorIcon';

import CardDueDateIcon from '@material-ui/icons/EventOutlined';
import CardLabelsIcon from '@material-ui/icons/LabelOutlined';
import CardMembersIcon from '@material-ui/icons/PersonAddOutlined';
import CardTodosIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import DuplicateCardIcon from '@material-ui/icons/FileCopyOutlined';
import DeleteCardIcon from '@material-ui/icons/DeleteOutlineOutlined';

export default function CardDetailsEditor({ rotateIcon }) {

    const topIconsArray = [
        { cmp: CardLabelsIcon, string: 'cardLabelsIcon' },
        { cmp: CardMembersIcon, string: 'cardMembersIcon' },
        { cmp: CardTodosIcon, string: 'cardTodosIcon' },
        { cmp: CardDueDateIcon, string: 'cardDueDateIcon', style: rotateIcon }];
    const bottomIconsArray = [
        { cmp: DuplicateCardIcon, string: 'duplicateCardIcon' },
        { cmp: DeleteCardIcon, string: 'deleteCardIcon' }];

    return (
        <div className="flex column card-editor-container">
            <div className="uppercase">
                {window.i18nData.addToCard}
            </div>
            <div className="flex column">
                {topIconsArray.map(icon => <CardDetailsEditorIcon key={icon.string} icon={icon} />)}
            </div>
            <div className="uppercase" style={{ paddingTop: 20 }}>
                {window.i18nData.cardActions}
            </div>
            <div className="flex column">
                {bottomIconsArray.map(icon => <CardDetailsEditorIcon key={icon.string} icon={icon} />)}
            </div>
        </div>
    )
}