import React from 'react';

export default function CardDetailsEditorIcon({ icon }) {

    const IconCmp = icon.cmp;
    const iconName = icon.string;

    return (
        <div className="flex align-center pointer card-details-editor-btn">
            <IconCmp />
            <div className="capitalize">{window.i18nData[iconName]}</div>
        </div>
    )
}