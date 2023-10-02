import { configureStore } from '@reduxjs/toolkit';
import redditApiReducer from '../Features/Api/redditApiSlice';
import notificationOverlaySlice from '../Components/NotificationOverlay/notificationOverlaySlice';
import currentPageSlice from '../Features/CurrentPage/currentPageSlice';

export default configureStore({
  reducer: {
    redditApi: redditApiReducer,
    notificationOverlay: notificationOverlaySlice,
    currentPage: currentPageSlice
  }
});