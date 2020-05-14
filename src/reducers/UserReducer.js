const initialState = {
    user: null,
    userCollaborators: []
}

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.user };
        case 'GET_COLLABORATORS':
            return { ...state, userCollaborators: action.collaborators };
        default:
            return state;
    }
}