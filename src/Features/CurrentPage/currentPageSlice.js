import { createSlice } from "@reduxjs/toolkit";

const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState: {
    currentPage: '',
    currentFilterMethod: '',
    currentTopOfFilter: '',
    currentSearchSort: '',
    currentSearchTimeSort: '',
    currentSearchType: 'link',
    currentUserFeedFilter: 'overview',
    currentUserFeedPopularityFilter: 'new',
    currentUserFeedTimeFilter: 'all',
    currentCommentFilter: '',
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
    changeCurrentUserFeedPopularityFilter: (state, action) => {
      state.currentUserFeedPopularityFilter = action.payload;
    },
    resetUserFeedFilter: (state) => {
      state.currentUserFeedFilter = 'overview';
      state.currentUserFeedPopularityFilter = 'new';
      state.currentUserFeedTimeFilter = 'all';
    },
    resetSearchType: (state) => {
      state.currentSearchType = 'link';
    },
    changeCurrentSearchSort: (state, action) => {
      state.currentSearchSort = action.payload;
    },
    changeCurrentSearchTimeSort: (state, action) => {
      state.currentSearchTimeSort = action.payload;
    },
    resetSearchFilters: (state) => {
      state.currentSearchSort = '';
      state.currentSearchTimeSort = '';
    },
    changeCurrentUserFeedTimeFilter: (state, action) => {
      state.currentUserFeedTimeFilter = action.payload;
    },
    changeCurrentCommentFilter: (state, action) => {
      state.currentCommentFilter = action.payload;
    },
    resetCurrentCommentFilter: (state) => {
      state.currentCommentFilter = '';
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
export const selectCurrentSearchTimeSort = state => state.currentPage.currentSearchTimeSort;
export const selectCurrentUserFeedPopularityFilter = state => state.currentPage.currentUserFeedPopularityFilter;
export const selectCurrentUserFeedTimeFilter = state => state.currentPage.currentUserFeedTimeFilter;
export const selectCurrentCommentFilter = state => state.currentPage.currentCommentFilter;

export const { changeCurrentPage,
               changeCurrentFilterMethod,
               setTopOfFilter,
               toggleIsFromSite,
               toggleNightmode,
               changeCurrentUserFeedFilter,
               changeSearchType, 
               resetSearchType,
               resetUserFeedFilter,
               changeCurrentSearchSort,
               changeCurrentSearchTimeSort,
               changeCurrentUserFeedPopularityFilter,
               resetSearchFilters,
               changeCurrentUserFeedTimeFilter,
               changeCurrentCommentFilter,
               resetCurrentCommentFilter
               } = currentPageSlice.actions;
export default currentPageSlice.reducer;