
import axios from 'axios';
import Cookies from 'universal-cookie';
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = 'csrftoken';

axios.defaults.withCredentials = false;
axios.defaults.adapter = require('axios/lib/adapters/http');
const local = 'http://127.0.0.1:8000/'; //if we are working in the dev server
const dev = 'unkown'; //if we are working in the production server
const relative = "/";
const domain = document.location.hostname;

// let url = domain.includes("localhost")?  local : relative;
// if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
//     url = local;
// }

//check if there is a token or not
let cookeis = new Cookies()
if (cookeis.get('TOKEN')){
  axios.defaults.headers.common['Authorization'] = `Bearer ${cookeis.get('TOKEN')}`;
}

export function setAuthorizationToken(token) {
    console.log(token)
    
    if (token !== undefined) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }


export default axios.create({ baseURL: local  });

export function get(path) {
    return axios.create({
        baseURL: local
    }).get(path)

}


export function post(path, body) {
    return axios.create({
        baseURL: local
    }).post(path, body)
}
