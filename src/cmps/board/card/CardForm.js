import React, { Component } from 'react';

import CloseIcon from '@material-ui/icons/Close';

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
        },
        edit: false
    }

    componentDidMount() {
        this.nameInput.focus();
        this.setFormDataForEdit();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.card !== this.props.card) {
            this.setFormDataForEdit();
        }
    }

    setFormDataForEdit() {
        if (this.props.card) {
            const { card } = this.props;
            this.setState({
                card: {
                    id: card.id,
                    title: card.title,
                    createdAt: card.createdAt,
                    dueDate: card.dueDate,
                    importance: card.importance,
                    description: card.description,
                    type: card.text,
                    labels: card.labels,
                    todos: card.todos,
                    cardMembers: card.cardMembers
                },
                edit: true
            });
        }
    }

    inputChange = (ev) => {
        const { name, value } = ev.target;
        this.setState({ card: { ...this.state.card, [name]: value } });
    }

    save = (ev) => {
        ev.preventDefault();
        this.checkCardType(this.state.card.title);
    }

    checkCardType = (title) => {
        const youtubeREGEX = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        const imgREGEX = /.(jpg|jpeg|png|gif)\/?$/;
        const httpREGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        console.log(title.match(httpREGEX));
        if (title.match(youtubeREGEX)) {
            const url = title.replace('watch?v=', 'embed/');
            return this.setState({ card: { ...this.state.card, title: '', type: 'video', url: url } }, () => this.saveCard());
        } else if (title.match(imgREGEX)) {
            return this.setState({ card: { ...this.state.card, title: '', type: 'image', url: title } }, () => this.saveCard());
        } else if (title.match(httpREGEX)) {
            return this.setState({ card: { ...this.state.card, url: title } }, () => this.saveCard());
        }
        this.saveCard();
    }

    saveCard = () => {
        const { board, list, toggleAddCardFormHandler, updateBoard, user } = this.props;
        const { card, edit } = this.state;
        const id = card.id;
        const newBoard = { ...board, cards: { ...board.cards, [id]: card } };
        if (!list.cardIds.includes(id)) list.cardIds.push(id);
        const historyItem = { user: user.username, item: card.title, key1: 'theCard', key2: edit ? 'cardEdited' : 'cardAdded' };
        const msg = `${window.i18nData.theCard}${card.title}${edit ? window.i18nData.cardEdited : window.i18nData.cardAdded}${user.username}`;
        const notificationType = 'success';
        updateBoard(newBoard, msg, notificationType, historyItem);
        toggleAddCardFormHandler(list.id);
        console.log('cardForm: ', newBoard);
        console.log('cardForm: ', list);
    }

    textAreaAdjust = (ev) => {
        ev.target.style.height = "1px";
        ev.target.style.height = (25 + ev.target.scrollHeight) + "px";
    }

    render() {

        const { list, toggleAddCardFormHandler } = this.props;

        return (
            <form className="card-form" onSubmit={this.save}>
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