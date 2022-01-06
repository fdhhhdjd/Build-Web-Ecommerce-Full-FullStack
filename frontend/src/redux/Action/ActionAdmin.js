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
export const LogoutFail = (error) => ({
  type: types.LOGOUT_API_FAIL,
  payload: error,
});

//?Get profile
export const GetProfileStart = () => ({
  type: types.GET_PROFILE_ACCOUNT_START,
});
export const GetProfileSuccess = (token) => ({
  type: types.GET_PROFILE_ACCOUNT_SUCCESS,
  payload: token,
});
export const GetProfileFail = (error) => ({
  type: types.GET_PROFILE_ACCOUNT_FAIL,
  payload: error,
});

//?forget
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
//?upload profile
export const UploadProfileStart = () => ({
  type: types.UPDATE_PROFILE_START,
});
export const UploadProfileSuccess = (admin) => ({
  type: types.UPDATE_PROFILE_SUCCESS,
  payload: admin,
});
export const UploadProfileFail = (error) => ({
  type: types.UPDATE_PROFILE_FAIL,
  payload: error,
});
//?forgot profile
export const ForgotStart = () => ({
  type: types.UPDATE_FORGOT_START,
});
export const ForgotSuccess = (admin) => ({
  type: types.UPDATE_FORGOT_SUCCESS,
  payload: admin,
});
export const ForgotFail = (error) => ({
  type: types.UPDATE_FORGOT_FAIL,
  payload: error,
});
//?RESET profile
export const ResetForgotStart = () => ({
  type: types.RESET_FORGOT_START,
});
export const ResetForgotSuccess = (admin) => ({
  type: types.RESET_FORGOT_SUCCESS,
  payload: admin,
});
export const ResetForgotFail = (error) => ({
  type: types.RESET_FORGOT_FAIL,
  payload: error,
});
//! upload password
export const UploadPasswordStart = () => ({
  type: types.UPDATE_PASSWORD_START,
});
export const UploadPasswordSuccess = (admin) => ({
  type: types.UPDATE_PASSWORD_SUCCESS,
  payload: admin,
});
export const UploadPasswordFail = (error) => ({
  type: types.UPDATE_PASSWORD_FAIL,
  payload: error,
});
//!Register
export const RegisterInitiate = (userData) => async (dispatch) => {
  try {
    dispatch(RegisterStart());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/api/v1/register`, userData, config);

    dispatch(
      RegisterSuccess(data.user),
      toast.success("Register Successfully 💖")
    );
  } catch (error) {
    dispatch(
      RegisterFail(error.response.data.message),
      toast.error(error.response.data.message)
    );
  }
};
//!Login
export const loginInitiate = (email, password) => async (dispatch) => {
  try {
    dispatch(LoginStart());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    dispatch(LoginSuccess(data.user), toast.success("Login Successfully 💖"));
  } catch (error) {
    dispatch(
      LoginFail(error.response.data.message),
      toast.error(error.response.data.message)
    );
  }
};
//!Logout
export const LogoutInitiate = () => async (dispatch) => {
  try {
    dispatch(LogoutStart());
    await axios.get(`/api/v1/logout`);
    dispatch(LogoutSuccess(), toast.success("Logout Successfully 💖"));
  } catch (error) {
    dispatch(
      LogoutFail(error.response.data.message),
      toast.error(error.response.data.message)
    );
  }
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
//!Get profile
export const LoadProfileInitiate = () => async (dispatch) => {
  try {
    dispatch(GetProfileStart());

    const { data } = await axios.get(`/api/v1/me`);

    dispatch(GetProfileSuccess(data.user));
  } catch (error) {
    dispatch(GetProfileFail(error.response.data.message));
  }
};
//!Update profile
export const UploadProfileInitiate = (userData) => async (dispatch) => {
  try {
    dispatch(dispatch(UploadProfileStart()));

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/api/v1/me/update`, userData, config);

    dispatch(
      UploadProfileSuccess(data.success),
      swal("Edit Profile Successfully !!", { icon: "success" })
    );
  } catch (error) {
    dispatch(UploadProfileFail(error.response.data.message));
  }
};
//! Update Password
export const UploadPasswordInitiate = (passwords) => async (dispatch) => {
  try {
    dispatch(UploadPasswordStart());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/update`,
      passwords,
      config
    );

    dispatch(
      UploadPasswordSuccess(data.success),
      swal("ChangePassword Profile Successfully !!", { icon: "success" })
    );
  } catch (error) {
    dispatch(UploadPasswordFail(error.response.data.message));
  }
};

//!Forgot Password
export const ForgotPasswords = (email) => async (dispatch) => {
  try {
    dispatch(ForgetStart());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/password/forgot`, email, config);

    dispatch(
      ForgetSuccess(data.message),
      swal(data.message, {
        icon: "success",
      })
    );
  } catch (error) {
    dispatch(
      ForgetFail(error.response.data.message),
      toast.error(error.response.data.message)
    );
  }
};
//! Reset pw
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch(ResetForgotStart());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch(
      ResetForgotStart(data.success),
      swal(data.success, {
        icons: "success",
      })
    );
  } catch (error) {
    dispatch(ResetForgotStart(error), toast.error(error.response.data.message));
  }
};
//!CLEAR_ERRORS
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERRORS_SUCCESS });
};
