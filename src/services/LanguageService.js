import en from '../i18n/en';
import he from '../i18n/he';

const languages = { en, he };
const KEY = 'language';

const changeLanguage = (lang) => {
    window.i18nData = languages[lang];
    localStorage.setItem(KEY, lang);
    return lang;
}

const setLanguageDirection = (language) => {
    return language === 'he' ? 'rtl' : 'ltr';
}

export default {
    changeLanguage,
    setLanguageDirection
}