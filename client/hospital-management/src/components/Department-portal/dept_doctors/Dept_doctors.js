import React, { useEffect, useRef, useState } from "react";
import {
  SearchOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, Avatar, Image, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { SERVER_URL } from "../../../Globals";
const { Title } = Typography;
const Dept_doctors = () => {
  const [state, setState] = useState({
    data: [],
  });

  let token = localStorage.getItem("token");
  const decode = jwt_decode(token);
  console.log("decode", decode);
  const id = decode.department_id;
  console.log(decode.department_id);
  useEffect(() => {
    axios
      .get(
        SERVER_URL + `api/specialistDaySlot/get-dept-doctor?department_id=${id}`
      )
      .then((res) => {
        console.log("resul", res.data.result);
        setState({
          data: res.data.result,
        });
      });
  }, []);
  console.log("state", state);
  const data = state.data;
  const inputRef = useRef(null);
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
      title: "Doctor Id",
      dataIndex: "specialist_id",
      key: "specialist_id",
      ...getColumnSearchProps("specialist_id"),
    },
    {
      title: "Doctor Name",
      dataIndex: "doctor",
      key: "doctor",
      render: (doctor) => doctor.specialist_name,
      // ...getColumnSearchProps("specialist_name"),
    },
    {
      title: "Doctor Profile",
      dataIndex: "doctor",
      key: "doctor",
      width: "15%",

      render: (doctor) => (
        <Avatar
          src={
            <Image
              src={SERVER_URL + "uploads/specialist/" + doctor.image}
              style={{ width: 32 }}
              alt="profile"
            />
          }
        />
      ),
    },
    {
      title: "OP Day",
      dataIndex: "available_day",
      key: "available_day",
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        // dataSource={data}
        scroll={{
          x: 900,
        }}
      />
    </>
  );
};

export default Dept_doctors;
