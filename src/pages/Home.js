import React, { Component } from 'react';
import { connect } from 'react-redux';

// import BoardService from '../services/BoardService';
// import utils from '../services/utils';

import StatusBar from '../cmps/StatusBar';

import { createBoard } from '../actions/BoardActions';
// import { loadRequests } from '../actions/RequestActions';
import { getLoggedInUser } from '../actions/UserActions';

// import RequestService from '../services/RequestService';

class Home extends Component {

    // componentDidMount() {
    //     this.props.getLoggedInUser();
    // }

    // componentDidUpdate(prevProps) {
    //     const { user } = this.props;
    //     if (prevProps.user !== user) {
    //         if (user) this.props.loadRequests();
    //     }
    // }

    // createBoard = async () => {
    //     const { direction, user } = this.props;
    //     let board = user ? BoardService.createEmptyBoard(direction, user) : BoardService.createEmptyBoard(direction);
    //     board.history.push({ id: utils.getRandomId(), user: user ? user.username : 'guest', key: 'boardCreated', time: Date.now() });
    //     const newBoard = await this.props.createBoard(board);
    //     this.props.history.push(`/board/${newBoard._id}`);
    // }

    createBoard = () => {
        this.props.history.push('/board/5eb2e54bc0f4b12d189247a2');
    }

    render() {
        // const { direction, requests, user } = this.props;
        const { direction, user } = this.props;
        // const userRequests = user ? RequestService.receivedRequests(requests, user._id) : [];

        return (
            <div className="flex column home-container">
                {/* <StatusBar userRequests={userRequests} /> */}
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
}

const mapStateToProps = (state) => {
    return {
        board: state.boardState.board,
        direction: state.languageState.direction,
        // requests: state.requestState.requests,
        user: state.userState.user
    };
};

const mapDispatchToProps = {
    createBoard,
    getLoggedInUser,
    // loadRequests
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);