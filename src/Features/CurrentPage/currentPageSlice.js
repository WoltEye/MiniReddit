import { createSlice } from "@reduxjs/toolkit";

const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState: {
    currentPage: '',
    currentFilterMethod: '',
    currentTopOfFilter: '',
    currentSearchSort: '',
    currentSearchType: 'link',
    currentUserFeedFilter: 'overview',
    nightmode: true
  },
  reducers: {
    changeCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    changeCurrentFilterMethod: (state, action) => {
      state.currentFilterMethod = action.payload;
    },
    setTopOfFilter: (state, action) => {
      state.currentTopOfFilter = action.payload;
    },
    toggleIsFromSite: (state) => {
      state.isFromSite = !state.isFromSite;
    },
    toggleNightmode: (state) => {
      state.nightmode = !state.nightmode;
    },
    changeSearchType: (state, action) => {
      state.currentSearchType = action.payload;
    },
    changeCurrentUserFeedFilter: (state, action) => {
      state.currentUserFeedFilter = action.payload
    },
    resetUserFeedFilter: (state) => {
      state.currentUserFeedFilter = 'overview';
    },
    resetSearchType: (state) => {
      state.currentSearchType = 'link';
    },
    changeCurrentSearchSort: (state, action) => {
      state.currentSearchSort = action.payload;
    }
  }
})

export const selectCurrentPage = state => state.currentPage.currentPage;
export const selectCurrentFilterMethod = state => state.currentPage.currentFilterMethod;
export const selectIsFromSite = state => state.currentPage.isFromSite;
export const selectCurrentTopOfFilter = state => state.currentPage.currentTopOfFilter;
export const selectNightmode = state => state.currentPage.nightmode;
export const selectCurrentSearchType = state => state.currentPage.currentSearchType;
export const selectCurrentSearchSort = state => state.currentPage.currentSearchSort;
export const selectCurrentUserFeedFilter = state => state.currentPage.currentUserFeedFilter;

export const { changeCurrentPage,
               changeCurrentFilterMethod,
               setTopOfFilter,
               toggleIsFromSite,
               toggleNightmode,
               changeCurrentUserFeedFilter,
               changeSearchType, 
               resetSearchType,
               resetUserFeedFilter,
              changeCurrentSearchSort } = currentPageSlice.actions;
export default currentPageSlice.reducer;