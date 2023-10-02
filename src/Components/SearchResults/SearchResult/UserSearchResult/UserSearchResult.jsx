import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectNightmode } from '../../../../Features/CurrentPage/currentPageSlice';
import { fixRedditLink, formatNumber } from '../../../../utils/helperFunctions';
import './UserSearchResult.css';

export default function UserSearchResult({data}) {
  const nightMode = useSelector(selectNightmode);
  const navigate = useNavigate();
  
  const handleUserClick = () => {
    navigate(`/user/${data.name}`);
  }
  return (
       <div 
       className={nightMode ? 'user-search-result dark' : 'user-search-result light'}
       onClick={handleUserClick}>
      <div className='user-search-result-content-container'>
      <div className='user-search-result-icon-container'>
      <img
      className='user-search-result-icon' 
      src={fixRedditLink(data.icon_img)}/>
      </div>
      <div className='user-search-result-text-container'>
        <div className='user-serach-result-text-content-container'>
        <p>{data.name}</p>
        <p className='user-search-result-dot'>•</p>
        <p className='user-search-result-karma'>{formatNumber(data.link_karma + data.comment_karma)} karma</p>
        </div>
        <p className='user-search-result-description'>{data.subreddit?.public_description}</p>
      </div>
      </div>
    </div>
  )
}