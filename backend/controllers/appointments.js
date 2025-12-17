const ClientInstance = require("../utils/supersaasClient");
const { appointment } = require("supersaas-api-client/src/models/Appointment");
const { errors } = require("celebrate");

function parseDateLocal(dateStr) {
  // dateStr: "YYYY-MM-DD" -> devuelve startOfDay y endOfDay en local time
  const start = new Date(`${dateStr}T00:00:00`);
  const end = new Date(`${dateStr}T23:59:59`);
  return { start, end };
}

function overlaps(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

// Obtener todas las citas
module.exports.getAppointments = function (req, res) {
  const scheduleId = process.env.SUPERSAAS_SCHEDULE_PHOTO;

  ClientInstance.appointments
    .list(scheduleId)
    .then((appointments) => {
      res.json(appointments);
    })
    .catch((error) => {
      console.error("Error al obtener citas:", error.message);
      res.status(500).json({ error: "No se pudieron obtener las citas" });
    });
};

// Crear una nueva cita
module.exports.createAppointment = (req, res) => {
  const { full_name, email, start, finish, field_1_r, field_2_r, description, scheduleType } = req.body;
  const scheduleId = req.scheduleId;
  let appointmentData;

  switch (scheduleType){
    case 'photo':
      appointmentData = {
        start,
        finish,
        email,
        full_name,
        resource_id: process.env.SUPERSAAS_RESOURCE_PHOTO,
        field_1_r,
        field_2_r,
      };
      break;
    case 'info':
      appointmentData = {
        start,
        finish,
        email,
        full_name,
        resource_id: process.env.SUPERSAAS_RESOURCE_INFO,
        description,
      };
      break;
    default:
      return res.status(400).json({error: 'Tipo de horario no válido.'});
  }


  // The 'attributes' object that will be passed to the API.
  // const appointmentData = {
  //   start,
  //   finish,
  //   email,
  //   full_name,
  //   resource_id: 1162593,
  //   field_1_r,
  //   // Add other fields from req.body if they are needed, such as address, etc.
  // };

  const userId = req.user?.supersaasId ? Number(req.user.supersaasId) : 0;
  console.log (appointmentData, scheduleId, userId);

  ClientInstance.appointments.create(scheduleId, userId, appointmentData, true, true)
    .then((appointment) => res.status(201).json(appointment))
    .catch((error) => {
      console.log(JSON.stringify(error, null, 2));
      console.error("Error en createAppointment:", error);
      console.error("Mensaje de error:", error.message);
      res.status(500).json({ error: "No se pudo crear la cita. Por favor, revisa la consola del servidor para más detalles." });
    });
};

module.exports.getAvailability = function (req, res) {
  const scheduleId = req.scheduleId;

  const date = req.query.date + " 00:00:00"; // required: YYYY-MM-DD
  const duration = parseInt(req.query.duration, 10) || 60; // minutes
  const startHour = parseInt(req.query.startHour || "9", 10); // 9 AM
  const endHour = parseInt(req.query.endHour || "18", 10); // 6 PM
  const buffer = parseInt(req.query.buffer || "0", 10); // minutes before/after appt
  console.log(scheduleId);

  if (!date) {
    return res.status(400).json({ error: "date query param required (YYYY-MM-DD)" });
  }

  // 1. compute day window in local time
  const { start: dayStart, end: dayEnd } = parseDateLocal(date);

  // build business window start/end
  const windowStart = new Date(dayStart);
  windowStart.setHours(startHour, 0, 0, 0);
  const windowEnd = new Date(dayEnd);
  windowEnd.setHours(endHour, 0, 0, 0);

  ClientInstance.appointments.available(scheduleId, date)
    .then(data => {
      const times = data.map((slot) => {
        const dateObject = new Date(slot.start);
        return dateObject.toLocaleTimeString("es-MX", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // usa formato 24 horas
          timeZone: "America/Mexico_City",
        });
      });
      res.json({ times })
    })
    .catch((err) => console.error(err));
};


module.exports.updateAppointment = async (req, res) => {
  const scheduleId = process.env.SUPERSAAS_SCHEDULE_PHOTO;
  const appointmentID = req.params.id;

  const {
    res_name,
    full_name,
    field_1_r,
    field_2_r,
    start,
    finish
  } = req.body;

  const updatedData = {
    res_name,
    full_name,
    field_1_r,
    field_2_r,
    start,
    finish
  };

  try {
    const updated = await ClientInstance.appointments.update(
      scheduleId,
      appointmentID,
      updatedData
    );

    return res.json(updated);
  } catch (err) {
    console.error("Error actualizando cita:", err);
    res.status(500).json({ error: "Error al actualizar la cita" });
  }
};