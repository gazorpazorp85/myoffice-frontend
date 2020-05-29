import React, { Component } from 'react';
import { connect } from 'react-redux';

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

import TeamMemberIcon from '../TeamMemberIcon';

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
                        <div className="flex align-center">
                            <TeamMemberIcon user={collaborator} />
                            <div className="capitalize">
                                {collaborator.firstName} {collaborator.lastName}
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
        direction: state.languageState.direction
    };
}

export default connect(mapStateToProps)(AddCollaboratorModal);