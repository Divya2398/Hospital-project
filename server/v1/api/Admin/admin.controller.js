import Service from "./admin.service.js";

async function Register(req, res, next) {
  console.log("Controller");

  await Service.Register(req.body, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function Login(req, res, next) {
  console.log("Controller");

  await Service.Login(req.body, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function GetAll(req, res, next) {
  console.log("Controller");
  await Service.GetAll(req.body, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function CommonLogin(req, res, next) {
  console.log("Controller");
  await Service.CommonLogin(req.body, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function GetOne(req, res, next) {
  console.log("Controller");
  await Service.GetOne(req.query, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function Update(req, res, next) {
  console.log("Controller");
  await Service.Update(req, res, function (result) {
    return res.json({ message: result.message });
  });
}

async function Delete(req, res, next) {
  console.log("Controller");
  await Service.Delete(req.query, res, function (result) {
    return res.json({ message: result.message });
  });
}

export default {
  Login,
  Register,
  GetAll,
  GetOne,
  Update,
  Delete,
  CommonLogin,
};
