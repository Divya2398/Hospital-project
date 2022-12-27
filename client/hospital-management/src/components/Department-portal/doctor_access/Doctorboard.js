import React from "react";
import { Input, Button, Form, Image, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/doctor/DoctorSlice";
import "./Doctorboard.css";
const { Title } = Typography;

const Doctorboard = () => {
  const dispatch = useDispatch();
  //logout
  const navigate = useNavigate();
  const handlelogout = () => {
    dispatch(logout());
    navigate("/doctor-login");
  };
  return (
    <>
      <div className="row">
        <div className="d-flex justify-content-end">
          <button className="btn logout-btn" onClick={handlelogout}>
            Logout&nbsp; <i class="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="d-flex justify-content-end me-3">
            <div className="card w-50">
              <div className="card-header board-card">
                <Title
                  level={5}
                  style={{ textAlign: "center" }}
                  className="my-1 board-title"
                >
                  Today Appointment
                </Title>
              </div>
              <Link to={"/today-appointment"} className="link-text">
                <div className="card-body board-text">
                  <p className="card-text text-center">
                    Click here to view today Appointment detail
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="d-flex justify-content-start ms-3">
            <div className="card w-50">
              <div className="card-header board-card">
                <Title
                  level={5}
                  style={{ textAlign: "center" }}
                  className="my-1 board-title"
                >
                  Patient Report
                </Title>
              </div>
              <Link to={"/patient-history"} className="link-text">
                <div className="card-body board-text ">
                  <p className="card-text text-center">
                    Click here to view patient report history
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctorboard;
