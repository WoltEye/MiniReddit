import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams, useLocation } from 'react-router-dom';
import { clearEverything, clearSubredditData, loadComments, loadMoreUserPosts, loadUserData, selectIsLoading, selectNewUserPostsIsLoading, selectUserData, selectUserProfile } from '../../Features/Api/redditApiSlice';
import Post from '../Posts/Post/Post';
import UserComment from './UserComment/UserComment';
import './UserFeed.css';
import { changeCurrentPage, changeCurrentUserFeedTimeFilter, changeCurrentUserFeedFilter, resetUserFeedFilter, selectCurrentUserFeedFilter, selectCurrentUserFeedTimeFilter, selectNightmode, selectCurrentUserFeedPopularityFilter, changeCurrentUserFeedPopularityFilter } from '../../Features/CurrentPage/currentPageSlice';
import Spinner from '../Spinner/Spinner';
import CommentsOverlay from '../CommentsOverlay/CommentsOverlay.jsx';
import Loading from '../Posts/Loading/Loading';
import UserFeedTypeSelector from './UserFeedTypeSelector/UserFeedTypeSelector';
import UserFeedFilterSelector from './UserFeedFilterSelector/UserFeedFilterSelector';

export default function UserProfile() {
  const [ showComments, setShowComments ] = useState(false);
  //Very lazy and ugly way to prevent useEffect fetching 10000000 times Todo: Find a better way to fix this
  const [ pageLoaded, setPageLoaded ] = useState(false);
  const userData = useSelector(selectUserData);
  const nightMode = useSelector(selectNightmode);
  const userProfile = useSelector(selectUserProfile);
  const isLoading = useSelector(selectIsLoading);
  const userFeedTimeFilter = useSelector(selectCurrentUserFeedTimeFilter);
  const userFeedPopularityFilter = useSelector(selectCurrentUserFeedPopularityFilter);
  const newUserPostsIsLoading = useSelector(selectNewUserPostsIsLoading);
  const dispatch = useDispatch();
  const { username, userFeedFilter } = useParams();
  const location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const sort = params.get('sort');
  const time = params.get('t');


  const handleLoadMore = () => {{
    dispatch(loadMoreUserPosts({ username, after: userData.data.after, sort, time }));
    }
  }

  const handleOpenThread = (url) => {
    dispatch(loadComments(url));
    setShowComments(true);
  }

  useEffect(() => {
    if(userFeedFilter) {
      dispatch(changeCurrentUserFeedFilter(userFeedFilter));
    }
    if(time && time !== userFeedTimeFilter) { 
      dispatch(changeCurrentUserFeedTimeFilter(time));
    }
    if(sort && sort !== userFeedPopularityFilter) {
      dispatch(changeCurrentUserFeedPopularityFilter(sort));
    }
    dispatch(clearSubredditData());
    dispatch(loadUserData({ username, filter: userFeedFilter, time, sort }));
    dispatch((changeCurrentPage('userFeed')));
    /*setPageLoaded(true) prevents the other useEffect
      from firing during the first page load and making
      another fetch request (I know this is not optimal, its just
      temporary fix for the issue)*/
    setPageLoaded(true);
    return () => {
      dispatch(clearEverything());
      dispatch(resetUserFeedFilter());
      setPageLoaded(false);
    }
  }, [])

  useEffect(() => {
    if(userData && userProfile && !isLoading && pageLoaded) {
        dispatch(loadUserData({ username, filter: userFeedFilter, sort, time}))
        if(time && time !== userFeedTimeFilter) { 
          dispatch(changeCurrentUserFeedTimeFilter(time));
        }
        if(sort && sort !== userFeedPopularityFilter) {
          dispatch(changeCurrentUserFeedPopularityFilter(sort));
        }
    }
  }, [username, userFeedFilter, sort, time])

  return (
    <>
    <UserFeedTypeSelector />
    <UserFeedFilterSelector />
    <div className={nightMode ? 'user-feed dark' : 'user-feed light'}>
    { showComments && <CommentsOverlay 
    disableDefaultBehaviour={true}
    showComments={setShowComments}/> }
    { isLoading ? <Loading /> : 
    !isLoading && userData.data?.children.length > 0 ?
      userData.data?.children.map((item, index) => {
        if(item.kind === 't3') {
         return <Post 
         userFeed={true}
         showComments={setShowComments}
         data={item.data} 
         key={index}/>
        }
        if(item.kind === 't1') {
          return <UserComment 
          data={item.data}
          key={index}
          showComments={handleOpenThread}/>
        } else {
          return <></>
        }
      })
      : userData.error === 403 ? 
       <div className='user-feed-error banned'>
        <h2>:D</h2>
        <p>User Banned</p>
       </div>
      : userData.data?.children.length < 1 ?
        <div className='user-feed-no-posts-error'>
          <h2 className='user-feed-no-posts-header'>:(</h2>
          <p className='user-feed-no-posts-paragrapgh'>No posts found by {userProfile.data?.name}</p>  
        </div>
      : userData.error === 404 ?
      <div className='user-feed-error'>
      <h2>:(</h2>
      <p>User not found</p>  
     </div> :
     userData.error === '429' || userProfile.error === 429 ?
     <Navigate to='/error' /> :
      <Loading />
    }
    { userData.data?.after && !newUserPostsIsLoading ?
      <button 
      className={nightMode ? 'user-feed-load-more dark' : 'user-feed-load-more light'}
      onClick={handleLoadMore}>
        Load More
      </button>
      : newUserPostsIsLoading ?
      <Spinner nightMode={nightMode}/>
      : <></>
    }
    </div>
    </>
  )
}