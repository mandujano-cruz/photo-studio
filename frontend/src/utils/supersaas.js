import { BASE_URL } from "./auth";
import { getToken } from "./token";

export async function fetchAppointments() {
  const response = await fetch(`${BASE_URL}/appointments/all`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener citas: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

//export async function fetchSSOWidgetUrl() {
//  const response = await fetch(`${BASE_URL}/supersaas/autologin`, {
//    headers: {
//      Authorization: `Bearer ${getToken()}`,
//      "Content-Type": "application/json",
//    },
//  });

//  if (!response.ok) {
//    throw new Error(`Error al obtener SSO de SuperSaaS: ${response.status}`);
//  }

//  const data = await response.json();
//  return data.ssoUrl;
//}

export async function fetchAvailability(date, isPublic) {
  const prefix = isPublic ? '/public/appointments' : '/appointments';
  const url = `${BASE_URL}${prefix}/availability?date=${date}`;
  const headers = {
    "Content-Type": "application/json",
  }
  if(!isPublic) {
    headers["Authorization"] = `Bearer ${getToken()}`;
  }
  const response = await fetch(url, { headers });
  console.log(url);

  if (!response.ok) {
    throw new Error(`Error al obtener disponibilidad: ${response.status}`);
  }

  const data = await response.json();

  return data;
};

export async function createAppointment(appointmentData, isPublic) {
  const prefix = isPublic ? '/public/appointments' : '/appointments';
  const url = `${BASE_URL}${prefix}/new`;
  const headers = {
    "Content-Type": "application/json",
  }
  if(!isPublic) {
    headers["Authorization"] = `Bearer ${getToken()}`;
  }
  const response = await fetch(url, { 
    method: "POST", 
    headers, 
    body: JSON.stringify(appointmentData), 
  });
  // const response = await fetch(`${BASE_URL}/appointments/new`, {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${getToken()}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(appointmentData),
  // });
  console.log(url);

  if (!response.ok) {
    throw new Error(`Error al crear cita: ${response.status}`);
  }

  const data = await response.json();

  return data;
};

//export async function fetchAppointmentID(id) {
//  const response = await fetch(`${BASE_URL}/appointments/${id}`, {
//    headers: {
//      Authorization: `Bearer ${getToken()}`,
//      "Content-Type": "application/json",
//    },
//  });

//  if (!response.ok) {
//    throw new Error(`Error al obtener la cita: ${response.status}`);
//  }

//  const data = await response.json();

//  return data;
//};

export async function updateAppointment(id, appointmentData) {
  const response = await fetch(`${BASE_URL}/appointments/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointmentData),
  });

  if (!response.ok) {
    throw new Error(`Error al actualizar la cita: ${response.status}`);
  }
};