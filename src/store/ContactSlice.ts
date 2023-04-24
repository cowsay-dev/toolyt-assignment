import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: localStorage.getItem("contact-data")
    ? JSON.parse(localStorage.getItem("contact-data") || "{}")
    : [],
};

export const ContactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContact: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setContact } = ContactSlice.actions;
