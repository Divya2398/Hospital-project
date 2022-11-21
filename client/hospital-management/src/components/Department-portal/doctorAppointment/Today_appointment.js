import React, { useEffect, useRef, useState } from "react";
import {
  SearchOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Doctorapp.css";
import moment from "moment";
const { Title } = Typography;

const Today_appointment = () => {
  //cuurent date
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const day = moment().format("dddd");
  const inputRef = useRef(null);

  const navigate = useNavigate();

  //dummy data
  const data = [
    {
      patient_id: "123345",
      first_name: "firstname",
      last_name: "lastname",
      appointment_id: "45678",
    },
  ];
  // search function
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
  const columns = [
    {
      title: "Patient Id",
      dataIndex: "patient_id",
      key: "patient_id",
      ...getColumnSearchProps("patient_id"),
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      ...getColumnSearchProps("first_name"),
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      ...getColumnSearchProps("last_name"),
    },
    {
      title: "Appointment Id",
      dataIndex: "appointment_id",
      key: "appointment_id",
    },
    {
      title: "Report",
      dataIndex: "",
      width: "15%",
      fixed: "right",
      key: "x",
      render: (data) => (
        <>
          <Button
            onClick={() => {
              navigate("/report-setting");
            }}
          >
            Paient reports
          </Button>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="current-date d-inline-block me-3">
        <p className="m-0 p-1">{date}</p>
      </div>
      <div className="current-date d-inline-block">
        <p className="m-0 p-1">{day}</p>
      </div>
      <div className="mt-3">
        <Title
          level={4}
          style={{ textAlign: "center" }}
          className="mb-4 mt-2 app-table"
        >
          Today's Appointments
        </Title>
        <Table
          columns={columns}
          dataSource={data}
          // scroll={{
          //   x: 1300,
          // }}
        />
      </div>
    </>
  );
};

export default Today_appointment;
