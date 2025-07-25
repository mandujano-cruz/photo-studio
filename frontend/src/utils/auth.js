export const BASE_URL = "http://localhost:3000";

export const register = (email, password, name, lastName, role) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, lastName, role }),
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
