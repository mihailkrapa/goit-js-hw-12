import axios from 'axios';

const config = {
  API_KEY: '26114723-eab203642ec2629c12fb3e14b',
  BASE_URL: 'https://pixabay.com/api',
};

export async function getimages(q, page) {
  const params = {
    key: config.API_KEY,
    page,
    per_page: 15,
    q,
    image_type: 'image',
    orientation: 'horizontal',
    safesearch: true,
  };

  const res = await axios.get(`${config.BASE_URL}/`, { params });

  return res.data;
}
