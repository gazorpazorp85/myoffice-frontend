import React, { Component } from 'react';

import CloseIcon from '@material-ui/icons/Close';

import utils from '../../services/utils';

export default class AddListForm extends Component {

    state = {
        list: {
            id: utils.getRandomId(),
            title: '',
            cardIds: []
        }
    }

    componentDidMount() {
        this.nameInput.focus();
        this.setFormDataForEdit();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.list !== this.props.list) {
            this.setFormDataForEdit();
        }
    }

    setFormDataForEdit() {
        if (this.props.list) {
            const { list } = this.props;
            this.setState({
                list: {
                    id: list.id,
                    title: list.title,
                    cardIds: list.cardIds
                }
            })
        }
    }

    inputChange = (ev) => {
        let { value } = ev.target;
        this.setState({ list: { ...this.state.list, title: value } });
    }

    saveList = (ev) => {
        ev.preventDefault();
        const { board, updateBoard, toggleHandler, user } = this.props;
        const { list } = this.state;
        const newBoard = { ...board, lists: { ...board.lists, [list.id]: list } };
        let listsOrder = newBoard.listsOrder;
        if (!listsOrder.includes(list.id)) listsOrder.push(list.id);
        const historyItem = { user: user, item: list.title, key1: 'theList', key2: 'listAdded' };
        const msg = `${window.i18nData.theList}${list.title}${window.i18nData.listAdded}${user}`
        const notificationType = 'success';
        updateBoard(newBoard, msg, notificationType, historyItem);
        toggleHandler('toggleListForm');
        console.log('addListForm: ', newBoard);
    }

    render() {
        return (
            <form className='flex column form-container' onSubmit={this.saveList}>
                <input
                    ref={(input => { this.nameInput = input })}
                    type='text'
                    placeholder={window.i18nData.addListTitle}
                    name='title'
                    onChange={this.inputChange}
                    value={this.state.list.title}
                />
                <div className='flex submit-button-list-container'>
                    <button className='btn submit-form'>
                        {window.i18nData.submitList}
                    </button>
                    <CloseIcon className="flex align-center close-icon-container" onClick={() => this.props.toggleHandler('toggleListForm')} />
                </div>
            </form>
        )
    }
}