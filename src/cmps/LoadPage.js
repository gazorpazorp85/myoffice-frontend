import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function LoadPage({ direction }) {
    return (
        <div className="flex column center align-center loading-page" dir={direction}>
            <h2 className="uppercase">{window.i18nData.loading}</h2>
            <CircularProgress color="secondary" />
        </div>
    )
}