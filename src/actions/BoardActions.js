import BoardService from '../services/BoardService';
import SocketService from '../services/SocketService';
import utils from '../services/utils';

export function loadBoards() {
    return async dispatch => {
        try {
            const boards = await BoardService.query();
            dispatch(_setBoards(boards));
        } catch (err) {
            console.log('BoardActions: err in loadBoards', err)
        }
    };
}

function _setBoards(boards) {
    return {
        type: 'SET_BOARDS',
        boards
    };
}

export function loadBoard(boardId) {
    return async dispatch => {
        try {
            const board = await BoardService.get(boardId);
            dispatch(_boardUpdate(board));
        } catch (err) {
            console.log('BoardActions: err in loadBoard', err);
        }
    };
}

export function setBoard(board) {
    return async dispatch => {
        try {
            dispatch(_boardUpdate(board));
        } catch (err) {
            console.log('BoardActions: err in setBoard', err);
        }
    };
}

export function updateBoard(board, msg, notificationType, historyItem) {
    return async dispatch => {
        try {
            board.history.unshift({ id: utils.getRandomId(), time: Date.now(), ...historyItem });
            dispatch(_boardUpdate(board));
            await BoardService.update(board);
            SocketService.emit('boardUpdate', board);
            utils.emitNotification(msg, notificationType);
        } catch (err) {
            console.log('BoardActions: err in updateBoard', err);
        }
    };
}

function _boardUpdate(board) {
    return {
        type: 'UPDATE_BOARD',
        board
    }
}

export function createBoard(board) {
    return async dispatch => {
        try {
            const addedBoard = await BoardService.add(board);
            dispatch(_addBoard(addedBoard));
            return addedBoard;
        } catch (err) {
            console.log('BoardActions: err in createBoard', err);
        }
    };
}

function _addBoard(addedBoard) {
    return {
        type: 'ADD_BOARD',
        addedBoard
    };
}

export function removeBoard(board) {
    return async dispatch => {
        try {
            await BoardService.remove(board._id);
            dispatch(_deleteBoard(board));
        } catch (err) {
            console.log('BoardActions: err in removeBoard', err);
        }
    };
}

function _deleteBoard(board) {
    return {
        type: 'DELETE_BOARD',
        board
    }
}