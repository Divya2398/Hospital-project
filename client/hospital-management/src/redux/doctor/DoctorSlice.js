import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Button, Form, Image, Typography, message } from "antd";
import jwt_decode from "jwt-decode";

const doc_token = localStorage.getItem("doctor-token")
  ? localStorage.getItem("doctor-token")
  : null;

const doctor_loginStatus = localStorage.getItem("doctor-loginStatus")
  ? localStorage.getItem("doctor-loginStatus")
  : false;

const initialState = {
  doctor_loginStatus,
  doctor: {},
  doc_token,
  isFetching: false,
  error: "",
  success: false,
};

export const doctorlogin = createAsyncThunk(
  "doctor/doctorlogin",
  async (values, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const dept = localStorage.getItem("token");
      const decode = jwt_decode(dept);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `http://localhost:8080/v1/api/specialist/doctor-login?department_id=${decode.department_id}`,
        values,
        config
      );
      // store user's token in local storage
      console.log("data", data);
      console.log("res", data.data);
      if (data.status === "success") {
        localStorage.setItem("doctor-token", data.data);
        localStorage.setItem("doctor-loginStatus", true);
        setTimeout(() => {
          message.success(data.message);
        }, 1000);
        // const decode = jwt_decode(data.data);
        //  window.location.href = "/";
        return data.data;
      } else {
        setTimeout(() => {
          message.error(data.message);
        }, 1000);
        return rejectWithValue(data.message);
      }
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
const DoctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("doctor-loginStatus");
      localStorage.removeItem("doctor-token"); // deletes token from storage
      state.doctor_loginStatus = false;
      state.isFetching = false;
      state.doctor = null;
      state.doc_token = null;
      state.error = "";
    },
  },
  extraReducers: (bulider) => {
    bulider.addCase(doctorlogin.pending, (state) => {
      state.isFetching = true;
    });
    bulider.addCase(doctorlogin.fulfilled, (state, action) => {
      console.log("action", action);
      state.isFetching = false;
      state.doc_token = action.payload;
      state.error = "";
      state.doctor_loginStatus = true;
      state.doctor = jwt_decode(action.payload);
    });
    bulider.addCase(doctorlogin.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    });
  },
});
export const { logout } = DoctorSlice.actions;
export default DoctorSlice.reducer;
