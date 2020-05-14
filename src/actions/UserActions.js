import UserService from '../services/UserService';

export function login(userCreds) {
    return async dispatch => {
        try {
            const user = await UserService.login(userCreds);
            dispatch(_setUser(user));
        } catch (err) {
            console.log('UserActions: err in login', err);
        }
    };
}

export function signup(userCreds) {
    return async dispatch => {
        try {
            const user = await UserService.signup(userCreds);
            dispatch(_setUser(user));
        } catch (err) {
            console.log('UserActions: err in signup', err);
        }
    };
}

export function logout() {
    return async dispatch => {
        try {
            await UserService.logout();
            dispatch(_setUser(null));
        } catch (err) {
            console.log('UserActions: err in logout', err);
        }
    };
}

export function getLoggedInUser() {
    return async dispatch => {
        try {
            const user = await UserService.getLoggedInUser();
            if (Object.entries(user).length === 0) return;
            dispatch(_setUser(user));
        } catch (err) {
            console.log('UserActions: err in getLoggedInUser', err);
        }
    };
}

function _setUser(user) {
    return {
        type: 'SET_USER',
        user
    };
}

export function getUserCollaborators(collaboratorsId) {
    return async dispatch => {
        try {
            const collaborators = await UserService.getCollaborators(collaboratorsId);
            dispatch(_setUserCollaborators(collaborators));
        } catch (err) {
            console.log('UserActions: err in getUserCollaborators')
        }
    }
}

function _setUserCollaborators(collaborators) {
    return {
        type: 'GET_COLLABORATORS',
        collaborators
    }
}