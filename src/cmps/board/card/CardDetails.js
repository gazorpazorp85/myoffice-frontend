import React, { Component } from 'react';
import moment from 'moment';

import CardDescriptionIcon from '@material-ui/icons/NotesOutlined';
import CardDueDateIcon from '@material-ui/icons/EventOutlined';
import CardTitleIcon from '@material-ui/icons/DescriptionOutlined';
import CloseIcon from '@material-ui/icons/Close';

import CardDetailsEditor from './CardDetailsEditor';
import TeamMemberIcon from '../../TeamMemberIcon';
import TitleContainer from '../TitleContainer';
import CardDueDate from './CardDueDate';
import CardLabels from './CardLabels';
import CardMembers from './CardMembers';

import CardService from '../../../services/CardService';


export default class CardDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: props.card.description ? props.card.description : '',
            toggleCardMembers: false,
            toggleDueDate: false,
            toggleLabels: false,
        }

        moment.locale(props.language);
    }

    toggleHandler = () => {
        const { card, list, selectedCardHandler, toggle } = this.props;
        toggle('isCardDetailsShown');
        selectedCardHandler(card, list);
    }

    cardDetailsToggleHandler = (field) => {
        this.setState(prevState => ({
            toggleCardMembers: field === 'toggleCardMembers' ? !prevState.toggleCardMembers : false,
            toggleDueDate: field === 'toggleDueDate' ? !prevState.toggleDueDate : false,
            toggleLabels: field === 'toggleLabels' ? !prevState.toggleLabels : false,
        }))
    }

    changeDescription = (ev) => {
        const { value } = ev.target;
        this.setState({ description: value });
    }

    saveDescription = () => {
        CardService.updateCardDescription(this.props, this.state.description);
    }

    render() {

        const { board, card, direction, list, updateBoard, user } = this.props;
        const { cardMembers, dueDate, labels } = board.cards[card.id];
        const { description, toggleCardMembers, toggleDueDate, toggleLabels } = this.state;

        const rotateIcon = direction === 'rtl' ? { transform: 'rotate3d(0, -100, 7, 180deg)' } : {};
        const cardTitleIconRotate = direction === 'rtl' ? {} : { transform: 'rotate3d(0, -100, 7, 180deg)' };
        const styleDirection = direction === 'ltr' ? 'right' : 'left';

        return (
            <div className="flex screen card-details">
                <div className="flex card-details-container" dir={direction}>
                    <div className="flex column card-details-info-container">

                        <div className="flex card-details-title-container">
                            <CardTitleIcon className="card-details-card-title-icon" style={cardTitleIconRotate} />
                            <div className="flex column">
                                <TitleContainer board={board} card={card} updateBoard={updateBoard} user={user} />
                                <div className="in-list-container">
                                    {window.i18nData.inList}{list.title}
                                </div>
                            </div>
                        </div>


                        {toggleLabels && <CardLabels {...this.props} labels={labels} style={{ [styleDirection]: 27, top: 185 }} toggle={this.cardDetailsToggleHandler} />}
                        {labels.length !== 0 &&
                            <div className="card-details-labels-container">
                                <div className="uppercase labels-title-container">{window.i18nData.cardLabelsIcon}</div>
                                <div className="flex">
                                    {labels.map(label => <div key={label} className={`${label} medium-label`}></div>)}
                                </div>
                            </div>}

                        {toggleCardMembers && <CardMembers {...this.props} cardMembers={cardMembers} style={{ [styleDirection]: 25, top: 223 }} toggle={this.cardDetailsToggleHandler} />}
                        {cardMembers.length !== 0 &&
                            <div className="card-details-members-container">
                                <div className="uppercase members-title-container">{window.i18nData.cardMembersIcon}</div>
                                <div className="flex align-center">
                                    {cardMembers.map(member => <TeamMemberIcon key={member.username} style={{ height: 25, width: 25, fontSize: 12 }} user={member} />)}
                                </div>
                            </div>
                        }

                        {toggleDueDate && <CardDueDate {...this.props} style={{ [styleDirection]: 25, top: 307 }} toggle={this.cardDetailsToggleHandler} />}
                        <div className="flex card-details-duedate-container">
                            <CardDueDateIcon className="card-details-card-duedate-icon" style={rotateIcon} />
                            <div className="flex column">
                                <div className="capitalize">{window.i18nData.cardDetailsDueDate}</div>
                                {dueDate ?
                                    <div className="card-details-card-duedate-time">{moment(dueDate).format('LLLL')}</div> :
                                    <div className="card-details-card-duedate-time">{window.i18nData.cardDueDateNotSet}</div>}
                            </div>
                        </div>

                        <div className="flex card-details-description-container">
                            <CardDescriptionIcon className="card-details-card-description-icon" style={rotateIcon} />
                            <div className="flex column">
                                <div className="capitalize">{window.i18nData.cardDetailsDescription}</div>
                                <textarea
                                    className="card-description-textarea"
                                    cols="32"
                                    name="description"
                                    onChange={this.changeDescription}
                                    onBlur={this.saveDescription}
                                    placeholder={window.i18nData.enterCardDescription}
                                    spellCheck="false"
                                    value={description}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="flex column card-details-editor-container">
                        <CloseIcon className="pointer card-details-close-btn" onClick={this.toggleHandler} />
                        <CardDetailsEditor {...this.props} cardDetailsToggle={this.toggleHandler} rotateIcon={rotateIcon} toggle={this.cardDetailsToggleHandler} />
                    </div>
                </div>
            </div>
        )
    }
}