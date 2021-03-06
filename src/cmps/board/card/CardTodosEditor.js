import React, { Component } from 'react';

import CloseIcon from '@material-ui/icons/Close';

import CardService from '../../../services/CardService';
import utils from '../../../services/utils';

export default class CardTodosEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: props.card.todos ? props.card.todos : [],
            text: ''
        }
    }

    updateTodo = (ev) => {
        const { value } = ev.target;
        this.setState({ text: value });
    }

    saveTodo = () => {
        const todo = { id: utils.getRandomId(), text: this.state.text, isDone: false };
        CardService.updateCardTodos(this.props, todo);
        this.props.toggle('toggleCardTodosEditor')
    }


    render() {

        const { style, toggle } = this.props;

        return (
            <div className="flex column card-todos-editor-container" style={style}>

                <CloseIcon className="pointer close-todos-btn" onClick={() => toggle('toggleCardTodosEditor')} />

                <div className="flex column center align-center todo-input-container">
                    <input className="card-todos-editor-input" type="text" onChange={this.updateTodo} placeholder={window.i18nData.addNewCardTodo} value={this.state.text} />
                    <button className="card-todos-save-btn" onClick={this.saveTodo}>{window.i18nData.save}</button>
                </div>
            </div>
        )
    }
}