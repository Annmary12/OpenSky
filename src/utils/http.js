// helper function
// third party library
import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_OPENSKY_API,
});

export default http;
