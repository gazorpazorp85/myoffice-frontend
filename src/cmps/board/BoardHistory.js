import React from 'react';
import moment from 'moment';
import 'moment/locale/he';

export default function BoardHistory({ direction, history, language }) {

    moment.locale(language);

    return (
        <div className="flex column side-menu-container boardhistory-container" dir={direction} style={{ right: direction === 'ltr' ? 0 : 'unset', left: direction === 'rtl' ? 0 : 'unset' }}>
            <div className="flex column">
                <div className="uppercase">
                    <h2>{window.i18nData.boardHistoryTitle}:</h2>
                </div>
                <hr />
            </div>
            <ul className="clean-list">
                {history.map(item => (
                    <li key={item.id}>
                        <div>
                        {item.item ?
                            <div>{window.i18nData[item.key1]}{item.item}{window.i18nData[item.key2]}{item.user}</div> :
                            <div>{item.user}{window.i18nData[item.key]}</div>
                        }
                            <br />
                            {moment(item.time).calendar()}
                        </div>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    )
}