export default class Api {
  constructor (options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  
  _handleResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(endpoint, options={}) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      headers: this._headers,
      ...options,
    }).then(this._handleResponse);
  }

  getUserInfo (endpoint) {
    return this._request(endpoint);
  }
}