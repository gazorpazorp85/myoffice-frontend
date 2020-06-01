const initialState = {
    requests: []
}

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_REQUESTS':
            return { ...state, requests: action.requests };
        default:
            return state;
    }
}