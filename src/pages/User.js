import React, { Component } from 'react';
import { connect } from 'react-redux';

import StatusBar from '../cmps/StatusBar';
import UserBoardPreview from '../cmps/user/UserBoardPreview';

import { createBoard, loadBoards, removeBoard } from '../actions/BoardActions';
import { getLoggedInUser } from '../actions/UserActions';

import BoardService from '../services/BoardService';

class User extends Component {

    state = {
        userBoards: []
    }

    componentDidMount() {
        this.props.loadBoards();
        this.props.getLoggedInUser();
    }

    componentDidUpdate(prevProps) {
        const { boards, history, match, user } = this.props;
        if (!match.params.url_id || match.params.url_id !== user.url_id) history.push('/');
        if (prevProps.boards !== boards) {
            this.setUserBoards();
        }
    }

    setUserBoards = () => {
        const { boards, user } = this.props;
        const userBoards = boards.filter(board => board.createdBy._id === user._id);
        this.setState({ userBoards });
    }

    duplicateBoard = (ev, board) => {
        ev.stopPropagation();
        console.log(board);
        const newBoard = BoardService.duplicateBoard(board);
        console.log(newBoard);
        this.props.createBoard(newBoard);
    }

    deleteBoard = (ev, board) => {
        ev.stopPropagation();
        this.props.removeBoard(board);
        console.log('board deleted!');
    }

    openBoard = (ev, id) => {
        ev.stopPropagation();
        this.props.history.push(`/board/${id}`);
    }

    render() {
        const { direction } = this.props;
        const { userBoards } = this.state;
        return (
            <div className="user-container" dir={direction}>
                <StatusBar />
                <div className="main-container user-subcontainer">
                    {/* {user &&
                        <div className="flex column">
                            <div>{user._id}</div>
                            <div>{user.username}</div>
                            <div>{user.firstName}</div>
                            <div>{user.lastName}</div>
                        </div>} */}
                    <UserBoardPreview deleteBoard={this.deleteBoard} duplicateBoard={this.duplicateBoard} openBoard={this.openBoard} userBoards={userBoards} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        boards: state.boardState.boards,
        direction: state.languageState.direction,
        user: state.userState.user
    }
}

const mapDispatchToProps = {
    createBoard,
    getLoggedInUser,
    loadBoards,
    removeBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(User);