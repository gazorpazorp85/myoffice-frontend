import RequestService from "../services/RequestService";

export function loadRequests(userId) {
    return async dispatch => {
        try {
            const requests = await RequestService.query(userId);
            dispatch(_setRequests(requests));
        } catch (err) {
            console.log('RequestActions: err in loadRequests', err);
        }
    }
}

function _setRequests(requests) {
    return {
        type: 'SET_REQUESTS',
        requests
    };
}