import React, { Component } from 'react';

export default class MiniCardTextDetails extends Component {

    constructor(props) {
        super(props);
        this.textArea = React.createRef();
    }

    state = {
        title: ''
    }

    componentDidMount() {
        this.textArea.current.focus();
    }

    handleFocus = (ev) => {
        ev.target.select();
    }

    emitChange = (ev) => {
        const { value } = ev.target;
        this.setState({ title: value });
    }

    onSave = () => {
        const { board, miniCard, updateBoard, user } = this.props;
        const { title } = this.state;
        const newCard = title ? { ...miniCard.card, title: title } : { ...miniCard };
        const newBoard = { ...board, cards: { ...board.cards, [newCard.id]: newCard } };
        const historyItem = { user: user.username, item: miniCard.title, key1: 'theCard', key2: 'cardEdited' };
        const msg = `${window.i18nData.theCardTitled}${miniCard.title}${window.i18nData.cardEdited}${user.username}`;
        const notificationType = 'success';
        updateBoard(newBoard, msg, notificationType, historyItem);
        this.props.toggleMiniCardDetailsHandler(this.props.miniCard);
        console.log('miniCardTextDetailsSave: ', newBoard);
    }

    toggleMiniCardDetails = () => {
        this.props.toggleMiniCardDetailsHandler(this.props.miniCard);
    }

    render() {

        const { direction, miniCard } = this.props;
        const { card } = this.props.miniCard;
        let { height, top } = miniCard.boundingClientRect;
        const textAreaStyle = (direction === 'ltr') ? { right: 1 + 'px' } : { left: 1 + 'px' }

        if (height + top > window.innerHeight) {
            height = (window.innerHeight - top - 50) > 248 ? window.innerHeight - top - 50 : 248;
        }
        if (miniCard.boundingClientRect.top > (window.innerHeight - (window.innerHeight / 4))) {
            top = window.innerHeight - height - 50;
        }

        return (
            <div className="mini-card-details-container">
                <div className="mini-card-screen" onClick={this.toggleMiniCardDetails}></div>
                <div className="mini-card-details"
                    dir={direction}
                    style={{
                        left: miniCard.boundingClientRect.left + 'px',
                        top: top + 'px',
                        height: height + 'px'
                    }} >
                    <div className="flex">
                        {card.labels.map(label => <div key={label} className={`${label} + 'small-label`}></div>)}
                    </div>
                    <textarea
                        className="mini-card-textarea"
                        name="title"
                        defaultValue={card.title}
                        ref={this.textArea}
                        onFocus={this.handleFocus}
                        onInput={this.emitChange}
                        placeholder={window.i18nData.enterCardTitle}
                        style={textAreaStyle}
                    />
                    <button
                        className="save-mini-card-btn"
                        style={{
                            left: miniCard.boundingClientRect.left + 'px',
                            top: (top + height + 10) + 'px'
                        }} onClick={this.onSave}>
                        {window.i18nData.save}
                    </button>
                </div>
            </div>
        )
    }
}