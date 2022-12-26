import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { SERVER_URL } from "../../Globals";
import { message } from "antd";
import moment from "moment";
import axios from "axios";
import Navbar from "../navbar/Navbar";

const ForPatientReport = () => {
  const location = useLocation();
  console.log(location.state.data, " useLocation Hook");
  const [nodata, setNodata] = useState(false);
  const [state, setState] = useState({ data: [] });
  const [patientdata, setPatientdata] = useState({});
  // state from previous component
  const detail = location.state.data;
  const patient_id = location.state.patientId;

  useEffect(() => {
    axios
      .get(
        SERVER_URL +
          `api/reports/get-patient-Report?department_id=${detail.department_id}&patient_id=${patient_id}&doctor_id=${detail.doctor_id}`
      )
      .then((res) => {
        if (res.data.status === "success") {
          // console.log(res.data.data, "state");
          setState({
            data: res.data.data,
          });
        } else if (res.data.status === "failure") {
          setNodata(true);
        }
      });

    const data = axios
      .get(SERVER_URL + `api/user/get-user?patient_id=${patient_id}`)
      .then((res) => {
        console.log("res", res.data.data);
        setPatientdata(res.data.data);
      })
      .catch((error) => {
        setTimeout(() => {
          message.error(error.message);
        }, 1000);
      });
  }, []);
  console.log("state--", state);
  //age calculation
  let date = patientdata.dob;
  let format = moment(date).format("YYYY-MM-DD");
  let diff = moment(format).diff(moment(), "milliseconds");
  let duration = moment.duration(diff);
  let age = Math.abs(duration._data.years);
  return (
    <>
      <Navbar />
      <div className="site-card-border-less-wrapper">
        <Card title="Report history" bordered={false} className="">
          <div>
            <div className="d-flex justify-content-around forpatient-report-title">
              <p className="m-0">Patient Id : {patientdata.patient_id}</p>
              <p className="m-0">
                Name : {patientdata.first_name + " " + patientdata.last_name}
              </p>
              <p className="m-0">Age :{age}</p>
              <p className="m-0">Gender : {patientdata.gender}</p>
            </div>
            <div>
              {nodata ? (
                <div className="w-100 my-5 d-flex justify-content-center">
                  <div>
                    <p className="empty my-0 ps-3">
                      <i className="fa-regular fa-file"></i>
                    </p>
                    <p className="my-0 no-data">No data</p>
                  </div>
                </div>
              ) : (
                state.data.map((key) => {
                  return (
                    <Card className="my-3">
                      <div className="report-date mb-3">
                        <p key={"date"}>
                          Date : {moment(key.date).format("DD/MM/YYYY")}
                        </p>
                      </div>
                      <div>
                        <p className="m-1 review-txt">Consultation Review</p>
                        <p className="review-msg m-1" key={"message"}>
                          {key.message}
                        </p>
                      </div>
                      <div>
                        <p className="m-1 review-txt">Perscription</p>
                        <p className="m-1 review-msg" key={"prescription"}>
                          {key.prescription}
                        </p>
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ForPatientReport;
