import React, { Component } from 'react';
import { connect } from 'react-redux';

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

import TeamMemberIcon from '../TeamMemberIcon';

import { loadRequests } from '../../actions/RequestActions';

import RequestService from '../../services/RequestService';
import UserService from '../../services/UserService';

class AddCollaboratorModal extends Component {
    state = {
        collaborator: null,
        errorMessage: '',
        field: 'email',
        value: '',
    }

    changeSelectedOption = (ev) => {
        const { value } = ev.target;
        this.setState({ field: value });
    }

    changeInputHandler = (ev) => {
        const { value } = ev.target;
        this.setState({ value });
    }

    searchHandler = async () => {
        const { field, value } = this.state;
        this.setState({ collaborator: null, errorMessage: '' })
        try {
            const collaborator = await UserService.getCollaborator({ [field]: value });
            this.setState({ collaborator });
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
    }

    sendRequestHandler = (collaborator) => {
        const { requests, user } = this.props;
        const isRequestSentAlready = requests.some(request => request.receiverId === collaborator._id || request.senderId === collaborator._id);
        if (isRequestSentAlready) return;
        const request = { senderId: user._id, receiverId: collaborator._id, status: 'pending' };
        RequestService.sendRequest(request);
        this.props.loadRequests(user._id);
    }

    requestButtonStyleHandler = () => {
        const { collaborator } = this.state;
        const { requests, user } = this.props;
        const isRequestSentAlready = requests.some(request => request.receiverId === collaborator._id || request.senderId === collaborator._id);
        return isRequestSentAlready ? 'request-sent' : user.collaborators.includes(collaborator._id) ? 'already-collaborator' : 'send-request';
    }

    requestButtonTextHandler = () => {
        const classStyle = this.requestButtonStyleHandler();
        return classStyle === 'send-request' ? window.i18nData.sendRequest : window.i18nData.requestSent;
    }

    render() {

        const { direction, toggle } = this.props;
        const { collaborator, errorMessage, field, value } = this.state;

        return (
            <div className="flex center align-center screen add-collaborator-modal">
                <div className="flex column add-collaborator-modal-container" dir={direction}>
                    <div className="pointer add-collaborator-modal-close-btn">
                        <CloseIcon onClick={toggle} />
                    </div>
                    <h2 className="capitalize">{window.i18nData.searchCollaborator}</h2>
                    <input
                        className="search-collaborator-input"
                        onChange={this.changeInputHandler}
                        placeholder={window.i18nData.searchCollaboratorBy}
                        type="text"
                        value={value} />
                    <div className="flex align-center">
                        <div>{window.i18nData.searchBy}</div>
                        <div className="flex align-center">
                            <input
                                checked={field === 'email'}
                                className="radio-btn"
                                onChange={this.changeSelectedOption}
                                type="radio"
                                value="email"
                            />
                            <div>{window.i18nData.email}</div>
                        </div>
                        <div className="flex align-center" style={{ marginInlineStart: '10px' }}>
                            <input
                                checked={field === 'username'}
                                className="radio-btn"
                                onChange={this.changeSelectedOption}
                                type="radio"
                                value="username"
                            />
                            <div>{window.i18nData.username}</div>
                        </div>
                        <div className="btn search-user" onClick={this.searchHandler}>
                            <SearchIcon />
                        </div>
                    </div>
                    {collaborator &&
                        <div className="flex align-center collaborator-found-container">
                            <TeamMemberIcon user={collaborator} />
                            <div className="capitalize">
                                {collaborator.firstName} {collaborator.lastName}
                            </div>
                            <div className={`btn ${this.requestButtonStyleHandler()}`}
                                onClick={() => this.sendRequestHandler(collaborator)}>
                                {this.requestButtonTextHandler()}
                            </div>
                        </div>}
                    {errorMessage && <div>{errorMessage}</div>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        direction: state.languageState.direction,
        requests: state.requestState.requests,
        user: state.userState.user,
    };
}

const mapDispatchToProps = {
    loadRequests
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCollaboratorModal);