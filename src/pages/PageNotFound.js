import React from 'react';
import { connect } from 'react-redux';

function PageNotFound(props) {

    const backgroundPosition = props.direction === 'ltr' ? 'top left, bottom' : 'top right, bottom';

    return (
        <div className="page-not-found-container" dir={props.direction}>
            <div className="flex center align-center main-container page-not-found-subcontainer" style={{ backgroundPosition: backgroundPosition }}>
                <div className="flex column align-center page-not-found-message-container">
                    <div className="oops-container">
                        {window.i18nData.pageNotFound}
                    </div>
                    <div className="flex">
                        <div className="pointer uppercase click-here-container" onClick={() => props.history.push('/')}>
                            {window.i18nData.clickHere}
                        </div>
                        <div>
                            {window.i18nData.toGoBack}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        direction: state.languageState.direction
    };
}

export default connect(mapStateToProps)(PageNotFound);