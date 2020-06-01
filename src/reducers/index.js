import { combineReducers } from 'redux';

import BoardReducer from './BoardReducer';
import LanguageReducer from './LanguageReducer';
import RequestReducer from './RequestReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
    boardState: BoardReducer,
    languageState: LanguageReducer,
    requestState: RequestReducer,
    userState: UserReducer
});

export default rootReducer;