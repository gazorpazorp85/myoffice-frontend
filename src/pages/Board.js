import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from 'react-notifications-component';
import FastAverageColor from 'fast-average-color';
import { CSSTransition } from 'react-transition-group';

import LoadPage from '../cmps/LoadPage';

import AddListButton from '../cmps/board/AddListButton';
import AddListForm from '../cmps/board/AddListForm';
import BoardBar from '../cmps/board/BoardBar';
import BoardHistory from '../cmps/board/BoardHistory';
import BoardLists from '../cmps/board/BoardLists';
import SplashMenu from '../cmps/board/SplashMenu';
import BoardMembers from '../cmps/board/BoardMembers';

import LanguageService from '../services/LanguageService';
import SocketService from '../services/SocketService';
import utils from '../services/utils';

import { loadBoard, setBoard, updateBoard } from '../actions/BoardActions';
import { getLoggedInUser, getUserCollaborators } from '../actions/UserActions';

class Board extends Component {

    state = {
        isBoardLoaded: false,
        isBgDark: null,
        isCardDetailsShown: false,
        isTopMenuOptionsShown: true,
        toggleBoardHistory: false,
        toggleBoardMembers: false,
        toggleListForm: false,
        toggleSplashMenu: false,
    }

    componentDidMount() {
        const boardId = this.props.match.params.id;

        this.props.getLoggedInUser();
        this.props.loadBoard(boardId);

        SocketService.setup();
        SocketService.emit('boardId', boardId);
        SocketService.on('updateBoard', (board) => this.props.setBoard(board));
        SocketService.on('getNotification', (notification) => store.addNotification(notification));
    }

    componentDidUpdate(prevProps) {
        const boardId = this.props.match.params.id;

        let isLoaded = this.state.isBoardLoaded;
        let prevBgImage = prevProps.board.boardBgImage;
        let bgImage = this.props.board.boardBgImage

        if (isLoaded) {
            if (prevBgImage !== bgImage) {
                this.isBgDark();
            };
            return;
        } else if (boardId === this.props.board._id) {
            let collaboratorsId = this.props.user ? this.props.user.collaborators : [];
            this.props.getUserCollaborators(collaboratorsId);
            this.setState({ isBoardLoaded: true });
            this.isBgDark();
        };
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
            toggleBoardHistory: field === 'toggleBoardHistory' ? !prevState.toggleBoardHistory : false,
            toggleBoardMembers: field === 'toggleBoardMembers' ? !prevState.toggleBoardMembers : false,
            toggleListForm: field === 'toggleListForm' ? !prevState.toggleListForm : false,
            toggleSplashMenu: field === 'toggleSplashMenu' ? !prevState.toggleSplashMenu : false
        }));
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

    close = (field) => {
        this.setState({ [field]: false });
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

        let { board, collaborators, language, updateBoard, user } = this.props;
        let { isBgDark, isBoardLoaded, toggleBoardHistory, toggleBoardMembers, toggleListForm, toggleSplashMenu } = this.state;
        let bgImage = board.boardBgImage;
        let direction = LanguageService.languageDirection(language);
        let directionHandler = direction === 'ltr' ? '' : 'row-reverse'

        if (!isBoardLoaded) return <LoadPage direction={direction} />

        return (
            <div className="flex column board-container" style={{ backgroundImage: `url(${bgImage})` }}>
                <BoardBar direction={direction} isBgDark={isBgDark} goBack={this.goBack} toggleHandler={this.toggleHandler} />
                <CSSTransition in={toggleBoardHistory} timeout={700} classNames={direction === 'ltr' ? 'modal-rtl' : 'modal-ltr'} unmountOnExit>
                    <BoardHistory direction={direction} history={board.history} language={language} />
                </CSSTransition>
                <CSSTransition in={toggleSplashMenu} timeout={700} classNames={direction === 'ltr' ? 'modal-rtl' : 'modal-ltr'} unmountOnExit>
                    <SplashMenu
                        board={board}
                        close={this.close}
                        direction={direction}
                        isBgDark={isBgDark}
                        onAddImg={this.onAddImg}
                        updateBoard={updateBoard}
                        user={user ? user : 'Guest'}
                    />
                </CSSTransition>
                <CSSTransition in={toggleBoardMembers} timeout={700} classNames={direction === 'ltr' ? 'modal-rtl' : 'modal-ltr'} unmountOnExit>
                    <BoardMembers board={board} close={this.close} collaborators={collaborators} direction={direction} updateBoard={updateBoard} />
                </CSSTransition>
                <div className={`flex lists-container ${directionHandler}`}>
                    <BoardLists direction={direction} board={board} updateBoard={updateBoard} user={user} />
                    <div className="flex column align-center" dir={direction} style={{ paddingInlineEnd: '8px' }}>
                        {toggleListForm ? <AddListForm board={board} toggleHandler={this.toggleHandler}
                            updateBoard={updateBoard} user={user ? user.username : 'Guest'} />
                            : <AddListButton isBgDark={isBgDark} toggleHandler={this.toggleHandler} />}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardState.board,
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