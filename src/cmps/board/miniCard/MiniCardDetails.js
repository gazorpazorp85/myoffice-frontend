import React, { Component } from 'react';

import MiniCardDetailsEditor from './MiniCardDetailsEditor';

export default class MiniCardTextDetails extends Component {

    constructor(props) {
        super(props);
        this.textArea = React.createRef();
        this.imgContainer = React.createRef();
    }

    state = {
        title: '',
        top: null,
        imgHeight: 220
    }

    componentDidMount() {
        this.textArea.current.focus();
        this.adjustTop();
        if (this.props.miniCard.card.type === 'image') this.setState({ imgHeight: this.imgContainer.current.getBoundingClientRect().height });
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
        const historyItem = { user: user.username, item: miniCard.card.title, key1: 'theCard', key2: 'cardEdited' };
        const msg = `${window.i18nData.theCardTitled}${miniCard.card.title}${window.i18nData.cardEdited}${user.username}`;
        const notificationType = 'success';
        updateBoard(newBoard, msg, notificationType, historyItem);
        this.props.toggleMiniCardDetailsHandler(this.props.miniCard);
        console.log('miniCardTextDetailsSave: ', newBoard);
    }

    toggleMiniCardDetails = () => {
        this.props.toggleMiniCardDetailsHandler(this.props.miniCard);
    }

    adjustTop = () => {
        let { height, top } = this.props.miniCard.boundingClientRect;
        if (top > (window.innerHeight - (window.innerHeight / 4))) {
            this.setState({ top: window.innerHeight - height - 50 });
        }
    }

    render() {

        const { direction, miniCard } = this.props;
        const props = { ...this.props };
        const { card } = this.props.miniCard;
        const videoDimensions = { height: 140, width: 246 };
        let { height, left } = miniCard.boundingClientRect;
        let top = this.state.top || miniCard.boundingClientRect.top;
        const textAreaStyle = (direction === 'ltr') ? { right: 1 + 'px' } : { left: 1 + 'px' }

        return (
            <div className="mini-card-details-container">
                <div className="screen mini-card" onClick={this.toggleMiniCardDetails}></div>
                <div className="mini-card-details"
                    dir={direction}
                    style={{
                        left: left + 'px',
                        top: top + 'px',
                        height: height + 'px'
                    }} >
                    {card.type === 'video' &&
                        <iframe title={card.id}
                            type='text/html' width={videoDimensions.width}
                            height={videoDimensions.height}
                            src={card.url}
                            allowFullScreen="allowfullscreen" />}
                    {card.type === 'image' && <img ref={this.imgContainer} title={card.id} alt="card" src={card.url} />}
                    <div className="flex wrap mini-card-labels-container">
                        {card.labels.map(label => <div key={label} className={`${label} small-label`}></div>)}
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
                </div>
                <MiniCardDetailsEditor {...props} top={top} onSave={this.onSave} />
            </div>
        )
    }
}