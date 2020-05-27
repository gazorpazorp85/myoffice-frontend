import en from '../i18n/en';
import he from '../i18n/he';

const KEY = 'language';
const defaultLanguage = localStorage.getItem(KEY) || window.navigator.language.slice(0, 2);

const initialState = {
    language: defaultLanguage,
    languages: { en, he },
    direction: defaultLanguage === 'en' ? 'ltr' : 'rtl'
}

window.i18nData = initialState.languages[initialState.language];

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_LANGUAGE':
            return { ...state, language: action.language };
        case 'SET_DIRECTION':
            return { ...state, direction: action.direction };
        default:
            return state;
    }
}