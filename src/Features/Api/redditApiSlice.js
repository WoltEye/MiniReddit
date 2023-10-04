import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadData = createAsyncThunk(
  'redditApi/loadData',
  async (arg) => { 
    /*Only possible case arg.subreddit is undefined is when
      user is in the default path (/) if its undefined
      load r/all/best as the default page */
    const url = arg.subreddit === undefined ? 
    'https://api.reddit.com/r/all/best.json?raw_json&limit=30' : 
    `https://api.reddit.com/r/${arg.filterMethod ? `${arg.subreddit}/${arg.filterMethod}` : arg.subreddit}.json?raw_json=true&limit=30${arg.topOfFilter ? `&t=${arg.topOfFilter}` : ''}`;  
     const response = await fetch(url);
      const json = await response.json();
      return json;
    }
)
/*Used to load more post's to the current state when the user reaches
  the bottom of the page */
export const loadMoreData = createAsyncThunk(
  'redditApi/loadMoreData',
  async (arg) => {
    const url = arg.subreddit !== undefined ? 
    `https://api.reddit.com/r/${arg.filterMethod ? `${arg.subreddit}/${arg.filterMethod}` : arg.subreddit}.json?raw_json=true&limit=30${arg.topOfFilter ? `&t=${arg.topOfFilter}` : ''}&after=${arg.after}`
    : `https://api.reddit.com/r/${arg.filterMethod ? `all/${arg.filterMethod}` : 'all'}.json?raw_json=true&limit=30${arg.topOfFilter ? `&t=${arg.topOfFilter}` : ''}&after=${arg.after}`;
    console.log(`Loading more ${url}`);
    const response = await fetch(url);
    const json = await response.json();
    return json;     
  }
)

export const loadSubredditData = createAsyncThunk(
  'redditApi/loadSubredditData',
  async (arg) => {
    const url = `https://api.reddit.com/r/${arg.subreddit !== undefined ? arg.subreddit : 'all'}/about.json?raw_json=true`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }
)


export const loadComments = createAsyncThunk(
  'redditApi/loadComments',
  async (arg) => {
    const url = `https://api.reddit.com${arg}.json?raw_json=true`;
    console.log('Loading Comments ' + url);
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }
)

