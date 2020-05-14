import React, { Component } from 'react';

import SearchIcon from '@material-ui/icons/Search';

import utils from '../../services/utils';

export default class SplashMenu extends Component {

    state = {
        splashImagesUrls: [],
        filterByName: ''
    }

    inputChange = (ev) => {
        const { value } = ev.target;
        this.setState({ filterByName: value });
    }

    onSave = async () => {
        try {
            const splashImages = await utils.getImagesFromUnsplash(this.state.filterByName);
            let splashImagesUrls = [];
            splashImages.forEach(image => {
                const urlIdx = splashImagesUrls.findIndex(currUrl => currUrl === image.urls);
                if (urlIdx >= 0) {
                    splashImagesUrls.splice(urlIdx, 1);
                } else {
                    splashImagesUrls.push(image.urls);
                }
            })
            this.setState({ splashImagesUrls });
        } catch (err) {
            console.log(err);
        }
    }

    setBoardBackground = (imageUrl) => {
        const newBoard = { ...this.props.board };
        newBoard.boardBgImage = imageUrl.full;
        newBoard.boardBgThumbnail = imageUrl.small;
        const historyItem = { user: this.props.user.username, key: 'changedImgMsg' };
        const msgBody = window.i18nData.changedImgMsg;
        const msg = `${this.props.user.username} ${msgBody}`;
        const notificationType = 'success';
        this.props.updateBoard(newBoard, msg, notificationType, historyItem);
        this.props.close('toggleSplashMenu');
    }

    stopPropagation = (ev) => {
        ev.stopPropagation();
    }

    render() {

        let direction = this.props.direction;

        return (
            <div className='flex column side-menu-container splash-menu-container'
                style={{ right: direction === 'ltr' ? 0 : 'unset', left: direction === 'rtl' ? 0 : 'unset' }}
                onClick={this.stopPropagation}>
                <div className='flex column align-center search-subcontainer'>
                    <div className='flex splash-search-container'>
                        <input className='splash-search-input' type='text' placeholder={window.i18nData.searchPicture} onChange={this.inputChange} />
                        <div className='btn search-img' onClick={this.onSave}>
                            <SearchIcon />
                        </div>
                    </div>
                    <div className='btn upload-img'>
                        <input style={{ display: "none" }} type='file' id='upload-img' onChange={this.props.onAddImg}>
                        </input>
                        <label htmlFor='upload-img'>
                            {window.i18nData.uploadImg}
                        </label>
                    </div>
                </div>
                <hr style={{margin: 'unset'}}/>
                <div className='flex wrap splash-imgs-container'>
                    {this.state.splashImagesUrls.map(imageUrl => {
                        return (
                            <div className='splash-img' key={imageUrl.small}>
                                <img src={imageUrl.small} alt='' onClick={() => this.setBoardBackground(imageUrl)} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}