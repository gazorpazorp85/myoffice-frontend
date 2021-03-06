import React, { Component } from 'react';
import moment from 'moment';

import CardDescriptionIcon from '@material-ui/icons/NotesOutlined';
import CardDueDateIcon from '@material-ui/icons/EventOutlined';
import CardTitleIcon from '@material-ui/icons/DescriptionOutlined';
import CardTodosIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import CardUrlIcon from '@material-ui/icons/LinkOutlined';
import CloseIcon from '@material-ui/icons/Close';

import CardDetailsEditor from './CardDetailsEditor';
import CardDueDate from './CardDueDate';
import CardLabels from './CardLabels';
import CardMembers from './CardMembers';
import CardTodos from './CardTodos';
import CardTodosEditor from './CardTodosEditor';
import TitleContainer from '../TitleContainer';
import TeamMemberIcon from '../../TeamMemberIcon';

import CardService from '../../../services/CardService';


export default class CardDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: props.board.cards[props.cardId].description ? props.board.cards[props.cardId].description : '',
            toggleCardMembers: false,
            toggleDueDate: false,
            toggleLabels: false,
            toggleCardTodosEditor: false,
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
            toggleCardTodosEditor: field === 'toggleCardTodosEditor' ? !prevState.toggleCardTodosEditor : false,
        }))
    }

    changeDescription = (ev) => {
        const { value } = ev.target;
        this.setState({ description: value });
    }

    saveDescription = () => {
        CardService.updateCardDescription(this.props, this.state.description);
    }

    rotateIconHandler = () => {
        return this.props.direction === 'rtl' ? { transform: 'rotate3d(0, -100, 7, 180deg)' } : {};
    }

    cardTitleIconRotateHandler = () => {
        return this.props.direction === 'rtl' ? {} : { transform: 'rotate3d(0, -100, 7, 180deg)' };
    }

    styleDirectionHandler = () => {
        return this.props.direction === 'ltr' ? 'right' : 'left';
    }

    render() {

        const { board, cardId, direction, list, updateBoard, user } = this.props;
        const card = board.cards[cardId];
        const { description, toggleCardMembers, toggleDueDate, toggleLabels, toggleCardTodosEditor } = this.state;

        const rotateIcon = this.rotateIconHandler();
        const cardTitleIconRotate = this.cardTitleIconRotateHandler();
        const styleDirection = this.styleDirectionHandler();

        return (
            <div className="flex screen card-details">
                <div className="flex card-details-container" dir={direction}>
                    <div className="flex column card-details-info-container">

                        <div className="flex card-details-title-container">
                            <CardTitleIcon className="card-details-card-title-icon" style={cardTitleIconRotate} />
                            <div className="flex column">
                                <TitleContainer board={board} card={card} cardField="title" updateBoard={updateBoard} user={user} />
                                <div className="in-list-container">
                                    {window.i18nData.inList}{list.title}
                                </div>
                            </div>
                        </div>

                        {card.url &&
                            <div className="flex align-center card-details-url-container">
                                <CardUrlIcon className="card-details-card-url-icon" />
                                <div className="card-details-url-editor-container">
                                    <TitleContainer board={board} card={card} cardField="url" updateBoard={updateBoard} user={user} />
                                </div>
                            </div>
                        }


                        {toggleLabels && <CardLabels card={card} {...this.props} labels={card.labels} style={{ [styleDirection]: 27, top: 185 }} toggle={this.cardDetailsToggleHandler} />}
                        {card.labels.length !== 0 &&
                            <div className="card-details-labels-container">
                                <div className="uppercase labels-title-container">{window.i18nData.cardLabelsIcon}</div>
                                <div className="flex">
                                    {card.labels.map(label => <div key={label} className={`${label} medium-label`}></div>)}
                                </div>
                            </div>}

                        {toggleCardMembers && <CardMembers card={card} {...this.props} cardMembers={card.cardMembers} style={{ [styleDirection]: 25, top: 223 }} toggle={this.cardDetailsToggleHandler} />}
                        {card.cardMembers.length !== 0 &&
                            <div className="card-details-members-container">
                                <div className="uppercase members-title-container">{window.i18nData.cardMembersIcon}</div>
                                <div className="flex align-center">
                                    {card.cardMembers.map(member => <TeamMemberIcon key={member._id} style={{ height: 25, width: 25, fontSize: 12 }} user={member} />)}
                                </div>
                            </div>
                        }
                        {toggleCardTodosEditor && <CardTodosEditor {...this.props} card={card} style={{ [styleDirection]: 25, top: 264 }} toggle={this.cardDetailsToggleHandler} />}
                        <div className="flex card-details-todos-container">
                            <CardTodosIcon className="card-details-card-todos-icon" />
                            <div className="flex column card-todos-main-container">
                                <div className="capitalize">{window.i18nData.cardDetailsTodos}</div>
                                {card.todos.length !== 0 ?
                                    <CardTodos card={card} doneTodos={card.doneTodos} {...this.props} todos={card.todos} /> :
                                    <div className="capitalize no-card-todos-text">{window.i18nData.noCardTodos}</div>}
                            </div>
                        </div>

                        {toggleDueDate && <CardDueDate card={card} {...this.props} style={{ [styleDirection]: 25, top: 307 }} toggle={this.cardDetailsToggleHandler} />}
                        <div className="flex card-details-duedate-container">
                            <CardDueDateIcon className="card-details-card-duedate-icon" style={rotateIcon} />
                            <div className="flex column">
                                <div className="capitalize">{window.i18nData.cardDetailsDueDate}</div>
                                {card.dueDate ?
                                    <div className="card-details-card-duedate-time">{moment(card.dueDate).format('LLLL')}</div> :
                                    <div className="capitalize no-duedate-time">{window.i18nData.cardDueDateNotSet}</div>}
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