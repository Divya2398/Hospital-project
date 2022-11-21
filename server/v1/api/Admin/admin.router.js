import express from "express";
import Controller from "./admin.controller.js";

const app = express();

let router = express.Router();

console.log("router");

router.post("/login", Controller.Login);

router.post("/common-login", Controller.CommonLogin);

router.post("/register", Controller.Register);

router.get("/getAdmin", Controller.GetAll);

router.get("/get", Controller.GetOne);

router.put("/update", Controller.Update);

router.delete("/delete", Controller.Delete);

// router.get('/register',  function(req, res){
//     // register
// })

export default router;
