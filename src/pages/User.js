import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserBoardPreview from '../cmps/user/UserBoardPreview';

import { loadBoards } from '../actions/BoardActions';
import { getLoggedInUser } from '../actions/UserActions';

class User extends Component {

    state = {
        userBoards: []
    }

    componentDidMount() {
        this.props.loadBoards();
        this.props.getLoggedInUser();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.boards !== this.props.boards) {
            this.setUserBoards();
        }
    }

    setUserBoards = () => {
        const { boards, user } = this.props;
        const userBoards = boards.filter(board => board.createdBy._id === user._id);
        this.setState({ userBoards });
    }

    render() {
        const { user } = this.props;
        const { userBoards } = this.state;
        return (
            <div className="main-container user-container">
                {user &&
                    <div className="flex column ">
                        <div>{user._id}</div>
                        <div>{user.username}</div>
                        <div>{user.firstName}</div>
                        <div>{user.lastName}</div>
                    </div>}
                <UserBoardPreview userBoards={userBoards} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        boards: state.boardState.boards,
        user: state.userState.user
    }
}

const mapDispatchToProps = {
    getLoggedInUser,
    loadBoards
}

export default connect(mapStateToProps, mapDispatchToProps)(User);