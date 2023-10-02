import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Posts from '../../Components/Posts/Posts';
import Spinner from '../../Components/Spinner/Spinner';
import SubredditInfo from '../../Components/SubredditInfo/SubredditInfo';
import { selectHasError, 
         selectIsLoading, 
         selectData, 
         selectShowComments,
         selectNewIsLoading,
         selectAfter,
         selectCurrentTopOfFilter,
         loadData,
         loadMoreData, 
         selectSubredditHasError,
         loadSubredditData,
         selectSubredditData } 
         from '../Api/redditApiSlice';
import { changeCurrentPage, 
         selectCurrentPage, 
         selectCurrentFilterMethod, 
         changeCurrentFilterMethod, 
         selectNightmode} 
         from './currentPageSlice';
import './CurrentPage.css';


export default function CurrentPage() {

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  //newIsLoading used if new data is loaded to the current page
  const newIsLoading = useSelector(selectNewIsLoading);
  const hasError = useSelector(selectHasError);
  const after = useSelector(selectAfter);
  const subredditHasError = useSelector(selectSubredditHasError);
  const nightMode = useSelector(selectNightmode);
  const subredditData = useSelector(selectSubredditData);

  const { subreddit, filterMethod } = useParams();

  const loadMoreDataFromApi = () => {
    dispatch(loadMoreData({subreddit: subreddit, after: after, filterMethod}));
  }

  return (
    <>
    <Outlet />
    <section className='posts'>
    { !hasError && !subredditHasError && subredditData &&
     <SubredditInfo />
    }
    <Posts />
    </section>
    { newIsLoading && <Spinner nightMode={nightMode} /> }
    {!isLoading && !newIsLoading && !hasError && after && !subredditHasError &&
    <button
    className={nightMode ? 'load-more dark' : 'load-more light'} 
    onClick={loadMoreDataFromApi}>
      Load More
    </button> 
    }
    </>
  )
}
