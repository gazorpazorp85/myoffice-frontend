import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from 'react-notifications-component';
import FastAverageColor from 'fast-average-color';
import { CSSTransition } from 'react-transition-group';

import LoadPage from '../cmps/LoadPage';
import StatusBar from '../cmps/StatusBar';

import AddListButton from '../cmps/board/AddListButton';
import AddListForm from '../cmps/board/AddListForm';
import BoardBackground from '../cmps/board/BoardBackground';
import BoardBar from '../cmps/board/BoardBar';
import BoardHistory from '../cmps/board/BoardHistory';
import BoardLists from '../cmps/board/BoardLists';
import BoardMembers from '../cmps/board/BoardMembers';
import CardDetails from '../cmps/board/card/CardDetails';

import SocketService from '../services/SocketService';
import utils from '../services/utils';

import { loadBoard, setBoard, updateBoard } from '../actions/BoardActions';
import { getLoggedInUser, getUserCollaborators } from '../actions/UserActions';

class Board extends Component {

    state = {
        isBoardLoading: true,
        isBgDark: null,
        isCardDetailsShown: false,
        isTopMenuOptionsShown: true,
        selectedCardId: '',
        selectedCardList: '',
        toggleBoardBackground: false,
        toggleBoardHistory: false,
        toggleBoardMembers: false,
        toggleListForm: false,
    }

    componentDidMount() {
        const boardId = this.props.match.params.id;

        this.props.getLoggedInUser();
        this.props.loadBoard(boardId);

        SocketService.setup();
        SocketService.emit('boardId', boardId);
        SocketService.on('updateBoard', (board) => this.props.setBoard(board));
        SocketService.on('getNotification', (notification) => store.addNotification(notification));

        setTimeout(() => {
            this.setState({ isBoardLoading: false });
        }, 2000);
    }

    componentDidUpdate(prevProps) {

        if (prevProps.user !== this.props.user || prevProps.board !== this.props.board) {
            let collaboratorsId = this.props.user ? this.props.user.collaborators : [];
            this.props.getUserCollaborators(collaboratorsId);
            this.isBgDark();
        }
    }

    componentWillUnmount() {
        SocketService.off('updateBoard');
        SocketService.off('getNotification');
        SocketService.terminate();
    }

    goBack = () => {
        this.props.history.push('/');
    }

    toggleHandler = (field) => {
        this.setState(prevState => ({
            isCardDetailsShown: field === 'isCardDetailsShown' ? !prevState.isCardDetailsShown : false,
            toggleBoardBackground: field === 'toggleBoardBackground' ? !prevState.toggleBoardBackground : false,
            toggleBoardHistory: field === 'toggleBoardHistory' ? !prevState.toggleBoardHistory : false,
            toggleBoardMembers: field === 'toggleBoardMembers' ? !prevState.toggleBoardMembers : false,
            toggleListForm: field === 'toggleListForm' ? !prevState.toggleListForm : false
        }));
    }

    selectedCardHandler = (cardId, list) => {
        this.setState(prevState => ({
            selectedCardId: prevState.selectedCardId === cardId ? '' : cardId,
            selectedCardList: prevState.selectedCardList === list ? '' : list
        }));
    }

    closeAll = () => {
        this.setState({
            toggleBoardBackground: false,
            toggleBoardHistory: false,
            toggleBoardMembers: false,
            toggleListForm: false,
        })
    }

    onAddImg = async (ev) => {
        const file = ev.target.files[0];

        try {
            const img = await utils.uploadImg(file);
            const newBoard = { ...this.props.board };
            newBoard.boardBgImage = img;
            newBoard.boardBgThumbnail = img;
            const msg = `${this.props.user} changed background image`;
            const notificationType = 'success';
            this.props.updateBoard(newBoard, msg, notificationType);
        } catch (err) {
            console.log(err);
        }
    }

