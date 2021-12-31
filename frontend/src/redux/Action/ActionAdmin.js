import axios from "axios";
import * as types from "../ActionTypes";
import { toast } from "react-toastify";
import swal from "sweetalert";
//?Register
export const RegisterStart = () => ({
  type: types.REGISTER_API_START,
});
export const RegisterSuccess = (apis) => ({
  type: types.REGISTER_API_SUCCESS,
  payload: apis,
});
export const RegisterFail = (error) => ({
  type: types.REGISTER_API_FAIL,
  payload: error,
});
//?Login
export const LoginStart = () => ({
  type: types.LOGIN_API_START,
});
export const LoginSuccess = (api) => ({
  type: types.LOGIN_API_SUCCESS,
  payload: api,
});
export const LoginFail = (error) => ({
  type: types.LOGIN_API_FAIL,
  payload: error,
});
//?Logout
export const LogoutStart = () => ({
  type: types.LOGOUT_API_START,
});
export const LogoutSuccess = () => ({
  type: types.LOGOUT_API_SUCCESS,
});
export const LogoutFail = () => ({
  type: types.LOGOUT_API_FAIL,
});

//?Logout
export const ForgetStart = () => ({
  type: types.FORGET_ADMIN_START,
});
export const ForgetSuccess = (admin) => ({
  type: types.FORGET_ADMIN_SUCCESS,
  payload: admin,
});
export const ForgetFail = (error) => ({
  type: types.FORGET_ADMIN_FAIL,
  payload: error,
});
//? refresh_token
export const RefreshTokenStart = () => ({
  type: types.REFRESH_TOKEN_ADMIN_START,
});
export const RefreshTokenSuccess = (token) => ({
  type: types.REFRESH_TOKEN_ADMIN_SUCCESS,
  payload: token,
});
export const RefreshTokenFail = (error) => ({
  type: types.REFRESH_TOKEN_ADMIN_FAIL,
  payload: error,
});
//!Register
export const RegisterInitiate = (
  email,
  hoten,
  username,
  password,
  ngaysinh,
  gioitinh,
  dienthoai
) => {
  return async function (dispatch) {
    dispatch(RegisterStart());
    await axios
      .post("/admin/register", {
        email,
        hoten,
        username,
        password,
        ngaysinh,
        gioitinh,
        dienthoai,
      })
      .then((user) => {
        dispatch(RegisterSuccess(user.data));
      })
      .catch((error) => {
        dispatch(RegisterFail(toast.error(error.data)));
      });
  };
};
//!Login
export const loginInitiate = (email, password) => {
  return async function (dispatch) {
    dispatch(LoginStart());
    await axios
      .post("/admin/login", { email, password })
      .then((user) => {
        dispatch(LoginSuccess(user.data));
      })
      .catch((error) => {
        dispatch(LoginFail(toast.error(error.data)));
      });
  };
};
//!Logout
export const LogoutInitiate = () => {
  return async function (dispatch) {
    dispatch(LogoutStart());
    await axios
      .get("/admin/logout")
      .then((user) => {
        dispatch(
          LogoutSuccess(
            user,
            toast.success("Logout Success Thank You!"),
            localStorage.removeItem("firstLogin"),
            (window.location.href = "/login")
          )
        );
      })
      .catch((error) => {
        dispatch(LoginFail(error));
      });
  };
};

//!Forget Admin
export const ForgetAdminInitiate = (email) => {
  return async function (dispatch) {
    dispatch(ForgetStart());
    await axios
      .post("/admin/forgotPassword", { email })
      .then((user) => {
        dispatch(ForgetSuccess(user.data));
      })
      .catch((error) => {
        dispatch(ForgetFail(error.data));
      });
  };
};
