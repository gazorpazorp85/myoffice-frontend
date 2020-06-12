import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from 'react-notifications-component';

import StatusBar from '../cmps/StatusBar';
import AddCollaboratorModal from '../cmps/user/AddCollaboratorModal';
import DeleteBoardModal from '../cmps/user/DeleteBoardModal';
import UserBoardPreview from '../cmps/user/UserBoardPreview';
import UserCollaborators from '../cmps/user/UserCollaborators';
import UserNavBar from '../cmps/user/UserNavBar';

import { createBoard, loadBoards, removeBoard } from '../actions/BoardActions';
// import { loadRequests } from '../actions/RequestActions';
import { getLoggedInUser, getUserCollaborators } from '../actions/UserActions';

import BoardService from '../services/BoardService';
// import RequestService from '../services/RequestService';
import SocketService from '../services/SocketService';
import utils from '../services/utils';

class User extends Component {

    state = {
        addCollaboratorModalToggle: false,
        boardToDelete: null,
        deleteBoardModalToggle: false,
        userBoards: [],
        userBoardsToggle: true,
        userCollaborators: [],
        userCollaboratorsToggle: false,
        // userRequests: []
    }

    componentDidMount() {
        const userId = this.props.match.params.id;

        this.props.getLoggedInUser();
        this.props.loadBoards();
        // this.props.loadRequests();

        SocketService.setup();
        SocketService.emit('userId', userId);
        // SocketService.on('receiverId', (receiverId) => console.log(receiverId));
        SocketService.on('requestReceived', (notification) => store.addNotification(notification));
    }

    componentDidUpdate(prevProps) {
        const { boards, getUserCollaborators, history, loadRequests, match, requests, user } = this.props;
        if (!match.params.id || !user || match.params.id !== user._id) return history.push('/');
        if (prevProps.boards !== boards) {
            this.setUserBoards();
        }
        if (prevProps.user !== user) {
            getUserCollaborators(user.collaborators);
        }
        // if (prevProps.requests !== requests) {
        //     console.log('im here');
        //     this.setUserRequests();
        // }
    }

    componentWillUnmount() {
        SocketService.off('requestReceived');
        SocketService.terminate();
    }

    setUserBoards = () => {
        const { boards, user } = this.props;
        const userBoards = boards.filter(board => board.createdBy._id === user._id);
        this.setState({ userBoards });
    }

    // setUserRequests = () => {
    //     const { requests, user } = this.props;
    //     const userRequests = RequestService.receivedRequests(requests, user);
    //     this.setState({ userRequests });
    // }

    duplicateBoard = (ev, board) => {
        ev.stopPropagation();
        const newBoard = BoardService.duplicateBoard(board);
        this.props.createBoard(newBoard);
    }

    deleteBoardHandler = (ev, board) => {
        ev.stopPropagation();
        this.setState({ boardToDelete: board, deleteBoardModalToggle: true });
    }

    deleteConfirmation = (key) => {
        if (key === 'delete') {
            const { boardToDelete } = this.state;
            this.props.removeBoard(boardToDelete);
        };
        this.setState({ boardToDelete: null, deleteBoardModalToggle: false })
    }

    openBoard = (ev, id) => {
        ev.stopPropagation();
        this.props.history.push(`/board/${id}`);
    }

    toggleUserComponents = (key) => {
        this.setState({
            userBoardsToggle: key === 'userBoardsToggle' ? true : false,
            userCollaboratorsToggle: key === 'userCollaboratorsToggle' ? true : false,
        })
    }

    toggleAddCollaboratorModal = () => {
        this.setState(prevState => ({ addCollaboratorModalToggle: !prevState.addCollaboratorModalToggle }))
    }

    goBack = () => {
        this.props.history.push('/');
    }

    render() {
        const { direction, collaborators, requests, user } = this.props;
        const { addCollaboratorModalToggle, deleteBoardModalToggle, userBoards, userBoardsToggle, userCollaboratorsToggle, userRequests } = this.state;
        const title = userBoardsToggle ? 'myBoards' : 'myCollaborators';
        // const filteredRequests = RequestService.formatReceivedRequests(requests, user);

        return (
            <>
                <StatusBar />
                {user && <UserNavBar
                    direction={direction}
                    goBack={this.goBack}
                    toggle={this.toggleUserComponents}
                    userBoardsToggle={userBoardsToggle}
                />}
                {/* {user && <UserNavBar
                    direction={direction}
                    goBack={this.goBack}
                    requests={userRequests}
                    toggle={this.toggleUserComponents}
                    userBoardsToggle={userBoardsToggle}
                />} */}
                <div className="flex column user-container" dir={direction}>
                    <div className="flex column user-subcontainer">
                        <h1 className="capitalize">{window.i18nData[title]}</h1>
                        {userBoardsToggle &&
                            <UserBoardPreview
                                deleteBoard={this.deleteBoardHandler}
                                duplicateBoard={this.duplicateBoard}
                                openBoard={this.openBoard}
                                userBoards={userBoards}
                            />}
                        {userCollaboratorsToggle && <UserCollaborators collaborators={collaborators} toggle={this.toggleAddCollaboratorModal} />}
                        {/* {userCollaboratorsToggle && <UserCollaborators collaborators={collaborators} requests={userRequests} toggle={this.toggleAddCollaboratorModal} />} */}
                    </div>
                    {deleteBoardModalToggle && <DeleteBoardModal deleteConfirmation={this.deleteConfirmation} />}
                    {/* {addCollaboratorModalToggle && <AddCollaboratorModal direction={direction} requests={requests} setUserRequests={this.setUserRequests} toggle={this.toggleAddCollaboratorModal} user={user}/>} */}
                    {addCollaboratorModalToggle && <AddCollaboratorModal direction={direction} toggle={this.toggleAddCollaboratorModal} user={user}/>}
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        boards: state.boardState.boards,
        collaborators: state.userState.userCollaborators,
        direction: state.languageState.direction,
        // requests: state.requestState.requests,
        user: state.userState.user
    }
}

const mapDispatchToProps = {
    createBoard,
    getLoggedInUser,
    getUserCollaborators,
    loadBoards,
    // loadRequests,
    removeBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(User);