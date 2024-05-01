import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {}, // Initialize with an empty object
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateProfileImage: (state, action) => {
      state.user.image = action.payload.image; // No need to check if state.user exists
    },
  },
});

export const { setUser, updateProfileImage } = userSlice.actions;
export const selectUser = (state) => state.user.user || null;

export default userSlice.reducer;
