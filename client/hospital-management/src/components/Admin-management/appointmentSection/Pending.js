import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Form,
  Modal,
  Select,
  Divider,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import axios from "axios";
import { SERVER_URL } from "../../../Globals";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Pending = () => {
  dayjs.extend(customParseFormat);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editdetail, setEditdetail] = useState(null);
  const [conformdate, setConformdate] = useState("");
  const [state, setState] = useState({
    data: [],
  });
  // get appointments
  useEffect(() => {
    axios
      .get(SERVER_URL + "api/appointment/get-pending-appointment")
      .then((res) => {
        console.log(res.data.result);
        setState({
          data: res.data.result,
        });
      });
  }, []);

  const data = state.data;

  // conform appointment

  const editdata = (data) => {
    console.log("data", data);
    setIsEditing(true);
    setEditdetail({ ...data });
    //setConformdate(moment(data.requested_date).format("DD/MM/YYYY"));
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditdetail(null);
    setConformdate("");
  };
  const conform = () => {
    console.log("da", editdetail);
    console.log("conform");
    let appointment_id = editdetail.appointment_id;
    axios
      .put(
        SERVER_URL +
          `api/appointment/confirm-appointment?appointment_id=${appointment_id}`,
        {
          confirm_date: conformdate,
          mobile: editdetail.data.mobile_number,
          email: editdetail.data.email,
        }
      )
      .then((res) => {
        console.log(res);
      });
  };
  // on date change
  const onChangedate = (date) => {
    setConformdate(date);
  };

  //disable date
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };
  //search
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
  const columns = [
    {
      title: "Patient Id",
      dataIndex: "patient_id",
      key: "patient_id",
      ...getColumnSearchProps("patient_id"),
    },
    {
      title: "Patient Name",
      dataIndex: "data",
      key: "patient_name",
      //   width: "25%",
      ...getColumnSearchProps("patient_name"),
      render: (data) => {
        return data.first_name + " " + data.last_name;
      },
    },
    {
      title: "Phone Number",
      dataIndex: "data",
      key: "mobile_number",
      render: (data) => data.mobile_number,
    },
    {
      title: "Doctor Id",
      dataIndex: "doctor_id",
      key: "doctor_id",

      //   width: "20%",
      ...getColumnSearchProps("doctor_id"),
    },
    {
      title: "Doctor Name",
      dataIndex: "doctor_name",
      key: "doctor_name",
      //   width: "20%",
      ...getColumnSearchProps("doctor_name"),
    },
    {
      title: "Department Name",
      dataIndex: "department_name",
      key: "department_name",
      // width: "20%",
      ...getColumnSearchProps("department_name"),
    },
    {
      title: "Appointment Id",
      dataIndex: "appointment_id",
      key: "appointment_id",
      ...getColumnSearchProps("appointment_id"),
    },
    {
      title: "Requested Date",
      dataIndex: "requested_date",
      key: "requested_date",
      fixed: "right",
      ...getColumnSearchProps("requested_date"),
      render: (requested_date) => moment(requested_date).format("DD/MM/YYYY"),
    },
    {
      title: "Confrim Appointment",
      dataIndex: "",
      width: "10%",
      fixed: "right",
      key: "x",
      render: (data) => (
        <Button
          type="primary"
          onClick={() => {
            editdata(data);
          }}
        >
          Confirm
        </Button>
      ),
    },
    {
      title: "Deny",
      dataIndex: "",
      width: "10%",
      fixed: "right",
      key: "x",
      render: (data) => (
        <Button
          type="primary"
          onClick={() => {
            // show(data);
          }}
        >
          Deny
        </Button>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1800,
        }}
      />
      <div>
        <Modal
          title="Conform Appointment"
          open={isEditing}
          okText="Conform Appointment"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            {
              conform();
            }
            resetEditing();
          }}
        >
          <div>
            <form>
              <div className="mb-2">
                <label clas>Paitent Id</label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="first_name"
                  value={editdetail?.patient_id}
                  disabled
                />
              </div>
              <div className="mb-2">
                <label clas>Paitent First Name</label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="first_name"
                  value={editdetail?.data.first_name}
                  disabled
                />
              </div>
              <div className="mb-2">
                <label clas>Paitent Last Name</label>

                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="last_name"
                  value={editdetail?.data.last_name}
                  disabled
                />
              </div>
              <div className="mb-2">
                <label clas>Mobile Number</label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="first_name"
                  value={editdetail?.data.mobile_number}
                  disabled
                />
              </div>
              <div className="mb-2">
                <label clas>Specialist Name</label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="first_name"
                  value={editdetail?.doctor_name}
                  disabled
                />
              </div>
              <div className="mb-2">
                <label clas>Department Name</label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="first_name"
                  value={editdetail?.department_name}
                  disabled
                />
              </div>
              <div className="mb-2">
                <label clas>Requested date</label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  name="first_name"
                  value={moment(editdetail?.requested_date).format(
                    "DD/MM/YYYY"
                  )}
                  disabled
                />
              </div>
              <div className="mb-2">
                <label className="col-4">Conformed date</label>
                <DatePicker
                  format="DD/MM/YYYY"
                  disabledDate={disabledDate}
                  onChange={onChangedate}
                  className="col-4"
                />

                {/* <input
                  className="form-control form-control-sm"
                  type="text"
                  name="first_name"
                  onChange={(e) => {
                    setConformdate(e.target.value);
                  }}
                /> */}
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Pending;
