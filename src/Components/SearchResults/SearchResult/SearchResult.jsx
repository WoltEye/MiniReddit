import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNightmode } from '../../../Features/CurrentPage/currentPageSlice';
import './SearchResult.css';
import PostSearchResult from './PostSearchResult/PostSearchResult';
import SubredditSearchResult from './SubredditSearchResult/SubredditSearchResult';
import UserSearchResult from './UserSearchResult/UserSearchResult';

export default function SearchResult({type, data, loadComments, showComments}) {
  const nightMode = useSelector(selectNightmode);

  return (
    <div className={nightMode ? `search-result dark ${type}` : `search-result light ${type}`}>
    {
      type === 'link' ? 
      <PostSearchResult 
      data={data}
      loadComments={loadComments}
      showComments={showComments}/>
    : type === 'sr' ?
      <SubredditSearchResult
       data={data} />
    : type === 'user' ? 
      <UserSearchResult 
      data={data}/>
    :  <></>  
    }
    </div>
  )
}