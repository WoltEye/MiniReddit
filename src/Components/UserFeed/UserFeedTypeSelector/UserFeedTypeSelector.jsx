import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentUserFeedFilter, selectCurrentUserFeedFilter, selectNightmode } from '../../../Features/CurrentPage/currentPageSlice';
import { Link, useParams } from 'react-router-dom';
import './UserFeedTypeSelector.css';
import { clearUserData } from '../../../Features/Api/redditApiSlice';

export default function UserFeedTypeSelector() {
  const nightMode = useSelector(selectNightmode);
  const currentUserFeedFilter = useSelector(selectCurrentUserFeedFilter);
  const { username } = useParams();
  const dispatch = useDispatch();
  return (
    <div className={nightMode ? 'user-feed-type-selector dark' : 'user-feed-type-selector light'}>
     <Link 
     to={`/user/${username}`}
     onClick={() => { 
      dispatch(clearUserData());
      dispatch(changeCurrentUserFeedFilter('overview')) 
     }}>
      <div 
      className={currentUserFeedFilter === 'overview' ? 
      'user-feed-type active'
     : 'user-feed-type'}>
        <p>Overview</p>
      </div>
    </Link>
    <Link 
    to={`/user/${username}/submitted`}
    onClick={() => { 
      dispatch(clearUserData());
      dispatch(changeCurrentUserFeedFilter('submitted')) 
    }}>
      <div className={currentUserFeedFilter === 'submitted' ? 
      'user-feed-type active'
     : 'user-feed-type'}>
        <p>Posts</p>
      </div>
    </Link>
    <Link 
    to={`/user/${username}/comments`}
    onClick={() => { 
      dispatch(clearUserData());  
      dispatch(changeCurrentUserFeedFilter('comments')) 
    }}>
      <div className={currentUserFeedFilter === 'comments' ? 
      'user-feed-type active'
     : 'user-feed-type'}>
        <p>Comments</p>
      </div>
    </Link>
    </div>
  )
}