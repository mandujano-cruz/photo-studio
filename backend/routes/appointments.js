const express = require("express");
const { 
  getAppointments,
  getAvailability,
  getAppointmentID,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointments");

const mapScheduleId = (type) => (req, res, next) => {
  if (type=='PUBLIC') {
    req.scheduleId = process.env.SUPERSAAS_SCHEDULE_INFO;
    req.isPublicAccess = true;
  } else {
    req.scheduleId = process.env.SUPERSAAS_SCHEDULE_PHOTO;
    req.isPublicAccess = false;
  }
  console.log("SCHEDULE_ID: ", req.scheduleId);
  next();
};

const appointmentsPublicRouter = express.Router();
appointmentsPublicRouter.get("/availability", mapScheduleId('PUBLIC'), getAvailability);
appointmentsPublicRouter.post("/new", mapScheduleId('PUBLIC'), createAppointment);

const appointmentsPrivateRouter = express.Router();
appointmentsPrivateRouter.get("/all", mapScheduleId('PRIVATE'), getAppointments);
appointmentsPrivateRouter.get("/availability", mapScheduleId('PRIVATE'), getAvailability);
// appointmentsPrivateRouter.get("/:id", mapScheduleId('PRIVATE'), getAppointmentID);
appointmentsPrivateRouter.post("/new", mapScheduleId('PRIVATE'), createAppointment);
appointmentsPrivateRouter.put("/:id", mapScheduleId('PRIVATE'), updateAppointment);
//appointmentsPrivateRouter.delete("/:id", mapScheduleId('PRIVATE'), deleteAppointment);

module.exports = {appointmentsPublicRouter, appointmentsPrivateRouter};
