import React from 'react';
import { connect } from 'react-redux';

// import BoardService from '../services/BoardService';
// import utils from '../services/utils';

import StatusBar from '../cmps/StatusBar';

import { createBoard, loadBoard, loadBoards } from '../actions/BoardActions';
import { logout, getLoggedInUser } from '../actions/UserActions';

function Home(props) {

    // createBoard = async () => {
    //     const { direction, user } = this.props;
    //     let board = user ? BoardService.createEmptyBoard(direction, user) : BoardService.createEmptyBoard(direction);
    //     board.history.push({ id: utils.getRandomId(), user: user ? user.username : 'guest', key: 'boardCreated', time: Date.now() });
    //     const newBoard = await this.props.createBoard(board);
    //     this.props.history.push(`/board/${newBoard._id}`);
    // }

    const createBoard = () => {
        props.history.push('/board/5eb2e54bc0f4b12d189247a2');
    }

    const { direction } = props;

    return (
        <div className="flex column home-container">
            <StatusBar />
            <div className="flex center hero-container">
                <div className="flex column center align-center">
                    <div className="capitalize brand-title">
                        {window.i18nData.brandName}
                    </div>
                    <div className="slogan-container" dir={direction}>
                        <h1>{window.i18nData.slogan}</h1>
                    </div>
                    <div className="btn get-started uppercase" onClick={createBoard} dir={direction}>
                        <div>
                            {window.i18nData.getStarted}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
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