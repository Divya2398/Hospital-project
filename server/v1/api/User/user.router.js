import express from "express";
import Controller from "./user.controller.js";

const app = express();

let router = express.Router();

console.log("router");

router.post("/register", Controller.register);

router.post("/login", Controller.login);

router.put("/edit", Controller.Update);

router.post("/userlogin", Controller.userlogin);

router.post("/otp/:mobile_number", Controller.OTP);

router.get("/get-user", Controller.getuser);
router.get("/get-all-user", Controller.getalluser);

// router.get('/register',  function(req, res){
//     // register
// })

export default router;
