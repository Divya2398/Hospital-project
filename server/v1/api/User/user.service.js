import userSchema from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import decode from "jwt-decode";
import fast2sms from "fast-two-sms";
import twilio from "twilio";
dotenv.config();

// const usertwilio = require("twilio")(account_Sid, auth_Token);
// const twillo = require("twilio")(
//   "ACbc2e05acfab21e5823802a77fbd2568b",
//   "36ef697dac8ded88557c81028892fa0a"
// );
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

    let password = req.password;
    if (password) {
      let salt = await bcrypt.genSalt(10);
      userdata.password = bcrypt.hashSync(password, salt);
    }
    let data = await userdata.save();
    return res
      .status(200)
      .json({ status: "success", message: "register successed", result: data });
  } catch (error) {
    return res.json({ status: "error found", message: error.message });
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

async function OTP(req, res, next) {
  console.log("num", req.params.mobile_number);
  try {
    function generateOTP() {
      var digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
    }
    const number = req.params.mobile_number;
    if (number) {
      const account_Sid = process.env.account_Sid;
      const auth_Token = process.env.auth_Token;
      const userTwilio = new twilio(account_Sid, auth_Token);
      const getotp = generateOTP();
      let data = await userTwilio.messages.create({
        from: "+13868543166",
        to: `+91${number}`,
        body: "your otp for mobilenumber change request is:" + " " + getotp,
      });
      if (data) {
        console.log(data);
        console.log("otp sent successfully");
        res
          .status(200)
          .json({ status: "success", message: "Enter your otp", data: getotp });
      }
    } else {
      res.status(200).json({
        status: "failure",
        message:
          "something went wrong or please provide correct number to send otp",
      });
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

async function getuser(req, res, next) {
  // console.log(req.query.patient_id, "id");
  try {
    const id = req.query.patient_id;
    const user = await userSchema.findOne({ patient_id: id });
    if (!user) {
      return res.json({ status: "failed", message: "user not found" });
    } else {
      res.status(200).json({ status: "success", message: "user", data: user });
    }
  } catch (error) {
    return res.status(400).json({ status: "failed", message: error.message });
  }
}

async function getalluser(req, res, next) {
  try {
    const user = await userSchema.find().exec();
    if (!user) {
      return res.json({ status: "failed", message: "no patients yet" });
    } else {
      res.status(200).json({ status: "success", message: "user", data: user });
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
  getuser,
  getalluser,
};
