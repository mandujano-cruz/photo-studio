export const BASE_URL = "http://localhost:3000";
import { getToken } from "./token";

export const register = (email, password, full_name, role) => {
  return fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ email, password, full_name, role }),
  })
    .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
}

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
};

export const getUsers = (token) => {
  return fetch(`${BASE_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
}

export const updateProfile = ({name}) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({name}),
  }).then((res) => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));
}