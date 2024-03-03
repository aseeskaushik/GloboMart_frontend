import axios from "axios";
import { userActions } from "./user-slice";
import { toast } from "react-toastify";

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(
        userActions.userReducer({
          loading: true,
          user: {},
          isAuthenticated: false,
        })
      );
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/login",
        { email, password },
        config
      );
      localStorage.setItem("token", data.token);
      dispatch(
        userActions.userReducer({
          loading: false,
          isAuthenticated: true,
          user: data.user,
        })
      );
    } catch (error) {
      dispatch(
        userActions.userReducer({
          loading: false,
          user: {},
          isAuthenticated: false,
        })
      );
      toast.error(error.response.data.message);
    }
  };
};

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(
        userActions.userReducer({
          loading: true,
          isAuthenticated: false,
          user: {},
        })
      );
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/v1/register", userData, config);
      localStorage.setItem("token", data.token);
      dispatch(
        userActions.userReducer({
          loading: false,
          isAuthenticated: true,
          user: data.user,
        })
      );
    } catch (error) {
      dispatch(
        userActions.userReducer({
          loading: false,
          isAuthenticated: false,
          user: {},
        })
      );
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
};

export const loadUser = () => {
  return async (dispatch) => {
    try {
      dispatch(
        userActions.userReducer({
          loading: true,
          isAuthenticated: false,
          user: {},
        })
      );
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (!localStorage.getItem("token")) {
        throw new Error("UnAuthorised");
      }
      const token = localStorage.getItem("token");
      const { data } = await axios.post("/api/v1/me", { token }, config);
      if (!data) {
        throw new Error("logged out");
      }
      dispatch(
        userActions.userReducer({
          loading: false,
          isAuthenticated: true,
          user: data.user,
        })
      );
    } catch (error) {
      dispatch(
        userActions.userReducer({
          loading: false,
          isAuthenticated: false,
          user: {},
        })
      );
      // toast.error(error.response.data.message);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/v1/logout");
      dispatch(
        userActions.userReducer({
          loading: false,
          isAuthenticated: false,
          user: {},
        })
      );
      localStorage.removeItem("token");
      toast.success(data.message);
    } catch (error) {
      dispatch(
        userActions.userReducer({
          loading: false,
          isAuthenticated: true,
        })
      );
      toast.error(error.response.data.message);
    }
  };
};

export const updateUser = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(
        userActions.profileReducer({
          loading: true,
          isUpdated: false,
        })
      );
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (!localStorage.getItem("token")) {
        throw new Error("UnAuthorised");
      }
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        "/api/v1/me/update",
        { userData, token },
        config
      );
      dispatch(
        userActions.profileReducer({
          loading: false,
          isUpdated: true,
          user: data.user,
        })
      );
    } catch (error) {
      dispatch(
        userActions.profileReducer({
          loading: false,
          isUpdated: false,
        })
      );
      toast.error(error.response.data.message);
    }
  };
};

export const updatePassword = (passwords) => {
  return async (dispatch) => {
    try {
      dispatch(
        userActions.profileReducer({
          loading: true,
          isUpdated: false,
        })
      );
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (!localStorage.getItem("token")) {
        throw new Error("UnAuthorised");
      }
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        "/api/v1/password/update",
        { token, passwords },
        config
      );
      dispatch(
        userActions.profileReducer({
          loading: false,
          isUpdated: true,
          user: data.user,
        })
      );
    } catch (error) {
      dispatch(
        userActions.profileReducer({
          loading: false,
          isUpdated: false,
        })
      );
      toast.error(error.response.data.message);
    }
  };
};

// Admin actions
export const fetchAllUsersByAdmin = () => {
  return async (dispatch) => {
    try {
      dispatch(
        userActions.allUsersForAdmin({
          loading: true,
          users: [],
        })
      );
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (!localStorage.getItem("token")) {
        throw new Error("UnAuthorised");
      }
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "/api/v1/admin/users",
        { token },
        config
      );
      dispatch(
        userActions.allUsersForAdmin({
          loading: false,
          users: data,
        })
      );
    } catch (error) {
      dispatch(
        userActions.allUsersForAdmin({
          loading: false,
          users: [],
        })
      );
      toast.error(error.response.data.message);
    }
  };
};

export const fetchUserForAdmin = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(
        userActions.getUserForAdmin({
          loading: true,
          user: {},
        })
      );
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (!localStorage.getItem("token")) {
        throw new Error("UnAuthorised");
      }
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `/api/v1/admin/user/${userId}`,
        { token },
        config
      );
      dispatch(
        userActions.getUserForAdmin({
          loading: false,
          user: data,
        })
      );
    } catch (error) {
      dispatch(
        userActions.getUserForAdmin({
          loading: false,
          user: {},
        })
      );
      toast.error(error.response.data.message);
    }
  };
};

export const deleteUserByAdmin = (userId) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (!localStorage.getItem("token")) {
        throw new Error("UnAuthorised");
      }
      const token = localStorage.getItem("token");
      await axios.post(
        `/api/v1/admin/user/delete/${userId}`,
        { token },
        config
      );
      dispatch(
        userActions.deleteUserByAdmin({
          isDeleted: true,
        })
      );
    } catch (error) {
      dispatch(
        userActions.deleteUserByAdmin({
          isDeleted: false,
        })
      );
      toast.error(error.response.data.message);
    }
  };
};

export const updateUserByAdmin = (userId, userData) => {
  return async (dispatch) => {
    try {
      dispatch(
        userActions.updateUserByAdmin({
          loading: true,
          isUpdated: false,
        })
      );
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (!localStorage.getItem("token")) {
        throw new Error("UnAuthorised");
      }
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/v1/admin/user/${userId}`,
        { userData, token },
        config
      );
      dispatch(
        userActions.updateUserByAdmin({
          loading: false,
          isUpdated: true,
        })
      );
    } catch (error) {
      dispatch(
        userActions.updateUserByAdmin({
          loading: false,
          isUpdated: false,
        })
      );
      toast.error(error.response.data.message);
    }
  };
};
