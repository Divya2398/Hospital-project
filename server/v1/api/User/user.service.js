import userSchema from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import decode from "jwt-decode";
import fast2sms from "fast-two-sms";

dotenv.config();
// const twillo = require('twilio')(process.env.account_Sid, process.env.auth_Token)
import twilio from "twilio";
// import { AwsInstance } from 'twilio/lib/rest/accounts/v1/credential/aws.js';
twilio(process.env.account_Sid, process.env.auth_Token);

const account_Sid = process.env.account_Sid;
const auth_Token = process.env.auth_Token;
const userTwilio = new twilio(account_Sid, auth_Token);

async function register(req, res, next) {
  try {
    let number = req.mobile_number;
    let numberDetails = await userSchema.findOne({ mobile_number: number });
    if (numberDetails) {
      return res.json({
        status: "failed",
        message: "mobile number already exists or already registered",
      });
    }

    let userdata = new userSchema(req);
    let option = {
      authorization:
        "5dVudnsKWUYgeAe7RT9lfEU6YsFk4pCWLJXDW5tqh4EvB45ivDNtXOHUX6Up",
      message: "your otp code for login is 45454",
      numbers: ["7339080287"],
    };

    // async function smsSend(option) {
    //   const response = await fast2sms.sendMessage(option);
    //   console.log(response);
    // }
    fast2sms
      .sendMessage(option)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // let password = req.password;
    // if (password) {
    //   let salt = await bcrypt.genSalt(10);
    //   userdata.password = bcrypt.hashSync(password, salt);
    // }

    // let data = await userdata.save();
    // return res
    //   .status(200)
    //   .json({ status: "success", message: "register successed", result: data });
  } catch (error) {
    return res.json({ status: "error found", message: error.message });
  }
}

async function loginWithOutPassword(req, res, next) {
  try {
    const patientId = req.patient_id;
    let user = await userSchema.findOne({ patient_id: patientId });

    if (!user) {
      return res.json({ status: "failed", message: "user not found" });
    } else {
      const token = jwt.sign({ user }, "key");
      console.log("token", token);
      res
        .status(200)
        .json({ status: "success", message: "login success!", token: token });
    }
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
}

async function login(req, res, next) {
  try {
    const patientId = req.patient_id;
    const password = req.password;

    let user = await userSchema.findOne({ patient_id: patientId });

    if (patientId) {
      let patient = await userSchema.findOne({ patient_id: patientId });
      if (!patient) {
        return res.json({ status: "failed", message: "user not found" });
      }
    } else {
      return res.json({
        status: "failed",
        message: "enter the correct id or password",
      });
    }

    if (user) {
      let isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const userData = user.toObject();
        const token = jwt.sign({ userData }, "key", { expiresIn: "24h" });
        // console.log('token',token);
        res.status(200).json({
          status: "success",
          message: "login success!",
          result: user,
          token: token,
        });
      } else {
        res.json({ status: "failed", message: "wrong id or password" });
      }
    } else {
      res.json({ status: "failed", message: "error found" });
    }
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
}

// async function Decode(req, res, next){
//   try{
//      let token = req.query
//      let decoder = decode(token)
//      return res.json({'status': 'success', 'result':decoder})
//   }catch(error) {
//     return res.json({status:'failed', message:error.message})
// }
// }

async function Update(req, res) {
  console.log("res", req);
  try {
    const patientId = req.query.patient_id;

    let updated = await userSchema.findOneAndUpdate(
      { patient_id: patientId },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.json({ status: "failed", message: "something went wrong" });
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

// user login

async function OTP(req, res, next) {
  try {
    function generateOTP() {
      var digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
    }
    const number = req.query.mobile_number;
    let user = await userSchema.findOneAndUpdate(
      { mobile_number: number },
      { otp: generateOTP() },
      { new: true }
    );

    if (user) {
      let data = twilio.message.create({
        from: "",
        to: number,
        body: "otp:" + generateOTP,
      });
      if (data) {
        console.log("otp sent successfully");
      } else {
        console.log("failed");
      }
      res.status(200).json({ status: "success", message: "otp sended" });
    }
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
}

async function userlogin(req, res, next) {
  try {
    const number = req.mobile_number;
    const otp = req.otp;
    let user = await userSchema.findOne(
      { mobile_number: number } && { otp: otp }
    );

    if (!user) {
      return res.json({ status: "failed", message: "user not found" });
    } else {
      const token = jwt.sign({ user }, "key");
      console.log("token", token);
      res
        .status(200)
        .json({ status: "success", message: "login success!", token: token });
    }
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
}

export default {
  register,
  login,
  userlogin,
  OTP,
  Update,
};
