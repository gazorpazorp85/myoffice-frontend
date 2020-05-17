import React from 'react';

import CloseIcon from '@material-ui/icons/Close';

import CardService from '../../../services/CardService';

export default function CardLabels(props) {

    const { direction, toggle } = props;
    const labelsClassNames = ['label-color-1', 'label-color-2', 'label-color-3', 'label-color-4', 'label-color-5', 'label-color-6'];
    const style = direction === 'ltr' ? 'left' : 'right';

    return (
        <div className="flex column labels-container" style={{ [style]: 9, top: 37 }}>
            <CloseIcon className="pointer close-btn-labels" onClick={() => toggle('toggleLabels')} />
            <div className="uppercase label-title">{window.i18nData.addRemoveLabels}</div>
            <div className="flex column align-center">
                {labelsClassNames.map(labelClassName => {
                    return (
                        <div className={`${labelClassName} large-label`}
                            key={labelClassName}
                            onClick={() => CardService.updateChoosenLabels(props, labelClassName)}>
                        </div>)
                })}
            </div>
        </div>
    )
}