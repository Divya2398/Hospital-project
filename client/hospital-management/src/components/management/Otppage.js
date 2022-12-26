import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react18-input-otp";
import Navbar from "../navbar/Navbar";
import "./management.css";
import axios from "axios";
import { SERVER_URL } from "../../Globals";
import { Button, Input, Space, Table, Form, message } from "antd";
const Otppage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [getotp, setGetotp] = useState("");
  const location = useLocation();
  //   console.log("loc", location.state);
  const mobile_number = location.state.number;
  // let getotp = "";
  const sendotp = async () => {
    axios
      .post(SERVER_URL + `api/user/otp/${mobile_number}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data.status === "success") {
          setTimeout(() => {
            message.success(res.data.message);
          }, 1000);
          getotp(res.data.data);
        } else {
          setTimeout(() => {
            message.error(res.data.message);
          }, 1000);
          navigate("/for-patient");
        }
      })
      .catch((error) => {
        console.log("err", error);
        setTimeout(() => {
          message.error(error.response.data.message);
        }, 500);
        setTimeout(() => {
          navigate("/for-patient");
        }, 2000);
      });
  };
  useEffect(() => {
    sendotp();
  }, []);

  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };
  const verifyotp = () => {
    if (otp === getotp) {
      console.log("true");
    } else {
      console.log("false");
    }
  };

  const resendotp = async () => {
    sendotp();
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="card w-50 mx-auto my-5">
          <div className="card-header bg-warning text-center">
            <h5 className="text-white invisible"> OTP VERIFICATION</h5>
            {/* invisible */}
          </div>
          <div className="card-body">
            <p className="otp-text">
              Make sure you have given a correct mobile number , Enter your 4
              digit otp below
            </p>
            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={4}
              inputStyle="otp-input"
              containerStyle="otp-container"
              focusStyle="otp-focus"
              separator={<span>&nbsp;-&nbsp;</span>}
              isInputNum={true}
              shouldAutoFocus={true}
            />
            <button
              className="btn btn-warning py-1 mt-4 mx-3"
              onClick={verifyotp}
            >
              Verify Otp
            </button>
            <button className="btn btn-warning py-1 mt-4">Resend Otp</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otppage;
