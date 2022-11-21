import Service from "./contact.service.js";

async function Contact(req, res, next) {
  await Service.Contact(req.body, res, function (result) {
    console.log(result);
    return res.json({ message: result.message, status: result.status });
  });
}

async function Query(req, res, next) {
  await Service.Query(req.body, res, function (result) {
    console.log(result);
    return res.json({ message: result.message, status: result.status });
  });
}

async function Feedback(req, res, next) {
  await Service.Feedback(req.body, res, function (result) {
    console.log(result);
    return res.json({ message: result.message, status: result.status });
  });
}

async function Complaint(req, res, next) {
  await Service.Complaint(req.body, res, function (result) {
    console.log(result);
    return res.json({ message: result.message, status: result.status });
  });
}

async function Allmessage(req, res, next) {
  await Service.Allmessage(req.body, res, function (result) {
    console.log(result);
    return res.json({ message: result.message, status: result.status });
  });
}
export default {
  Contact,
  Feedback,
  Query,
  Complaint,
  Allmessage,
};
