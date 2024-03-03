import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    profileLoading: false,
    isUpdated: false,
    // Admin states
    usersForAdmin: [],
    usersLoading: false,
    userForAdmin: {},
    userLoading: false,
    isDeleted: false,
    isUpdatedByAdmin: false,
    updateLoading: false,
  },
  reducers: {
    userReducer(state, action) {
      state.loading = action.payload.loading;
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    profileReducer(state, action) {
      state.isUpdated = action.payload.isUpdated;
      if (action.payload.loading != null) {
        state.profileLoading = action.payload.loading;
      }
      if (action.payload.user) {
        state.user = action.payload.user;
      }
    },
    // Admin reducers
    allUsersForAdmin(state, action) {
      state.usersForAdmin = action.payload.users;
      state.usersLoading = action.payload.loading;
    },
    getUserForAdmin(state, action) {
      state.userForAdmin = action.payload.user;
      state.userLoading = action.payload.loading;
    },
    deleteUserByAdmin(state, action) {
      state.isDeleted = action.payload.isDeleted;
    },
    updateUserByAdmin(state, action) {
      state.isUpdatedByAdmin = action.payload.isUpdated;
      state.updateLoading = action.payload.loading;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
