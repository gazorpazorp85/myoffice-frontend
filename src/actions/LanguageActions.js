import LanguageService from '../services/LanguageService';

export function changeLanguage(lang) {
    return dispatch => {
        const language = LanguageService.changeLanguage(lang);
        dispatch(_setLanguage(language))
    }
}

function _setLanguage(language) {
    return {
        type: 'SET_LANGUAGE',
        language
    };
}