export const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';

const TOKEN_KEY = 'jwt';

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    if (res.status === 400) {
      return Promise.reject('Error 400: invalid email or password data');
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    if (res.status === 400) {
      return Promise.reject('Error 400: one or more data not provided');
    }
    if (res.status === 401) {
      return Promise.reject('Error 401: provided e-mail not found');
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    if (res.status === 400) {
      return Promise.reject('Error 400: missing or invalid token format');
    }
    if (res.status === 401) {
      return Promise.reject('Error 401: invalid token');
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};
