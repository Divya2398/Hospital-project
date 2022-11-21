import express from "express";
import Controller from "./specialist.controller.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "v1/uploads/specialist");
  },
  filename(req, file, callback) {
    callback(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/addSpecialist", upload.single("image"), Controller.addSpecialist);
router.get("/getAllSpecialist", Controller.getAllSpecialist);
router.get("/getSingleSpecialist", Controller.getSingleSpecialist);
router.put("/updateDoctorWithImg", Controller.updateDoctorWithImg);
// router.put('/updateSpecialist', Controller.updateDoctorWithoutImg)
router.put("/updateDoctorWithoutImage", Controller.updateDoctorWithoutImage);
router.get("/getspecialistByDepId", Controller.getspecialistByDepId);
router.post("/addSlotDay", Controller.addSlotDay);
router.post("/doctor-login", Controller.doctorlogin);

export default router;
