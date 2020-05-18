import React, { Component } from 'react';

import CardService from '../../services/CardService';
import ListService from '../../services/ListService';

export default class TitleContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.list ? props.list.title : props.card ? props.card.title : '',
            type: props.list ? 'list' : 'card'
        }
    }

    setName = (id) => {
        const { type } = this.state;
        const item = type === 'list' ? 'lists' : 'cards';
        const title = this.props.board[item][id].title;
        this.setState({ title });
    }

    emitChange = (ev) => {
        this.setState({ title: ev.target.innerText });
    }

    saveName = (id, title) => {
        const { type } = this.state;
        if (type === 'list') {
            ListService.saveListName(this.props, id, title);
        } else {
            CardService.saveCardName(this.props, id, title);
        }
    }

    render() {

        const { title, type } = this.state;
        const item = this.props[type];

        return (
            <h2 className={`title-container ${type}-style`}
                contentEditable='true'
                spellCheck='false'
                onFocus={() => this.setName(item.id)}
                onInput={(ev) => this.emitChange(ev)}
                onBlur={() => this.saveName(item.id, title)}
                suppressContentEditableWarning={true} >
                {item.title}
            </h2>
        )
    }
}