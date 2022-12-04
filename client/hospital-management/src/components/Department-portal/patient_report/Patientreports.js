import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { SERVER_URL } from "../../../Globals";
import moment, { relativeTimeRounding } from "moment";
import "./patientreport.css";
import axios from "axios";
const Patientreports = () => {
  const location = useLocation();
  const [nodata, setNodata] = useState(false);
  const [state, setState] = useState({ data: [] });
  console.log(location.state.data, " useLocation Hook");

  // state from previous component
  const detail = location.state.data;

  //age calculation
  let date = detail.data.dob;

  let format = moment(date).format("YYYY-MM-DD");
  let diff = moment(format).diff(moment(), "milliseconds");
  let duration = moment.duration(diff);
  let age = Math.abs(duration._data.years);
  // console.log(duration, "age date");
  // console.log(Math.abs(duration._data.years), "age date");

  //show report

  useEffect(() => {
    axios
      .get(
        SERVER_URL +
          `api/reports/get-patient-Report?department_id=${detail.department_id}&patient_id=${detail.patient_id}&doctor_id=${detail.doctor_id}`
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
  }, [detail]);
  console.log("state--", state);
  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card title="Report history" bordered={false} className="report-title">
          <div>
            <div className="d-flex justify-content-around div-detail">
              <p className="m-0">Patient Id : {detail.patient_id}</p>
              <p className="m-0">
                Name : {detail.data.first_name + " " + detail.data.last_name}
              </p>
              <p className="m-0">Age :{age}</p>
              <p className="m-0">Gender : {detail.data.gender}</p>
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
                        <p>Date : {moment(key.date).format("DD/MM/YYYY")}</p>
                      </div>
                      <div>
                        <p className="m-1 review-txt">Consultation Review</p>
                        <p className="review-msg m-1">{key.message}</p>
                      </div>
                      <div>
                        <p className="m-1 review-txt">Perscription</p>
                        <p className="m-1 review-msg">{key.prescription}</p>
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

export default Patientreports;

{
  /* <Card className="my-3">
<div className="report-date mb-3">
  <p>Date : 20.11.2022</p>
</div>
<div>
  <p className="m-1 review-txt">Consulation Review</p>
  <p className="review-msg">message message</p>
</div>
<div>
  <p className="m-1 review-txt">perscription</p>
  <p>tablet 50 mg</p>
</div>
</Card> */
}
