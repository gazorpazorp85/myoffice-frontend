import React, { Component } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';

import CloseIcon from '@material-ui/icons/Close';

import en from 'date-fns/locale/en-US';
import he from 'date-fns/locale/he';

import CardService from '../../../services/CardService';

import 'react-datepicker/dist/react-datepicker.css';

export default class CardDueDate extends Component {

    state = {
        dueDate: null,
        adjustedOffset: ''
    }

    componentDidMount() {
        const { language } = this.props;
        this.setDate();
        this.adjustOffset(language);
        registerLocale(language, language === 'en' ? en : he);
    }

    setDate = () => {
        const { dueDate } = this.props.card;
        this.setState({ dueDate: dueDate ? new Date(dueDate) : new Date() });
    }

    handleChange = (date) => {
        this.setState({ dueDate: date });
    }

    resetDueDate = () => {
        this.setState({ dueDate: null }, () => this.saveCard());
    }

    saveCard = () => {
        const { dueDate } = this.state;
        CardService.updateCardDueDate(this.props, dueDate);
    }

    adjustedTop = () => {
        const { top } = this.props;
        if (top > (window.innerHeight / 2)) {
            return 'bottom-end';
        } else {
            return 'top-end';
        }
    }

    adjustOffset = (language) => {
        const adjustedTop = this.adjustedTop();
        if (language === 'en') {
            this.setState({ adjustedOffset: adjustedTop === 'top-end' ? '28px, 40px' : '28px, 20px' });
        } else {
            this.setState({ adjustedOffset: adjustedTop === 'top-end' ? '0px, 40px' : '0px, 20px' });
        };
    }

    render() {
        const { language, style, toggle } = this.props;
        const { adjustedOffset } = this.state;

        return (
            <div ref={this.dueDateContainer} className="flex column card-duedate-container" style={style}>
                <CloseIcon className="pointer close-due-date-btn" onClick={() => toggle('toggleDueDate')} />
                <DatePicker
                    dateFormat="MMMM d, yyyy h:mm aa"
                    locale={language}
                    onChange={this.handleChange}
                    popperModifiers={{
                        offset: {
                            enabled: true,
                            offset: adjustedOffset
                        }
                    }}
                    popperPlacement={this.adjustedTop()}
                    showTimeSelect
                    selected={this.state.dueDate}
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Time"
                />
                <div className="flex center">
                    <button className="due-date-save-btn" onClick={this.saveCard}>{window.i18nData.save}</button>
                    <button className="due-date-reset-btn" onClick={this.resetDueDate}>{window.i18nData.reset}</button>
                </div>
            </div>
        )
    }

}