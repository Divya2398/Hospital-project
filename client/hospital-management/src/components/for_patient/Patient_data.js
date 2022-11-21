import React, { useEffect, useRef, useState } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { SERVER_URL } from "../../Globals";
import decode from "jwt-decode";
import { Typography } from "antd";
import {
  SearchOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, Form } from "antd";
import "./patient.css";
const { Title } = Typography;

const Patient = () => {
  //form-layout
  const responsive_layout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 10 },
      md: { span: 8 },
      lg: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
      md: { span: 16 },
      lg: { span: 16 },
    },
  };

  //profile-update integration

  let token = localStorage.getItem("token");
  let decoder = decode(token);
  console.log("decode token", decoder);
  console.log(token);
  console.log("decode", decoder);
  // console.log("deco", decoder.userData.patient_id);
  console.log("deco", decoder.patient_id);

  const [patientId, setPatientId] = useState(decoder.patient_id);
  const [FirstName, setFirstName] = useState(decoder.first_name);
  const [mobileNumber, setMobileNumber] = useState(
    decoder.mobile_number
  );
  const [gender, setGender] = useState(decoder.gender);
  const [email, setEmail] = useState(decoder.email);
  const [updatemode, setUpdatemode] = useState(false);

  const edit = () => {
    if (updatemode === true) {
      setUpdatemode(false);
    } else {
      setUpdatemode(true);
    }
  };
  const updateprofile = async () => {
    // let data = {
    //   mobile_number: mobileNumber,
    //   email: email,
    // };
    // console.log ('data', data)
    axios
      .put(
        SERVER_URL + `api/user/edit?patient_id=${decoder.patient_id}`,
        { mobile_number: mobileNumber, email: email }
      )
      .then((res) => {
        console.log("result", res);
      });
    setUpdatemode(false);
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  //dummy data

  const data = [
    {
      date: "2/2/2022",
      appointment_id: "12334545",
      specialist_name: "Dr.Sharan",
      department_name: "Cardiology",
    },
    {
      date: "2/2/2022",
      appointment_id: "12334545",
      specialist_name: "Dr.Sharan",
      department_name: "Cardiology",
    },
  ];

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps("date"),
    },
    {
      title: "Appointment Id",
      dataIndex: "appointment_id",
      key: "appointment_id",
      ...getColumnSearchProps("appointment_id"),
    },

    {
      title: "Doctor Name",
      dataIndex: "specialist_name",
      key: "specialist_name",
      ...getColumnSearchProps("specialist_name"),
    },
    {
      title: "Department",
      dataIndex: "department_name",
      key: "department_name",
      ...getColumnSearchProps("department_name"),
    },
    {
      title: "Your Report",
      dataIndex: "",
      width: "15%",
      fixed: "right",
      key: "x",
      render: (data) => (
        <>
          <Button onClick={() => {}}>Your Report</Button>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      width: "15%",
      fixed: "right",
      key: "x",
      render: (data) => (
        <>
          <Button onClick={() => {}}>Book Appointment</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div className="row">
        <div className="paitent-sidebar">
          <div>
            <button
              class="btn rounded-pill text-white btn side-button py-0 px-2 mt-3 mb-3 ms-1"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              Click here To See Your Profile
              <i class="fa-solid fa-angles-right"></i>
            </button>
            <div
              class="offcanvas offcanvas-start"
              tabIndex="-1"
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div class="offcanvas-header">
                <h5
                  class="offcanvas-title text-white mx-auto"
                  id="offcanvasExampleLabel"
                >
                  Your Profile
                </h5>
                <button
                  type="button"
                  class="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div class="offcanvas-body p-0">
                <div className="detail-card">
                  <div className="d-flex justify-content-end card-edit">
                    {!updatemode ? (
                      <button className="pa-profile-btn" onClick={() => edit()}>
                        Edit
                      </button>
                    ) : (
                      <button className="pa-profile-btn" onClick={() => edit()}>
                        Back
                      </button>
                    )}
                  </div>
                  <div className="p-4 edit-body">
                    <div>
                      {updatemode ? (
                        <div className="row">
                          <label
                            for="patient_id"
                            class="profile-lable col-3 align-self-end"
                          >
                            PatientId
                          </label>
                          <div className="col-9 ">
                            <input
                              type="text"
                              id="patient_id"
                              value={patientId}
                              className="patient-input-disable form-control form-control mb-2 rounded-0"
                              disabled
                            />
                          </div>
                        </div>
                      ) : (
                        <p>PatientId : {patientId}</p>
                        // <p>PatientId</p>
                      )}
                    </div>
                    {updatemode ? (
                      <div className="row">
                        <label
                          for="name"
                          class="profile-lable col-3 align-self-end"
                        >
                          Name
                        </label>
                        <div className="col-9">
                          <input
                            type="text"
                            value={FirstName}
                            className="patient-input-disable form-control form-control mb-2 rounded-0"
                            disabled
                          />
                        </div>
                      </div>
                    ) : (
                      <p>
                        {/* name */}
                        Name : {decoder.first_name}&nbsp;
                        {decoder.last_name}
                      </p>
                    )}
                    <div>
                      {updatemode ? (
                        <div className="row">
                          <label
                            for="mobile"
                            class="profile-lable col-3 align-self-end"
                          >
                            Mobile
                          </label>
                          <div className="col-9 ">
                            <input
                              type="text"
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                              className="patient-input form-control form-control mb-2 rounded-0"
                            />
                          </div>
                        </div>
                      ) : (
                        // <p>Mobile</p>
                        <p>Mobile : {mobileNumber}</p>
                      )}
                    </div>
                    <div>
                      {updatemode ? (
                        <div className="row">
                          <label
                            for="gender"
                            class="profile-lable col-3 align-self-end"
                          >
                            Gender
                          </label>
                          <div className="col-9 ">
                            <input
                              type="text"
                              value={gender}
                              className="patient-input-disable form-control form-control mb-2 rounded-0"
                              disabled
                            />
                          </div>
                        </div>
                      ) : (
                        <p>Gender : {decoder.gender}</p>
                        // <p>Gender</p>
                      )}
                    </div>
                    <div>
                      {updatemode ? (
                        <div className="row">
                          <label
                            for="email"
                            class="profile-lable col-3 align-self-end"
                          >
                            Email
                          </label>
                          <div className="col-9 ">
                            <input
                              type="text"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="patient-input form-control form-control mt-3 mb-2 rounded-0"
                            />
                          </div>
                        </div>
                      ) : (
                        <p>Email : {decoder.email}</p>
                        // <p>Email</p>
                      )}
                    </div>
                    <div>
                      {updatemode ? (
                        <div className="d-flex justify-content-end">
                          <button
                            className="profile-edit-btn btn my-3 mx-auto"
                            onClick={() => updateprofile()}
                          >
                            Update Profile
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className="patient-haeder">
        <p>
          ” Our Mission Is To Bring Healthcare Of International Standards Within
          The Reach Of Every Individual.”
        </p>
        <p>For New Appointment, click below</p>
        <button className="btn new-app-btn">Book New Appointment</button>
      </header>

      <div className="container-fluid mt-4 px-4 pat-table">
        <Title level={3} style={{ textAlign: "center" }} className="mb-4">
          YOUR APPOINTMENT HISTORY
        </Title>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{
            x: 1300,
          }}
        />
      </div>
    </>
  );
};

export default Patient;
