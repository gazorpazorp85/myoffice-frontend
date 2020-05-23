import React, { Component } from 'react';

import MiniCardDetailsEditor from './MiniCardDetailsEditor';

import CardService from '../../../services/CardService';

export default class MiniCardTextDetails extends Component {

    constructor(props) {
        super(props);
        this.textArea = React.createRef();
        this.imgContainer = React.createRef();
    }

    state = {
        imgHeight: 220,
        title: '',
        top: null,
        topEditorAdjustment: null
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
        const { board, miniCard, toggleMiniCardDetailsHandler, updateBoard, user } = this.props;
        const card = { ...board.cards[miniCard.card.id] };
        const editedProps = { board, card, updateBoard, user };
        const { title } = this.state;
        CardService.miniCardSaveHandler(editedProps, title);
        toggleMiniCardDetailsHandler(miniCard);
    }

    toggleMiniCardDetails = () => {
        const { miniCard, toggleMiniCardDetailsHandler } = this.props;
        toggleMiniCardDetailsHandler(miniCard);
    }

    adjustTop = () => {
        let { height, top, bottom } = this.props.miniCard.boundingClientRect;
        // console.log('top: ', top);
        // console.log('bottom:', bottom);
        // console.log('height: ', height);
        // console.log('window.innerHeight: ', window.innerHeight);
        // console.log('window.innerHeight - (window.innerHeight / 4): ', window.innerHeight - (window.innerHeight / 4));
        // console.log('top > (window.innerHeight - (window.innerHeight / 4)): ', top > (window.innerHeight - (window.innerHeight / 4)));
        // console.log('window.innerHeight - height - 50: ', window.innerHeight - height - 50);
        // console.log('top - 222 + height: ', top - 222 + height);
        let adjustment = window.innerHeight - height - 50;
        // console.log('adjustment > top: ', adjustment > top);
        if (top > (window.innerHeight - (window.innerHeight / 4))) {
            this.setState({ top: adjustment > top ? bottom - height : adjustment, topEditorAdjustment: adjustment > top ? top - 222 + height : 0 });
        }
        // console.log(this.state.top, this.state.topEditorAdjustment);
    }

    render() {

        const { board, direction, miniCard } = this.props;
        const { card } = this.props.miniCard;
        const labels = board.cards[card.id].labels;
        const videoDimensions = { height: 140, width: 246 };
        let { height, left } = miniCard.boundingClientRect;
        let top = this.state.top || miniCard.boundingClientRect.top;
        let { topEditorAdjustment } = this.state;
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
                        {labels.map(label => <div key={label} className={`${label} small-label`}></div>)}
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
                <MiniCardDetailsEditor {...this.props} labels={labels} onSave={this.onSave} top={topEditorAdjustment || top} />
            </div>
        )
    }
}