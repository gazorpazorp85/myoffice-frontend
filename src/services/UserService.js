import HttpService from './HttpService'

export default {
    login,
    logout,
    signup,
    getLoggedInUser,
    getCollaborators,
    getCollaborator,
    sendCollaborationRequest
}

async function login(userCred) {
    try {
        const user = await HttpService.post('auth/login', userCred);
        return user;
    } catch (err) {
        console.log('UserService: err in logout', err);
        throw err;
    }
}

async function logout() {
    try {
        await HttpService.post('auth/logout');
    } catch (err) {
        console.log('UserService: err in logout', err);
    }
}

async function signup(userCred) {
    try {
        const user = await HttpService.post('auth/signup', userCred);
        return user;
    } catch (err) {
        console.log('UserService: err in signup', err);
    }
}

async function getLoggedInUser() {
    try {
        const user = await HttpService.get('auth/user');
        return user;
    } catch (err) {
        console.log('UserService: err in getting loggedInUser', err);
    }
}

async function getCollaborators(collaborators) {
    try {
        const userCollaborators = await HttpService.post('user/collaborators', collaborators);
        return userCollaborators;
    } catch (err) {
        console.log('UserService: err in getting user collaborators', err)
    }
}

async function getCollaborator(filter) {
    try {
        const userCollaborator = await HttpService.post('user/collaborator', filter);
        return userCollaborator;
    } catch (err) {
        err.message = window.i18nData.noCollaboratorError;
        throw err;
    }
}

async function sendCollaborationRequest(collaborator, request) {
    try {
        await HttpService.post('user/sendRequest', { collaborator, request });
    } catch (err) {
        console.log('UserService: err in sending collaboration request');
    }
}