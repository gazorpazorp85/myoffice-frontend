import React from 'react';

import CardDetailsEditorIcon from './CardDetailsEditorIcon';

import CardDueDateIcon from '@material-ui/icons/EventOutlined';
import CardLabelsIcon from '@material-ui/icons/LabelOutlined';
import CardMembersIcon from '@material-ui/icons/PersonAddOutlined';
import CardTodosIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import DuplicateCardIcon from '@material-ui/icons/FileCopyOutlined';
import DeleteCardIcon from '@material-ui/icons/DeleteOutlineOutlined';

import CardService from '../../../services/CardService';

export default function CardDetailsEditor(props) {

    const { rotateIcon, toggle } = props;

    const topIconsArray = [
        { cmp: CardLabelsIcon, string: 'cardLabelsIcon', field: 'toggleLabels' },
        { cmp: CardMembersIcon, string: 'cardMembersIcon', field: 'toggleCardMembers' },
        { cmp: CardTodosIcon, string: 'cardTodosIcon', field: 'toggleCardTodosEditor' },
        { cmp: CardDueDateIcon, string: 'cardDueDateIcon', field: 'toggleDueDate', style: rotateIcon }];
    const bottomIconsArray = [
        { cmp: DuplicateCardIcon, string: 'duplicateCardIcon', field: 'duplicateCard' },
        { cmp: DeleteCardIcon, string: 'deleteCardIcon', field: 'deleteCard' }];
    
    const deleteDuplicateHandler = (iconField, props) => {
        CardService[iconField](props);
        props.cardDetailsToggle();
    }

    return (
        <div className="flex column card-editor-container">
            <div className="uppercase">
                {window.i18nData.addToCard}
            </div>
            <div className="flex column">
                {topIconsArray.map(icon => <CardDetailsEditorIcon key={icon.string} icon={icon} functionToRun={() => toggle(icon.field)} />)}
            </div>
            <div className="uppercase" style={{ paddingTop: 20 }}>
                {window.i18nData.cardActions}
            </div>
            <div className="flex column">
                {bottomIconsArray.map(icon => <CardDetailsEditorIcon key={icon.string} icon={icon} functionToRun={() => deleteDuplicateHandler(icon.field, props)} />)}
            </div>
        </div>
    )
}