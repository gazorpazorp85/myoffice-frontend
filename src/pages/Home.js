import React, { Component } from 'react';
import { connect } from 'react-redux';

import utils from '../services/utils';

import { createBoard, loadBoard, loadBoards } from '../actions/BoardActions';
import { logout, getLoggedInUser } from '../actions/UserActions';

class Home extends Component {

    // state = {
    //     board: {
    //         boardMembers: [],
    //         cards: {},
    //         lists: {},
    //         listsOrder: [],
    //         boardBgImage: 'https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjExMTc0M30',
    //         history: [],
    //         boardBgThumbnail: 'https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjExMTc0M30'
    //     }
    // }

    componentDidMount() {
        this.props.getLoggedInUser();
    }

    // createBoard = async () => {
    //     let board = this.state.board;
    //     board.createdBy = { _id: this.props.user._id, username: this.props.user.username } || { _id: 'guest', username: 'guest' };
    //     board.direction = this.props.direction;
    //     this.createdBoardMessage(board);
    //     const newBoard = await this.props.createBoard(board);
    //     this.props.history.push(`/board/${newBoard._id}`);
    // }

    createBoard = () => {
        this.props.history.push('/board/5eb2e54bc0f4b12d189247a2');
    }

    createdBoardMessage = (board) => {
        const username = (this.props.user) ? this.props.user.username : 'Guest';
        board.history.push({ id: utils.getRandomId(), user: username, key: 'boardCreated', time: Date.now() });
    }

    render() {

        const { direction } = this.props;

        return (
            <div className="flex column home-container">
                <div className="flex center hero-container">
                    <div className="flex column center align-center">
                        <div className="capitalize brand-title">
                            {window.i18nData.brandName}
                        </div>
                        <div className="slogan-container" dir={direction}>
                            <h1>{window.i18nData.slogan}</h1>
                        </div>
                        <div className="btn get-started uppercase" onClick={this.createBoard} dir={direction}>
                            <div>
                                {window.i18nData.getStarted}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        boards: state.boardState.boards,
        board: state.boardState.board,
        direction: state.languageState.direction,
        user: state.userState.user
    };
};

const mapDispatchToProps = {
    createBoard,
    loadBoards,
    loadBoard,
    getLoggedInUser,
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);