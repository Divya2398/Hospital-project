import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import "./Terms.css";
import { SERVER_URL } from "../../Globals";
import axios from "axios";
const Terms = () => {
  const [policy, setPolicy] = useState("");
  //Get Policy text
  useEffect(() => {
    axios
      .get(SERVER_URL + "api/appSettings/getAppSettings")
      .then((res) => {
        console.log(res.data.data);
        const data = res.data.data;
        // console.log("data", res.data.data[0].policy);
        setPolicy(res.data.data[0].policy);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div>
        <header className="privacy-header">
          <div className="privacy-overlay">
            <h1 className="privacy-title">Privacy Policy</h1>
          </div>
        </header>
      </div>
      <div className="container my-3">
        <div className="card privacy-card border-0">
          <p className="p-3 privacy-text">{policy}</p>
        </div>
      </div>
    </>
  );
};

export default Terms;
