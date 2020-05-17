import React, { Component } from 'react';

import ListService from '../../../services/ListService';

export default class ListTitleContainer extends Component {

    state = { title: '' }

    componentDidMount() {
        this.setState({ title: this.props.list.title || '' });
    }

    setListName = (listId) => {
        const listTitle = this.props.board.lists[listId].title;
        this.setState({ title: listTitle });
    }

    emitChange = (ev) => {
        this.setState({ title: ev.target.innerText });
    }

    saveListName = (listId, title) => {
        ListService.saveListName(this.props, listId, title);
    }

    render() {

        const { list } = this.props;
        const { title } = this.state;

        return (
            <h2 className="list-title"
                contentEditable='true'
                spellCheck='false'
                onFocus={() => this.setListName(list.id)}
                onInput={(ev) => this.emitChange(ev)}
                onBlur={() => this.saveListName(list.id, title)}
                suppressContentEditableWarning={true} >
                {list.title}
            </h2 >
        )
    }
}