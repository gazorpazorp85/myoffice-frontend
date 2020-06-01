import HttpService from './HttpService';
// import SocketService from './SocketService';
// import utils from './utils';

export default {
    query,
    sendRequest,
    formatReceivedRequests
}

function query(userId) {
    return HttpService.get(`request/${userId}`);
}

function sendRequest(request) {
    // SocketService.emit('requestSent', request);
    // utils.emitNotification('new collaboration request', 'success', 'getCollaborationRequestNotification');
    return HttpService.post('request', request);
}

function formatReceivedRequests(requests, user) {
    return requests.filter(request => request.receiverId === user._id);
}