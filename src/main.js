import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getimages } from './js/pixabay-api';
import { renderMarkup } from './js/render-functions';
import errorSvg from './img/error.svg';
import warningSvg from './img/warning.svg';
import successSvg from './img/success.svg';

const form = document.querySelector('.js-hero-form');
const imageList = document.querySelector('.images-list');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.js-load-more-btn');

let page = 1;
let userSearch;
let imageHeight;
const perPage = 15;

const loadMoreImages = async () => {
  showLoader();

  page += 1;

  const data = await getimages(userSearch, page);

  renderMarkup(imageList, data.hits);

  const lastPage = Math.ceil(data.totalHits / perPage);

  if (page === lastPage) {
    loadBtnHide();
    showError("We're sorry, but you've reached the end of search results.");
  }

  hideLoader();

  imagesScroll();
};

const handleFormSubmit = async (e) => {
  e.preventDefault();

  imageList.innerHTML = '';

  page = 1;

  userSearch = e.target.elements.query.value.trim();

  if (userSearch === '') {
    loadBtnHide();
    showWarning();
  }

  showLoader();

  try {
    const data = await getimages(userSearch, page);
    if (data.hits.length === 0) {
      hideLoader();
      loadBtnHide();
      showError('Sorry, there are no images matching<br> your search query. Please try again!');
      e.target.reset();
    }

    if (data.totalHits < perPage) {
      loadBtnHide();
    } else {
      loadBtnShow();
    }

    showSuccess(data);

    renderMarkup(imageList, data.hits);
  } catch (error) {
    console.error(error);
  }

  hideLoader();

  e.target.reset();
}

loadBtn.addEventListener('click', loadMoreImages);
form.addEventListener('submit', handleFormSubmit);

function showWarning() {
  iziToast.warning({
    titleColor: '#fff',
    messageColor: '#fff',
    backgroundColor: '#ffa000',
    iconUrl: warningSvg,
    message: 'Please enter a search query',
    position: 'topRight',
  });
}

function showError(message) {
  iziToast.error({
    titleColor: '#fff',
    messageColor: '#fff',
    backgroundColor: '#ef4040',
    iconUrl: errorSvg,
    message: message,
    position: 'topRight',
  });
}

function showSuccess(data) {
  iziToast.success({
    titleColor: '#fff',
    messageColor: '#fff',
    backgroundColor: '#28a745',
    message: `We found ${data.totalHits} images.`,
    iconUrl: successSvg,
    position: 'topRight',
  });
}

function showLoader() {
  loader.classList.add('visible');
}

function hideLoader() {
  loader.classList.remove('visible');
}

function loadBtnShow() {
  loadBtn.classList.remove('is-hidden');
}

function loadBtnHide() {
  loadBtn.classList.add('is-hidden');
}

function imagesScroll() {
  const slowedImage = document.querySelector('.images__image');
  imageHeight = slowedImage.getBoundingClientRect().height;

  window.scrollBy({
    top: 2 * imageHeight,
    behavior: 'smooth',
  });
}
