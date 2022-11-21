import React from "react";
import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./patientreport.css";
const Patientreports = () => {
  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card title="Report history" bordered={false} className="report-title">
          <div>
            <div className="d-flex justify-content-around div-detail">
              <p className="m-0">Patient Id : 12345</p>
              <p className="m-0">Name : firstname + lastname</p>
              <p className="m-0">Age : 36</p>
              <p className="m-0">Gender : female</p>
            </div>
            <div>
              <Card className="my-3">
                <div className="report-date mb-3">
                  <p>Date : 23.11.2022</p>
                </div>
                <div>
                  <p className="m-1 review-txt">Consulation Review</p>
                  <p className="review-msg">message message</p>
                </div>
                <div>
                  <p className="m-1 review-txt">perscription</p>
                  <p>tablet 50 mg</p>
                </div>
              </Card>
              <Card className="my-3">
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
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Patientreports;
