import axios from 'axios';
const API_KEY = '43981018-e90bba841625934206eceb401';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchPhotos = async (searchImage, page = 1, perPage = 15) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchImage,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: perPage,
    page: page,
  });
  try {
    const response = await axios.get(`${BASE_URL}/?${params}`);
    return response.data;
  } catch (error) {
    throw new Error('Sorry, something went wrong with the API request.');
  }
};