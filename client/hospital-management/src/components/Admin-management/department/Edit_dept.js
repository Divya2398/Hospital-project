import React, { useEffect, useRef, useState } from "react";
import {
  SearchOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Avatar,
  Image,
  Modal,
  Upload,
  Form,
} from "antd";
import axios from "axios";
import { SERVER_URL } from "../../../Globals";

const Edit_dept = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editdetail, setEditdetail] = useState(null);

  const [state, setState] = useState({
    data: "",
  });

  const [image, setImage] = useState({
    dep_image: "",
  });

  useEffect(() => {
    axios.get(SERVER_URL + "api/departements/getAllDepartments").then((res) => {
      setState({
        data: res.data.data,
      });
    });

    console.log();
  }, []);

  const editdata = (department_id) => {
    console.log("data", department_id);
    setIsEditing(true);
    setEditdetail({ ...department_id });
  };

  console.log("editdetails", editdetail?.department_name);

  console.log(setEditdetail);
  const resetEditing = () => {
    setIsEditing(false);
    setEditdetail(null);
  };

  //TABLE VALUES
  const data = state.data;

  //search-filter function
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

  //UPDATE FUNCTION
  const updateDepartment = () => {
    console.log("update");
    const id = {
      department_id: editdetail.department_id,
    };
    console.log(id);

    axios
      .get(SERVER_URL + "api/departements/getSingleDepartment", { params: id })
      .then((res) => {
        console.log(
          "res.data.data.department_image",
          res.data.data.department_image
        );
        console.log(editdetail.department_image);
        console.log("editdetail", editdetail);

        // if(res.data.data.department_image == editdetail.department_image){
        //   console.log("without image")
        // } else {
        //   console.log("with image")
        // }

        if (res.data.data.department_image == editdetail.department_image) {
          const dep_id = editdetail.department_id;
          let data = {
            department_name: editdetail.department_name,
            password: editdetail.password,
          };
          console.log("dep_id", dep_id);
          console.log("data", data);
          axios
            .put(SERVER_URL + "api/departements/updateDepartmentWithoutImg", {
              department_id: dep_id,
              data: data,
            })
            .then((res) => {
              console.log(res);
              axios
                .get(SERVER_URL + "api/departements/getAllDepartments")
                .then((res) => {
                  setState({
                    data: res.data.data,
                  });
                });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("with img");

          //CREATE FORM DATA TO UPDATE WITH IMAGE
          if (editdetail.department_image) {
            const formData = new FormData();

            formData.append("department_name", editdetail.department_name);
            formData.append("department_id", editdetail.department_id);
            formData.append("department_image", editdetail.department_image);
            formData.append("password", editdetail.password);

            axios
              .put(
                SERVER_URL + "api/departements/updateDepartmentWithImg",
                formData
              )
              .then((res) => {
                console.log("res.data.data", res.data.result);
                axios
                  .get(SERVER_URL + "api/departements/getAllDepartments")
                  .then((res) => {
                    setState({
                      data: res.data.data,
                    });
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //on image upload
  const handleOnChange = (data) => {
    console.log("handleon change", data);
  };

  //table columns
  const columns = [
    {
      title: "Department Id",
      dataIndex: "department_id",
      key: "department_id",
      width: "20%",
      ...getColumnSearchProps("department_id"),
    },
    {
      title: "Department Name",
      dataIndex: "department_name",
      key: "department_name",
      width: "25%",

      ...getColumnSearchProps("department_name"),
    },
    {
      title: "Login password",
      dataIndex: "password",
      key: "password",
      width: "20%",
    },
    {
      title: "Department Image",
      dataIndex: "department_image",
      key: "department_image",
      width: "20%",
      render: (department_image) => (
        <Avatar
          src={
            <Image
              src={SERVER_URL + "uploads/department_img/" + department_image}
              style={{ width: 32 }}
              alt="department image"
            />
          }
        />
      ),
    },

    {
      title: "Action",
      dataIndex: "",
      width: "20%",
      key: "x",
      render: (department_id) => (
        <>
          <Button
            onClick={() => {
              editdata(department_id);
            }}
          >
            Edit
            <EditOutlined />
          </Button>
        </>
      ),
    },
  ];

  //form layout
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

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <div>
        <Modal
          title="Edit items"
          open={isEditing}
          okText="save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            {
              updateDepartment();
            }

            resetEditing();
          }}
        >
          <div>
            <label>Department Name</label>
            <Input
              type="text"
              name="department_name"
              value={editdetail?.department_name}
              onChange={(e) => {
                setEditdetail((pre) => {
                  return { ...pre, department_name: e.target.value };
                });

                console.log(editdetail);
              }}
            />
          </div>

          <div>
            <label>password</label>
            <Input
              type="text"
              name="password"
              value={editdetail?.password}
              onChange={(e) => {
                setEditdetail((pre) => {
                  return { ...pre, password: e.target.value };
                });
              }}
            />
          </div>

          <div>
            <label>Department Image</label>
            <Upload
              listType="picture"
              //   action={"http://localhost:8000/items/admin/additemweb"}
              beforeUpload={(file) => {
                // value = {editingItems?.item_image}
                setEditdetail({
                  ...editdetail,
                  department_image: file,
                });

                // setImage({
                //   dep_image : file
                // })
                // console.log("editdetail",editdetail);
                console.log({ file });
                return false;
              }}
              // onChange={handleOnChange}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>

          <div>
            <label>Current Image</label>
            {/* <Image width={100} src="" alt="logo" /> */}
            <Avatar
              src={
                <Image
                  src={
                    SERVER_URL +
                    "uploads/department_img/" +
                    editdetail?.department_image
                  }
                  style={{
                    width: 32,
                  }}
                />
              }
            />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Edit_dept;