export const loadSearchResults = createAsyncThunk(
  'redditApi/loadSearchResults',
  async (arg) => {
    const url = `https://api.reddit.com/search?q=${arg.searchTerm}&type=${arg.type}${arg.sort ? `&sort=${arg.sort}` : ''}${arg.timeSort ? `&t=${arg.timeSort}` : ''}&raw_json=true`;
    console.info('Loading search results. URL: ' + url);
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
)

export const loadMoreSearchResults = createAsyncThunk(
  'redditApi/loadMoreSearchResults',
  async (arg) => {
    const url = `https://api.reddit.com/search?q=${arg.searchTerm}&type=${arg.type}${arg.sort ? `&sort=${arg.sort}` : ''}${arg.timeSort ? `&t=${arg.timeSort}` : ''}&after=${arg.after}&raw_json=true`;
    console.info('Loading search results. URL: ' + url);
    console.info('timeSort: ' + arg.timeSort);
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
)

export const loadUserData = createAsyncThunk(
  'redditApi/loadUserData',
  async (arg) => {
    const url = `https://api.reddit.com/user/${arg.username}${arg.filter ? `/${arg.filter}` : '/overview'}/${arg.sort ? `?sort=${arg.sort}` : ''}${arg.time ? `&t=${arg.time}` : ''}&raw_json=true`
    console.info('Loading user data: ' + url)
    const res = await fetch(url);
    const json = await res.json();
    const url2 = `https://api.reddit.com/user/${arg.username}/about?raw_json=true`;
    const res2 = await fetch(url2);
    const json2 = await res2.json();
    return {json, json2};
  }
)

export const loadMoreUserPosts = createAsyncThunk(
  'redditApi/loadMoreUserPosts',
  async (arg) => {
    const url = `https://api.reddit.com/user/${arg.username}${arg.filter ? `/${arg.filter}` : ''}?after=${arg.after}&raw_json=true`
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
)


const redditApiSlice = createSlice({
  name: 'redditApi',
  initialState: {
    data: {

    },
    subredditData: {

    },
    comments: {
    },
    searchResults: {

    },
    userData: {

    },
    userProfile: {

    },
    isLoading: false,
    hasError: false,
    newSearchResultsIsLoading: false,
    //used if new data is rendered to the same page
    newIsLoading: false,
    commentsIsLoading: false,
    commentsError: '',
    showComments: false,
    currentTopOfFilter: '',
    subredditIsLoading: false,
    newUserPostsIsLoading: false,
    /* isFromSite is used to determine if comments are 
    opened from a button on the website or straight 
    from a link. This prevents a "bug" that is caused
    if a comment section is opened from r/all or another 
    page that has posts from mixed subreddits */
    },
  
  reducers: {
    clearSubredditData: state => {
      state.subredditData = {};
    },
    clearEverything: state => {
      state.hasError = false;
      state.data = {};
      state.subredditData = {};
      state.subredditHasError = false;
      state.subRedditError = {};
      state.error = {};
      state.userProfile = {};
      state.userData = {};
    },
    clearSearchResults: state => {
      state.searchResults = {};
    },
    clearUserData: state => {
      state.userData = {};
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loadData.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    })
    .addCase(loadData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      /* createAsyncThunk doesn't recognize 429 Errors
         instead it thinks the request is fulfilled this
         is why I decided to make a if statement here  */
      if(!state.data.message) {
      state.data = action.payload;
    } else {
      state.hasError = true;
      state.error = action.payload;
    }
    })
    .addCase(loadData.rejected, (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      state.error = action.error;
    })
    .addCase(loadMoreData.pending, (state) => {
      state.newIsLoading = true;
      state.hasError = false;
    })
    .addCase(loadMoreData.fulfilled, (state, action) => {
      state.newIsLoading = false;
      state.hasError = false;
      if(!state.data.message) {
        state.data.data.after = action.payload.data.after;
        state.data.data.children.push(...action.payload.data.children);
      } else {
        state.hasError = true;
        state.error = action.payload;
      }
    })
    .addCase(loadMoreData.rejected, (state, action) => {
      state.newIsLoading = false;
      state.hasError = true;
      state.error = action.error;
    })
    .addCase(loadComments.pending, (state) => {
      state.comments.currentComments = null; 
      state.commentsIsLoading = true;
      state.hasError = false;
      
    })
    .addCase(loadComments.fulfilled, (state, action) => {
      state.commentsIsLoading = false;
      state.hasError = false;
      state.comments.currentComments = action.payload;
    })
    .addCase(loadComments.rejected, (state, action) => {
      state.commentsIsLoading = false;
      state.hasError = true;
      state.showComments = false;
      state.error = action.error;
    })
    .addCase(loadSubredditData.pending, (state) => {
      state.subredditIsLoading = true;
      state.subredditHasError = false;
    })
    .addCase(loadSubredditData.fulfilled, (state, action) => {
      state.subredditIsLoading = false;
      state.subredditHasError = false;
      if(!state.subredditData.message) {
        state.subredditData = action.payload;
      } else {
        state.subredditHasError = true;
        state.error = action.payload;
      }
    })
    .addCase(loadSubredditData.rejected, (state, action) => {
      state.subredditIsLoading = false;
      state.subredditHasError = true;
      state.error = action.error;
    })
    .addCase(loadSearchResults.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    })
    .addCase(loadSearchResults.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      if(!state.searchResults.message) {
      state.searchResults = action.payload;
      }
      else {
        state.error = action.error;
      }
    }) 
    .addCase(loadMoreSearchResults.rejected, (state, action) => {
      state.hasError = true;
      state.newSearchResultsIsLoading = false;
      state.error = action.error;
    })
    .addCase(loadMoreSearchResults.pending, (state) => {
      state.newSearchResultsIsLoading = true;
      state.hasError = false;
    })
    .addCase(loadMoreSearchResults.fulfilled, (state, action) => {
      state.newSearchResultsIsLoading = false;
      state.hasError = false;
      if(!state.searchResults.message) {
      state.searchResults.data.after = action.payload.data.after;
      state.searchResults.data.children.push(...action.payload.data.children)
      }
      else {
        state.error = action.error;
      }
    }) 
    .addCase(loadSearchResults.rejected, (state, action) => {
      state.hasError = true;
      state.isLoading = false;
      state.error = action.error;
    })
    .addCase(loadUserData.pending, (state) => {
      state.hasError = false;
      state.isLoading = true;
    })
    .addCase(loadUserData.fulfilled, (state, action) => {
      state.hasError = false;
      state.isLoading = false;
      if(!state.userData.message) {
        state.userData = action.payload.json;
        state.userProfile = action.payload.json2;
      }
      else {
        state.error = action.error;
      }
    })
    .addCase(loadUserData.rejected, (state, action) => {
      state.hasError = true;
      state.isLoading = false;
      state.error = action.error;
    })
    .addCase(loadMoreUserPosts.pending, (state) => {
      state.hasError = false;
      state.newUserPostsIsLoading = true;
    })
    .addCase(loadMoreUserPosts.fulfilled, (state, action) => {
      state.hasError = false;
      state.newUserPostsIsLoading = false;
      if(!state.userData.message) {
        state.userData.data.after = action.payload.data.after;
        state.userData.data.children.push(...action.payload.data.children);
      }
      else {
        state.error = action.error;
      }
    })
    .addCase(loadMoreUserPosts.rejected, (state, action) => {
      state.hasError = true;
      state.newUserPostsIsLoading = false;
      state.error = action.error;
    })
  }
});

export const selectData = state => {
  return state.redditApi.data.data?.children
}


export const selectAfter = state => state.redditApi.data.data?.after;
export const selectIsLoading = state => state.redditApi.isLoading;
export const selectNewIsLoading = state => state.redditApi.newIsLoading;
export const selectHasError = state => state.redditApi.hasError;
export const selectError = state => state.redditApi.error;
export const selectCurrentComments = state => state.redditApi.comments?.currentComments;
export const selectShowComments = state => state.redditApi.showComments;
export const selectCurrentTopOfFilter = state => state.redditApi.currentTopOfFilter;
export const selectSubredditHasError = state => state.redditApi.subredditHasError;
export const selectSubredditIsLoading = state => state.redditApi.subredditIsLoading;
export const selectSubredditError = state => state.redditApi.subRedditError;
export const selectSubredditData = state => state.redditApi.subredditData.data;
export const selectSearchResults = state => state.redditApi.searchResults;
export const selectNewSearchResultsIsLoading = state => state.redditApi.newSearchResultsIsLoading;
export const selectUserData = state => state.redditApi.userData;
export const selectUserProfile = state => state.redditApi.userProfile;
export const selectNewUserPostsIsLoading = state => state.redditApi.newUserPostsIsLoading;

export const { clearSubredditData, clearEverything, clearSearchResults, clearUserData } = redditApiSlice.actions;

export default redditApiSlice.reducer;