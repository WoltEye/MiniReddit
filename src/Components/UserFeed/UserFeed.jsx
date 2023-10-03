import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { clearEverything, clearSubredditData, loadComments, loadMoreUserPosts, loadUserData, selectIsLoading, selectNewUserPostsIsLoading, selectUserData, selectUserProfile } from '../../Features/Api/redditApiSlice';
import Post from '../Posts/Post/Post';
import UserComment from './UserComment/UserComment';
import './UserFeed.css';
import { changeCurrentPage, changeCurrentUserFeedFilter, resetUserFeedFilter, selectCurrentUserFeedFilter, selectNightmode } from '../../Features/CurrentPage/currentPageSlice';
import Spinner from '../Spinner/Spinner';
import CommentsOverlay from '../CommentsOverlay/CommentsOverlay.jsx';
import Loading from '../Posts/Loading/Loading';
import UserFeedTypeSelector from './UserFeedTypeSelector/UserFeedTypeSelector';

export default function UserProfile() {
  const [ showComments, setShowComments ] = useState(false);
  const userData = useSelector(selectUserData);
  const nightMode = useSelector(selectNightmode);
  const userProfile = useSelector(selectUserProfile);
  const isLoading = useSelector(selectIsLoading);
  const newUserPostsIsLoading = useSelector(selectNewUserPostsIsLoading);
  const dispatch = useDispatch();
  const { username, userFeedFilter } = useParams();

  const handleLoadMore = () => {
    if(!userFeedFilter) {
      dispatch(loadMoreUserPosts({ username, after: userData.data.after }));
    } else {
        dispatch(loadMoreUserPosts({ username, after: userData.data.after, filter: userFeedFilter }));  
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
    dispatch(clearSubredditData());
    dispatch(loadUserData({ username, filter: userFeedFilter }));
    dispatch((changeCurrentPage('userFeed')));
    return () => {
      dispatch(clearEverything());
      dispatch(resetUserFeedFilter());
    }
  }, [])

  useEffect(() => {
    if(userData && userProfile && !isLoading) {
      if(!userFeedFilter) {
        dispatch(loadUserData({ username }));
      } else {
        dispatch(loadUserData({ username, filter: userFeedFilter }))
      }
    }
  }, [username, userFeedFilter])

  return (
    <>
    <UserFeedTypeSelector />
    <div className={nightMode ? 'user-feed dark' : 'user-feed light'}>
    { showComments && <CommentsOverlay 
    disableDefaultBehaviour={true}
    showComments={setShowComments}/> }
    { !isLoading && userData.data?.children.length > 0 ?
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