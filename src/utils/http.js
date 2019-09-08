// helper function
// third party library
import axios from 'axios';

console.log('came to http', process.env.REACT_APP_OPENSKY_API)

const http = axios.create({
  baseURL: 'https://opensky-network.org/api',
});

export default http;
