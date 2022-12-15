import adminSchema from "./admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userSchema from "../User/user.model.js";
import departmentSchema from "../Departments/department.model.js";

async function Register(req, res) {
  // console.log('email', req)
  try {
    let email = req.email_id;
    let emailDetails = await adminSchema.findOne({ email_id: email }).exec();
    if (emailDetails) {
      return res.json({ status: "failed", message: "Email already exists" });
    }
    let Details = new adminSchema(req);
    if (req.password) {
      let password = req.password;
      const salt = await bcrypt.genSalt(10);
      Details.password = bcrypt.hashSync(password, salt);
    }
    const result = await Details.save();
    return res.status(200).json({
      status: "success",
      message: "register successed",
      result: result,
    });
  } catch (error) {
    return res.json({ status: "error found", message: error.message });
  }
}

async function Login(req, res) {
  try {
    const email = req.email_id;
    const password = req.password;
    let admin = await adminSchema.findOne({ email_id: email });
    if (!admin) {
      res.json({ status: "failed", message: "! invaild user register first" });
    } else {
      bcrypt.compare(password, result.password, (err, data) => {
        if (err) {
          return res.json({ error: err.message });
        }
        if (data) {
          console.log(result);
          const token = jwt.sign({ result }, "key");
          console.log("token", token);
          res.status(200).json({
            status: "success",
            message: "login success!",
            token: token,
          });
        }
      });
    }
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
}

async function CommonLogin(req, res) {
  try {
    const id = req.id;
    let password = req.password;
    console.log("password", password);
    console.log("id", id);
    if (id.startsWith("PA")) {
      const patient = await userSchema.findOne({ patient_id: id });
      console.log(patient);

      if (!patient) {
        res.json({
          status: "no such existing patient , new user register first",
        });
      } else {
        console.log("password", password);
        console.log("pass", patient.password);
        let ismatch = await bcrypt.compare(password, patient.password);
        console.log("match", ismatch);
        if (ismatch) {
          const payload = {
            patient_id: patient.patient_id,
            first_name: patient.first_name,
            last_name: patient.last_name,
            dob: patient.dob,
            gender: patient.gender,
            last_name: patient.last_name,
            email: patient.email,
            role: patient.role,
            mobile_number: patient.mobile_number,
          };
          const token = jwt.sign(payload, "secret key");
          return res.status(200).json({
            status: "success",
            message: "Logged in successfully",
            data: token,
          });
        } else {
          return res.status(200).json({
            status: "failure",
            message: "password doesn't match",
          });
        }
      }
    } else if (id.startsWith("Admin")) {
      const admin = await adminSchema.findOne({ admin_id: id });
      console.log(admin);
      if (!admin) {
        res.json({
          status: "wrong admin id ,enter correct credential",
        });
      } else {
        let ismatch = await bcrypt.compare(password, admin.password);
        if (ismatch) {
          const payload = {
            admin_id: admin.admin_id,
            email: admin.email_id,
            role: admin.role,
          };
          const token = jwt.sign(payload, "secret key admin");
          return res.status(200).json({
            status: "success",
            message: "Logged in as admin successfully",
            data: token,
          });
        } else {
          return res.status(200).json({
            status: "failure",
            message: "password doesn't match",
          });
        }
      }
    } else if (id.startsWith("DEP")) {
      const dept = await departmentSchema.findOne({ department_id: req.id });
      if (!dept) {
        res.json({
          status: "wrong credential or no such department",
        });
      } else {
        let ismatch = bcrypt.compare(password, dept.password);
        if (ismatch) {
          const payload = {
            department_id: dept.department_id,
            department_name: dept.department_name,
            department_image: dept.department_image,
            role: dept.role,
          };
          const token = jwt.sign(payload, "secret key dept");
          return res.status(200).json({
            status: "success",
            message: "Logged in",
            data: token,
          });
        } else {
          return res.status(200).json({
            status: "failure",
            message: "password doesn't match",
          });
        }
      }
    } else {
      res.json({ status: "failure", message: "wrong credentials, check id" });
    }
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
}

async function GetAll(req, res) {
  try {
    const data = await adminSchema.find().exec();
    if (data) {
      return res
        .status(200)
        .json({ status: "success", message: "data found", result: data });
    } else {
      return res
        .status(400)
        .json({ status: "failed", message: "data not found" });
    }
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
}

async function GetOne(req, res) {
  try {
    const data = await adminSchema.findOne({ email_id: req.email_id });
    if (data) {
      return res
        .status(200)
        .json({ status: "success", message: "data found", result: data });
    } else {
      return res
        .status(400)
        .json({ status: "failed", message: "data not found" });
    }
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
}

async function Update(req, res) {
  try {
    const emailId = req.query.email_id;
    let updated = await adminSchema.findOneAndUpdate(
      { email_id: emailId },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.json({ status: "failed", message: "invalid email Id" });
    } else {
      return res.json({
        status: "Success",
        message: "data updated",
        result: updated,
      });
    }
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
}

async function Delete(req, res) {
  try {
    const emailId = req.email_id;
    let deleted = await adminSchema.findOneAndDelete({ email_id: emailId });
    if (!deleted) {
      return res.json({ status: "failed", message: "invaild email Id" });
    } else {
      return res.json({ status: "success", message: "data deleted" });
    }
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
}

export default {
  CommonLogin,
  Login,
  Register,
  GetAll,
  GetOne,
  Update,
  Delete,
};
