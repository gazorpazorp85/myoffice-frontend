import React, { Component } from 'react';

import CloseIcon from '@material-ui/icons/Close';

import CardService from '../../../services/CardService';
import utils from '../../../services/utils';

export default class CardForm extends Component {

    state = {
        card: {
            id: utils.getRandomId(),
            title: '',
            createdAt: Date.now(),
            dueDate: '',
            importance: '',
            description: '',
            type: 'text',
            labels: [],
            todos: [],
            cardMembers: []
        }
    }

    componentDidMount() {
        this.nameInput.focus();
    }

    inputChange = (ev) => {
        const { name, value } = ev.target;
        this.setState({ card: { ...this.state.card, [name]: value } });
    }

    saveCard = () => {
        const { list, toggleAddCardFormHandler } = this.props;
        CardService.addNewCard(this.props, this.state.card);
        toggleAddCardFormHandler(list.id);
    }

    textAreaAdjust = (ev) => {
        ev.target.style.height = "1px";
        ev.target.style.height = (25 + ev.target.scrollHeight) + "px";
    }

    render() {

        const { list, toggleAddCardFormHandler } = this.props;

        return (
            <form className="card-form" onSubmit={this.saveCard}>
                <div className="flex column">
                    <textarea
                        type="text"
                        onKeyUp={this.textAreaAdjust}
                        placeholder={window.i18nData.enterCardTitle}
                        name="title"
                        ref={(input) => { this.nameInput = input }}
                        onChange={this.inputChange}
                        value={this.state.card.title}
                    />
                    <div className="flex align-center">
                        <button className='btn submit-form'>
                            {window.i18nData.submitCard}
                        </button>
                        <CloseIcon className="flex align-center close-icon-container"
                            onClick={(ev) => toggleAddCardFormHandler(ev, list.id)} />
                    </div>
                </div>
            </form>
        )
    }
}