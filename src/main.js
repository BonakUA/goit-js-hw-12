import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import { createMarkup } from './js/render-functions';
import { fetchPhotos } from './js/pixabay-api';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const imgContainer = document.querySelector('.gallery');
const form = document.querySelector('.form');
const loaderEl = document.querySelector('.loader');
const btnLoad = document.querySelector('.btn-load');

let searchQuery = '';
let page = 1;
const limit = 15;
let totalPages = 0;
let lightbox = null;

async function renderPhotos() {
  try {
    const imagesData = await fetchPhotos(searchQuery, page, limit);
    totalPages = Math.ceil(imagesData.totalHits / limit);

    if (imagesData.hits.length === 0 && page === 1) {
      iziToast.error({
        position: 'topRight',
        timeout: 2000,
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      btnLoad.classList.add('is-hidden');
      loaderEl.classList.add('is-hidden');
      return;
    }

    const initialHeight = imgContainer.getBoundingClientRect().height;
    imgContainer.insertAdjacentHTML('beforeend', createMarkup(imagesData.hits));
    const newHeight = imgContainer.getBoundingClientRect().height;
    const scrollByHeight = newHeight - initialHeight;

    window.scrollBy({
      top: scrollByHeight,
      behavior: 'smooth',
    });

    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionsDelay: 250,
      });
    } else {
      lightbox.refresh();
    }

    if (page >= totalPages || imagesData.hits.length < limit) {
      btnLoad.classList.add('is-hidden');
    } else {
      btnLoad.classList.remove('is-hidden');
    }

    loaderEl.classList.add('is-hidden');
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      timeout: 2000,
      message: 'Sorry, something went wrong. Please try again!',
    });
    loaderEl.classList.add('is-hidden');
    btnLoad.classList.remove('is-hidden');
  }
}

async function onSearch(event) {
  event.preventDefault();
  searchQuery = event.target.elements.text.value.trim();
  imgContainer.innerHTML = '';
  page = 1;
  btnLoad.classList.add('is-hidden');
  loaderEl.classList.remove('is-hidden');

  if (searchQuery === '') {
    iziToast.error({
      position: 'topRight',
      timeout: 2000,
      message: 'Please enter a search query!',
    });
    loaderEl.classList.add('is-hidden');
    return;
  }
  await renderPhotos();
  event.target.reset();
}

async function onLoadMore() {
  page += 1;
  btnLoad.classList.add('is-hidden');
  loaderEl.classList.remove('is-hidden');
  await renderPhotos();
}

form.addEventListener('submit', onSearch);
btnLoad.addEventListener('click', onLoadMore);