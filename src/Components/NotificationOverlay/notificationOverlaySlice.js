import { createSlice } from "@reduxjs/toolkit";

const notificationOverlaySlice = createSlice({
  name: 'notificationOverlay',
  initialState: {
    showNotification: false
  },
  reducers: {
    toggleNotification: (state) => {
      state.showNotification = !state.showNotification
    }
  }    
})

export const selectShowNotification = state => state.notificationOverlay.showNotification;
export const { toggleNotification } = notificationOverlaySlice.actions;
export default notificationOverlaySlice.reducer;