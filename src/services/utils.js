import axios from 'axios'

import SocketService from './SocketService';

export default {
  getRandomId,
  createUserIcon,
  uploadImg,
  getImagesFromUnsplash,
  emitNotification
}

function getRandomId() {
  const letters = '1234567890poiiytreqwasdfghjklmnbvcxxssersgyushquiz';
  const max = letters.length;
  let id = '';
  for (let i = 0; i < 10; i++) {
    let idx = Math.floor(Math.random() * max);
    id += letters[idx];
  }
  return id;
}

function createUserIcon(firstName, lastName) {
  let newIcon = firstName.charAt(0) + lastName.charAt(0)
  return (newIcon)
}

async function uploadImg(file) {
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_KEY}/image/upload`

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);

  try {
    const { data } = await axios.post(UPLOAD_URL, formData);
    console.log('data', data);
    return data.url;
  } catch (err) {
    console.error(err)
  }
}

async function getImagesFromUnsplash(filterName) {
  const URL = `https://api.unsplash.com/search/photos?per_page=20&query=${filterName}&client_id=${process.env.REACT_APP_UNSPLASH_API}`

  try {
    const { data } = await axios.get(URL);
    return data.results;
  } catch (err) {
    console.error(err)
  }
}

function emitNotification(msg, type) {

  const language = localStorage.getItem('language') || window.navigator.language.slice(0, 2);

  const notification = {
    message: msg,
    type: type,
    insert: "top",
    container: language === 'he' ? "bottom-left" : "bottom-right",
    animationIn: ["animated", "zoomIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
    }
  };
  SocketService.emit('sendNotification', notification);
}