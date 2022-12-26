import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { SERVER_URL } from "../../Globals";
import {
  SearchOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, Form, message } from "antd";
const Appointmentreport = () => {
  const [state, setState] = useState({ data: [] });
  const location = useLocation();
  console.log("data", location.state);
  //   const department_id = location.state.data.department_id;
  const specialist_id = location.state.data.specialist_id;
  const patient_id = location.state.patientId;

  useEffect(() => {
    axios
      .get(
        SERVER_URL +
          `api/appointment/forpatient-appointment?patient_id=${patient_id}&specialist_id=${specialist_id}`
      )
      .then((res) => {
        console.log("res", res.data.result);
        if (res.data.status === "success") {
          setState({ data: res.data.result });
        } else {
          setTimeout(() => {
            message.error(res.data.message);
          }, 1000);
        }
      });
    axios
      .get(
        SERVER_URL +
          `api/appointment/forpatient-appointment?patient_id=${patient_id}&specialist_id=${specialist_id}`
      )
      .then((res) => {
        console.log("res", res.data.result);
        if (res.data.status === "success") {
          setState({ data: res.data.result });
        } else {
          setTimeout(() => {
            message.error(res.data.message);
          }, 1000);
        }
      });
  }, []);
  console.log("state", state);
  const data = state.data;

  const handlereport = (data) => {
    console.log("data");
  };
  //search filter
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

  //table column
  const columns = [
    {
      title: "Date",
      dataIndex: "confrimed_date",
      key: "confrimed_date",
      ...getColumnSearchProps("confrimed_date"),
    },
    {
      title: "Appointment Id",
      dataIndex: "appointment_id",
      key: "appointment_id",
      ...getColumnSearchProps("appointment_id"),
    },

    {
      title: "Doctor Name",
      dataIndex: "doctor_name",
      key: "doctor_name",
    },
    {
      title: "Department",
      dataIndex: "department_name",
      key: "department_name",
    },
    {
      title: "Your Report",
      dataIndex: "",
      width: "15%",
      fixed: "right",
      key: "x",
      render: (data) => (
        <>
          <Button onClick={handlereport(data)}>View Report</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Navbar></Navbar>
      <div className="mt-5 px-5">
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

export default Appointmentreport;
