import LanguageService from '../services/LanguageService';

export function changeLanguage(lang) {
    return dispatch => {
        const language = LanguageService.changeLanguage(lang);
        const direction = LanguageService.setLanguageDirection(language);
        dispatch(_setLanguage(language));
        dispatch(_setDirection(direction));
    }
}

function _setLanguage(language) {
    return {
        type: 'SET_LANGUAGE',
        language
    };
}

function _setDirection(direction) {
    return {
        type: 'SET_DIRECTION',
        direction
    }
}