import Service from "./specialist.service.js";

async function addSpecialist(req, res) {
  await Service.addSpecialist(req, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function getAllSpecialist(req, res) {
  await Service.getAllSpecialist(req.body, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function getSingleSpecialist(req, res) {
  await Service.getSingleSpecialist(req.query, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function updateDoctorWithImg(req, res) {
  await Service.updateDoctorWithImg(req, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function doctorlogin(req, res) {
  await Service.doctorlogin(req, res, function (result) {
    return res.json({ message: result.message });
  });
}

// async function updateDoctorWithoutImg(req,res){
//     await Service.updateDoctorWithoutImg(req, res, function(result){
//         return res.json({message : result.message})
//     })
// }

async function updateDoctorWithoutImage(req, res) {
  await Service.updateDoctorWithoutImage(req, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function getspecialistByDepId(req, res) {
  await Service.getspecialistByDepId(req, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function addSlotDay(req, res) {
  await Service.addSlotDay(req, res, function (result) {
    return res.json({ message: result.message });
  });
}

export default {
  addSpecialist,
  getAllSpecialist,
  getSingleSpecialist,
  updateDoctorWithImg,
  // updateDoctorWithoutImg,
  updateDoctorWithoutImage,
  getspecialistByDepId,
  addSlotDay,
  doctorlogin,
};
