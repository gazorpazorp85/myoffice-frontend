import HttpService from './HttpService';
// import SocketService from './SocketService';

// import utils from './utils';

export default {
    query,
    sendRequest,
    receivedRequests
}

function query() {
    return HttpService.get('request');
}

function sendRequest(request) {
    // SocketService.emit('receiverId', request.receiverId);
    return HttpService.post('request', request);
}

function receivedRequests(requests, userId) {
    return requests.filter(request => request.receiverId === userId);
}