import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import Post from '../../Components/Posts/Post/Post';
import Loading from './Loading/Loading';
import NoPostsError from './NoPostsError/NoPostsError';
import { selectIsLoading,
         selectSubredditIsLoading,
         selectSubredditError,
         selectSubredditHasError,
         selectError,
         selectHasError,
         selectData,
         selectSubredditData,
         loadData, 
         loadSubredditData,
         clearSubredditData }
         from '../../Features/Api/redditApiSlice.js';
import { changeCurrentPage, 
         changeCurrentFilterMethod,
         selectCurrentFilterMethod,
         selectCurrentPage,
         selectCurrentTopOfFilter,
         selectIsFromSite
         } 
    from '../../Features/CurrentPage/currentPageSlice';
import { current } from '@reduxjs/toolkit';

export default function Posts() {
  const isLoading = useSelector(selectIsLoading);
  const subredditIsLoading = useSelector(selectSubredditIsLoading);
  const subredditHasError = useSelector(selectSubredditHasError);
  const hasError = useSelector(selectHasError);
  const data = useSelector(selectData);
  const subredditData = useSelector(selectSubredditData);
  const currentPage = useSelector(selectCurrentPage);
  const filterMethodState = useSelector(selectCurrentFilterMethod);
  //const topOfFilter = useSelector(selectCurrentTopOfFilter);
  const isFromSite = useSelector(selectIsFromSite);
  const dispatch = useDispatch();

  const location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const topOfFilter = params.get('t');

  const { subreddit, filterMethod, postId } = useParams();
  //Rename makes code easier to read
  const commentsOverlayOpen = postId;
  
  const loadDataFromApi = () => {
    if(filterMethod === 'top') {
      dispatch(loadData({subreddit, filterMethod, topOfFilter}));
    } else {
      dispatch(loadData({subreddit, filterMethod}));  
    }
  }

  const loadSubredditDataFromApi = () => {
    dispatch(loadSubredditData({subreddit}));
  }

  //On page load
  useEffect(() => {
    if(!subreddit && currentPage !== 'all') {
      console.info('No subreddit specified in url loading /r/all/best');
      loadDataFromApi();
      dispatch(changeCurrentPage('all'));
      dispatch(changeCurrentFilterMethod('best'));
    }
    if(subreddit && subreddit !== currentPage) {
      console.info('Subreddit specified in url')
      if(!/all/i.test(subreddit)) {
        dispatch(changeCurrentPage(subreddit.toLowerCase()));
        if(filterMethod) {
          dispatch(changeCurrentFilterMethod(filterMethod));
        }
        loadSubredditDataFromApi();
      } else {
        dispatch(changeCurrentPage('all'));
        if(filterMethod) {
          dispatch(changeCurrentFilterMethod(filterMethod));
        }
        dispatch(clearSubredditData());
      }
      loadDataFromApi();
    }
  }, [])

  useEffect(() => {
    if(subreddit?.toLowerCase() !== currentPage && !commentsOverlayOpen) {
      dispatch(changeCurrentPage(subreddit?.toLowerCase()));
      loadDataFromApi();
      if(subreddit && !/all/i.test(subreddit)) {
        loadSubredditDataFromApi();
      } else {
        dispatch(clearSubredditData());
      }
    }
    if (filterMethod !== filterMethodState) {
      dispatch(changeCurrentFilterMethod(filterMethod));
      loadDataFromApi();
    }
  }, [subreddit, filterMethod])
  
  useEffect(() => {
  if(data) {
  if(commentsOverlayOpen) {
    dispatch(changeCurrentPage(subreddit.toLowerCase()));
    loadSubredditDataFromApi();
  }
  loadDataFromApi();
  }
  }, [topOfFilter])

    return (
    <>
    { isLoading || subredditIsLoading ? 
    <Loading /> 
    : hasError || subredditHasError ? 
    <Navigate to="/error" /> : 
    data && data.length > 0 ? 
    data.map((item, index) => <Post data={item.data} subredditData={subredditData} key={index}/>) : 
    data?.length < 1 ? 
    <NoPostsError /> :
    <p style={{color: 'red'}}>Unexpected Error: Please report this issue <a href="#">here</a></p>} 
  </>
  )
}