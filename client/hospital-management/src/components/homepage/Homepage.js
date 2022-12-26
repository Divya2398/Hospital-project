import React, { useState, useEffect } from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import Navbar from "../navbar/Navbar";
import "./Home.css";
import axios from "axios";
import { SERVER_URL } from "../../Globals";
const { Header, Content, Footer } = Layout;
const Homepage = () => {
  const [appdata, setAppdata] = useState([]);
  useEffect(() => {
    axios
      .get(SERVER_URL + "api/appSettings/getAppSettings")
      .then((res) => {
        console.log(res.data.data[0]);
        setAppdata(res.data.data[0]);
        // const data = res.data.data;
        // console.log("data", res.data.data[0].policy);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <Layout>
        <Content
          style={{
            padding: "0 5px",
          }}
        >
          <div className="site-layout-content">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active img-pos">
                  <img
                    src="https://www.rkhospitals.org/wp-content/uploads/2018/01/slider.jpg"
                    className="d-block w-100"
                    alt="slide1"
                  />
                  <div className="text-pos px-3 py-1 rounded-pill">
                    <p className="d-inline me-2 text-white border-white">
                      Contact :
                      <span className="phn">{appdata.mobilenumber}</span>
                    </p>
                    <p className=" border border-3 d-inline border-white"></p>

                    <p className="d-inline ms-2 text-white">
                      Emergency :
                      <span className="phn">{appdata.emergency_number}</span>
                    </p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src="https://www.seslhd.health.nsw.gov.au/sites/default/files/2018-08/DSC_7591.jpg"
                    className="d-block w-100"
                    height={375}
                    alt="slider2"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="http://www.seslhd.health.nsw.gov.au/sites/default/files/2018-08/sgh_theatre.jpg"
                    className="d-block w-100"
                    height={375}
                    alt="slider3"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
};

export default Homepage;
