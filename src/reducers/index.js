import { combineReducers } from 'redux';

import BoardReducer from './BoardReducer';
import LanguageReducer from './LanguageReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
    boardState: BoardReducer,
    languageState: LanguageReducer,
    userState: UserReducer
});

export default rootReducer;