const initialState = {
    boards: [],
    board: {}
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_BOARDS':
            return { ...state, boards: action.boards };
        case 'UPDATE_BOARD':
            return { ...state, board: action.board };
        case 'ADD_BOARD':
            return { ...state, boards: [...state.boards, action.addedBoard] };
        case 'DELETE_BOARD':
            return { ...state, boards: state.boards.filter(board => board._id !== action.board._id) }
        default:
            return state;
    }
}