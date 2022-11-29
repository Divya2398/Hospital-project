import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Select,
  Modal,
  Typography,
  Form,
  DatePicker,
  Space,
} from "antd";
import "./Doctor.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../Globals";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";
import jwt_decode from "jwt-decode";
// import weekday from "dayjs/plugin/weekday";

const { Title } = Typography;
const { Option } = Select;

const items = [];

const Doctorlist = () => {
  //set doctor detail
  const [doctor_name, setDoctor_name] = useState("");
  const [doctor_id, setDoctor_id] = useState("");
  const [department_id, setDepartment_id] = useState("");
  const [department_name, setDepartment_name] = useState("");

  const [requested_date, setRequested_date] = useState("");
  const token = localStorage.getItem("token");

  //let decode = jwt_decode(token);
  // console.log("token", token);

  const [day, setDay] = useState([]);
  const [form] = Form.useForm();
  const [selectedDay, setSelectedDay] = useState("");
  dayjs.extend(customParseFormat);
  // moment(current).day() != selectedDay
  //disable date
  const disabledDate = (current) => {
    // const diasble = [(day != 0 && day != 3)];
    // Can not select days before today and today
    //   disable += `
    //   ||(${moment(current).day() === d})`;
    // }
    // console.log("selected", selectedDay);
    return current && current < dayjs().endOf("day");
  };
  const [isselecting, setIsSelecting] = useState(false);
  const [selectdetail, setSelectdetail] = useState({
    data: [],
  });

  const [details, setDetails] = useState({});
  const [department, setDepartment] = useState({
    id: "",
  });

  const [specialistData, setSpecialistData] = useState({
    data: "",
  });

  // const [showSlotData, setShowSlotDay] = useState({
  //   data: [],
  // });
  const navigate = useNavigate();

  const [state, setState] = useState({
    data: [],
  });

  const [depName, setDepName] = useState({
    name: "",
  });

  const [availableDay, setAvailableDay] = useState({
    day: [],
  });

  const [availableSlot, setAvailableSlot] = useState({
    data: "",
  });

  const [listSlot, setListSlot] = useState({
    data: [],
  });

  const [open, setOpen] = useState(false);

  const handleChange = (value) => {
    // this.setState({selectValue:e.target.value});
    console.log(value._d);
    let reqdate = value._d;
    setRequested_date(reqdate);
    // setAvailableSlot({
    //   data: value,
    // });

    // console.log("value", value);
  };
  console.log("Requested_date", requested_date);
  useEffect(() => {
    axios.get(SERVER_URL + "api/departements/getAllDepartments").then((res) => {
      console.log(res.data.data);
      setState({
        data: res.data.data,
      });
    });

    console.log("department_name", department.id);
    axios
      .get(SERVER_URL + "api/specialist/getspecialistByDepId", {
        params: { department_id: department.id },
      })
      .then((res) => {
        console.log("dep", res.data.result);
        console.log(res.data.result[0].specialist_id);
        setSelectdetail({
          data: res.data.result,
        });

        setSpecialistData({
          data: res.data.result[0].specialist_id,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .get(SERVER_URL + "api/specialistDaySlot/getDataSlotDay", {
    //     params: {
    //       department_id: department.id,
    //       specialist_id: specialistData.data,
    //     },
    //   })
    //   .then((res) => {
    //     console.log("specialist_data", res.data.data);
    //     setShowSlotDay({
    //       data: res.data.data,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // axios
    //   .get(SERVER_URL + "api/specialistDaySlot/getAvailableSlot", {
    //     params: {
    //       specialist_id: details.specialist_id,
    //       department_id: details.department_id,
    //       available_day: availableSlot.data,
    //     },
    //   })
    //   .then((res) => {
    //     console.log("available_sloteeeeeee", res.data.data[0].available_slot);
    //     setListSlot({
    //       data: res.data.data[0].available_slot,
    //     });
    //   });

    // axios
    //   .get(SERVER_URL + "api/specialistDaySlot/getAvailableDay", {
    //     params: {
    //       specialist_id: details.specialist_id,
    //       department_id: details.department_id,
    //     },
    //   })
    //   .then((res) => {
    //     console.log("available_dayyyy", res.data.data);

    //     setAvailableDay({
    //       data: res.data.data,
    //     });
    //   });
  }, [department.id, specialistData.data, details]);

  // console.log("selectdetail", selectdetail)

  const getData = (selectedData) => {
    console.log(selectedData);
    setDepartment({
      id: selectedData,
    });

    axios
      .get(SERVER_URL + "api/departements/getSingleDepartment", {
        params: { department_id: selectedData },
      })
      .then((res) => {
        console.log("departNameeeeee", res.data.data.department_name);
        setDepName({
          name: res.data.data.department_name,
        });
      });
  };

  //slot data
  const selectdata = (data) => {
    console.log("data", data);
    setDepartment_id(data.department_id);
    setDepartment_name(data.department_name);
    setDoctor_id(data.specialist_id);
    setDoctor_name(data.specialist_name);

    // console.log(doctor_id, dep_id);

    // setDetails({
    //   ...details,
    //   specialist_id: doctor_id,
    //   department_id: dep_id,
    // })

    // console.log("detailsssss", details);
    setIsSelecting(true);
    setOpen(true);
  };

  //
  const resetSelect = () => {
    setIsSelecting(false);
  };

  // const selectSlot = (data) => {
  //   console.log("data", data);
  // };

  const handleSubmit = () => {
    let decode = jwt_decode(token);

    const values = {
      department_id: department_id,
      department_name: department_name,
      doctor_id: doctor_id,
      doctor_name: doctor_name,
      patient_id: decode.patient_id,
      patient_name: decode.patient_name,
      requested_date: requested_date,
    };
    axios
      .post(SERVER_URL + "/api/appointment/request-appointment", values)
      .then((res) => {
        console.log(res);
      });

    // setIsSelecting(false);
  };

  // console.log("detailss", details);
  // form layout
  const responsive_layout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
      lg: { span: 12 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
      lg: { span: 12 },
    },
  };
  return (
    <>
      <Navbar></Navbar>
      <div>
        <button
          class="btn rounded-pill text-white btn side-button py-0 px-2 mt-3 ms-1"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          Departments
          <i class="fa-solid fa-angles-right"></i>
        </button>
        <div className="doctor-offcanvas">
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
                Department
              </h5>
              <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body p-0">
              <nav className="navbar py-0">
                <ul className="navbar-nav side-nav flex-fill">
                  <li className="nav-item w-100">
                    {state.data.map((det, key) => {
                      return (
                        <button
                          className="nav-link w-100 btn rounded-0 border-bottom text-white side-link"
                          onClick={() => getData(det.department_id)}
                          value={det.department_id}
                        >
                          {det.department_name}
                        </button>

                        // <Button value={det.department_name} onClick={()=>getData(det.department_name)}>{det.department_name }</Button>

                        // <ul class="nav justify-content-end">
                        //   <li class="nav-item">
                        //     {/* <a class="nav-link active"  key={key} href={det.department_name} onClick={onLinkClick}>{det.department_name}</a> */}
                        //     <Link to={"/"+det.department_name}>{det.department_name}</Link>
                        //   </li>
                        // </ul>
                      );
                    })}
                  </li>
                  {/* <li className="nav-item">
                    <button className="nav-link w-100 btn rounded-0 border-bottom text-white side-link">
                      Department2
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link w-100 btn rounded-0 border-bottom text-white side-link">
                      Department3
                    </button>
                  </li>
                  <li className="nav-item w-100">
                    <button className="nav-link w-100 btn rounded-0 border-bottom text-white side-link">
                      Department4
                    </button>
                  </li> */}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid  my-2">
        <div className="row row-cols-lg-3 row-cols-xxl-4 row-cols-md-2 row-cols-1 gy-3 gx-xl-5 gx-3">
          {selectdetail.data.map((obj) => {
            return (
              <div className="col">
                <div className="card doctor-card">
                  <div className="doctor-img1">
                    <div className=""></div>
                  </div>
                  <div className="doctor-img2">
                    <img
                      className=""
                      src={SERVER_URL + "uploads/specialist/" + obj.image}
                    />
                  </div>
                  <div>
                    <div class="card-body main-text">
                      <p class="card-title doctor-name text-center">
                        {obj.specialist_name}
                      </p>
                      <p className="doc-edu text-muted text-center mb-2">
                        {obj.education}
                      </p>
                      <div className="d-flex doctor-exp text-uppercase justify-content-between mx-3">
                        <p class="card-text ">{obj.specialisation}</p>
                        <p class="card-text ">{obj.experience} EXP</p>
                      </div>
                      <p class="card-text doctor-avl mx-1 mb-2">
                        Department : {obj.department_name}
                      </p>
                      <div>
                        <p class="card-text doctor-avl mb-2">
                          <span className="span mx-1">Available on</span>&nbsp;:
                          {obj.available_day.map((obj) => {
                            return <span key={obj}>{obj} &nbsp;</span>;
                          })}
                        </p>
                        <p class="card-text doctor-time mb-3 mx-1">
                          <span className="span">Timing</span>
                          &nbsp;<i class="fa-regular fa-clock"></i> :{obj.time}
                          &nbsp;
                        </p>
                      </div>
                      <div className="text-center mb-1">
                        <button
                          className="btn book-btn px-1 py-1 text-center"
                          // key={index}
                          onClick={() => {
                            // selectdata(obj.specialist_id);
                            selectdata(obj);
                            setDay(obj.available_day);
                          }}
                        >
                          Request Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <Modal
          title="Select Your Appointment date"
          visible={isselecting}
          okText="Proceed For Payment"
          onCancel={() => {
            resetSelect();
          }}
          onOk={() => {
            resetSelect();
            handleSubmit();
          }}
          className="modal-app"
        >
          <div>
            <Form {...responsive_layout}>
              <p>
                Selected Doctor is available on&nbsp;
                {day.map((data) => {
                  return (
                    <span key={data} className="text-success">
                      {data} , &nbsp;
                    </span>
                  );
                })}
              </p>
              {/* <Form.Item
                name="available_day"
                label="Choose Day for Appointment"
                rules={[{ required: true, message: "Select day" }]}
              >
                <Select
                  placeholder="Select a option below"
                  allowClear
                  onChange={handleChange}
                >
                  {day.map((data, index) => {
                    return (
                      <Option value={data} key={index}>
                        {data}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item> */}
              <Form.Item
                name="available_day"
                label="Choose date for Appointment"
                // rules={[{ required: true, message: "Select day" }]}
              >
                <DatePicker
                  picker="date"
                  disabledDate={disabledDate}
                  onChange={handleChange}
                  format="YYYY/MM/DD"
                />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>

      <div class="container mt-5 mb-5">
        {/* <div class="d-flex justify-content-between mb-3"> <span>Doctors</span> <button class="btn btn-success add">Add Doctors</button> </div> */}
        {/* <div class="row g-2">
          {selectdetail.data.map((obj) => {
            console.log("obj", selectdetail.data);
            return (
              <div class="col-md-3">
                <div class="card p-2 py-3 text-center">
                  <div class="img mb-2">
                    {" "}
                    <img
                      src={SERVER_URL + "uploads/specialist/" + obj.image}
                      width="70"
                      class="rounded-circle"
                    />{" "}
                  </div>
                  <h5 class="mb-0">{obj.specialist_name}</h5>
                  <small>{depName.name}</small>
                  <div class="ratings mt-2">
                    {" "}
                    <i class="fa fa-star"></i> <i class="fa fa-star"></i>{" "}
                    <i class="fa fa-star"></i> <i class="fa fa-star"></i>{" "}
                  </div>
                  <div class="mt-4 apointment">
                    {" "}
                    <button
                      class="btn btn-success text-uppercase"
                      onClick={() => {
                        selectdata(obj.specialist_id, obj.department_id);
                        // selectdata();
                      }}
                    >
                      Book Appointment
                    </button>{" "}
                  </div>
                </div>
              </div>
            );
          })}

          <div>
            <Modal
              title="Select Your Slot"
              visible={isselecting}
              // onOk={(values) => {
              //   navigate("./payment");
              //   console.log("values", values)
              //   resetSelect();
              // }}

              onCancel={() => {
                resetSelect();
              }}
              footer={null}
              className="modal-app"
            >
              <div>
                <Form
                  {...responsive_layout}
                  form={form}
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    name="available_day"
                    label="Choose Day for Appointment"
                    // rules={[{ required: true, message: "Select day" }]}
                  >
                    <Select
                      placeholder="Select a option below"
                      allowClear
                      onChange={handleChange}
                    >
                      {console.log("availableday.dayeeee", availableDay.data)}
                      {availableDay.data?.map((data, index) => {
                        return (
                          <Option value={data.available_day} key={index}>
                            {data.available_day}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="available_slot"
                    label="Choose Slot Time"
                    // rules={[
                    //   { required: true, message: "Select consultation time" },
                    // ]}
                  >
                    <Select placeholder="Select a option below" allowClear>
                      {listSlot.data?.map((det, index) => {
                        return (
                          <Option value={det} key={index}>
                            {det}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <Button htmlType="submit">Submit</Button>
                  </Form.Item>
                </Form>
              </div>
            </Modal>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Doctorlist;