    isBgDark = async (img) => {
        const fac = new FastAverageColor();
        let backgroundImage = new Image();
        backgroundImage.crossOrigin = 'anonymous';
        backgroundImage.src = img || this.props.board.boardBgImage;
        try {
            const color = await fac.getColorAsync(backgroundImage, { algorith: 'dominant' });
            this.setState({ isBgDark: (color.isDark) ? true : false });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { board, collaborators, direction, language, updateBoard, user } = this.props;
        const { isCardDetailsShown, selectedCardId, selectedCardList } = this.state;
        let { isBgDark, isBoardLoading, toggleBoardHistory, toggleBoardMembers, toggleListForm, toggleBoardBackground } = this.state;
        let bgImage = board.boardBgImage;
        let directionHandler = direction === 'ltr' ? '' : 'row-reverse'

        return (
            isBoardLoading ? <LoadPage direction={direction} /> :
                <div className="flex column board-container" style={{ backgroundImage: `url(${bgImage})` }}>
                    <StatusBar />
                    <BoardBar
                        direction={direction}
                        isBgDark={isBgDark}
                        goBack={this.goBack}
                        toggleHandler={this.toggleHandler}
                    />
                    {(toggleBoardHistory || toggleBoardMembers || toggleBoardBackground) && <div className="screen board" onClick={this.closeAll}></div>}
                    <CSSTransition in={toggleBoardHistory} timeout={700} classNames={direction === 'ltr' ? 'modal-rtl' : 'modal-ltr'} unmountOnExit>
                        <BoardHistory
                            direction={direction}
                            history={board.history}
                            language={language}
                        />
                    </CSSTransition>
                    <CSSTransition in={toggleBoardBackground} timeout={700} classNames={direction === 'ltr' ? 'modal-rtl' : 'modal-ltr'} unmountOnExit>
                        <BoardBackground
                            board={board}
                            close={this.toggleHandler}
                            direction={direction}
                            isBgDark={isBgDark}
                            onAddImg={this.onAddImg}
                            updateBoard={updateBoard}
                            user={user ? user : 'Guest'}
                        />
                    </CSSTransition>
                    <CSSTransition in={toggleBoardMembers} timeout={700} classNames={direction === 'ltr' ? 'modal-rtl' : 'modal-ltr'} unmountOnExit>
                        <BoardMembers
                            board={board}
                            close={this.toggleHandler}
                            collaborators={collaborators}
                            direction={direction}
                            updateBoard={updateBoard}
                        />
                    </CSSTransition>
                    <div className={`flex lists-container ${directionHandler}`}>
                        <BoardLists
                            board={board}
                            direction={direction}
                            selectedCardHandler={this.selectedCardHandler}
                            toggle={this.toggleHandler}
                            updateBoard={updateBoard}
                            user={user}
                        />
                        <div className="flex column align-center" dir={direction} style={{ paddingInlineEnd: '8px' }}>
                            {toggleListForm ?
                                <AddListForm
                                    board={board}
                                    toggleHandler={this.toggleHandler}
                                    updateBoard={updateBoard}
                                    user={user ? user.username : 'Guest'}
                                /> :
                                <AddListButton
                                    isBgDark={isBgDark}
                                    toggleHandler={this.toggleHandler}
                                />}
                        </div>
                    </div>
                    {isCardDetailsShown &&
                        <CardDetails
                            board={board}
                            cardId={selectedCardId}
                            direction={direction}
                            language={language}
                            list={selectedCardList}
                            selectedCardHandler={this.selectedCardHandler}
                            toggle={this.toggleHandler}
                            updateBoard={updateBoard}
                            user={user}
                        />}
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardState.board,
        direction: state.languageState.direction,
        language: state.languageState.language,
        user: state.userState.user,
        collaborators: state.userState.userCollaborators
    }
}

const mapDispatchToProps = {
    loadBoard,
    setBoard,
    updateBoard,
    getLoggedInUser,
    getUserCollaborators
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);