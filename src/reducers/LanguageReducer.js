import en from '../i18n/en';
import he from '../i18n/he';

const KEY = 'language';

const initialState = {
    language: localStorage.getItem(KEY) || window.navigator.language.slice(0, 2),
    languages: { en, he }
}

let defaultLanguage = initialState.language === 'en' ? 'en' : 'he';
window.i18nData = initialState.languages[defaultLanguage];

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_LANGUAGE':
            return { ...state, language: action.language }
        default:
            return state;
    }
}