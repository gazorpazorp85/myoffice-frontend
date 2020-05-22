import React, { Component } from 'react';

import CardService from '../../services/CardService';
import ListService from '../../services/ListService';

export default class TitleContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:
                props.list ? props.list.title :
                    props.card && props.cardField === 'title' ? props.card.title : props.card.url,
            type: props.list ? 'list' : 'card'
        }
    }

    emitChange = (ev) => {
        this.setState({ title: ev.target.innerText });
    }

    saveName = (id, title) => {
        const { type } = this.state;
        if (type === 'list') {
            ListService.saveListName(this.props, id, title);
        } else {
            CardService.saveCardTitleUrlHandler(this.props, id, title);
        }
    }

    render() {

        const { title, type } = this.state;
        const { cardField } = this.props;
        const item = this.props[type];
        const fieldToShow = (type === 'card' && cardField === 'url') ? item.url : item.title;

        return (
            <h2 className={`title-container ${type}-style ${cardField === 'url' ? 'url-font-size' : ''}`}
                contentEditable='true'
                spellCheck='false'
                onInput={(ev) => this.emitChange(ev)}
                onBlur={() => this.saveName(item.id, title)}
                suppressContentEditableWarning={true} >
                {fieldToShow}
            </h2>
        )
    }
}