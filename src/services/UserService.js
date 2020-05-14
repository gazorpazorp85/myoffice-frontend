import HttpService from './HttpService'

export default {
    login,
    logout,
    signup,
    getLoggedInUser,
    getCollaborators
}

async function login(userCred) {
    try {
        const user = await HttpService.post('auth/login', userCred);
        return user;
    } catch (err) {
        console.log('UserService: err in login', err);
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
        const userCollaborators = await HttpService.post('user', collaborators);
        return userCollaborators;
    } catch (err) {
        console.log('UserService: err in getting user collaborators', err)
    }
}