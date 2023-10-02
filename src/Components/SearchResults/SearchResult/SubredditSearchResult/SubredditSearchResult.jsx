import React, { useEffect } from 'react';
import './SubredditSearchResult.css';
import { shortenLink, fixRedditLink } from '../../../../utils/helperFunctions';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectNightmode } from '../../../../Features/CurrentPage/currentPageSlice';
import { selectIsLoading } from '../../../../Features/Api/redditApiSlice';

export default function SubredditSearchResult({ data }) {
  const nightMode = useSelector(selectNightmode);
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();

  const handleSubredditSearchResultClick = () => {
    navigate(`/${data.display_name_prefixed}`)
  }

  return (
    <>
    { data && !isLoading ? 
      <div 
      className={nightMode ? 'subreddit-search-result dark' : 'subreddit-search-result light'}
      onClick={handleSubredditSearchResultClick}>
        <div className='subreddit-search-result-content-container'>
        { data.community_icon ? 
        <div className='subreddit-search-result-icon-container'>
          <img 
          src={fixRedditLink(data.community_icon)}
          className='subreddit-search-result-icon'
          alt=''/>
        </div>
      : data.icon_img ? 
        <div className='subreddit-search-result-icon-container'>
          <img src={data.icon_img}
          className='subreddit-search-result-icon'/>
        </div>
        : <div className='subreddit-search-result-icon-error'></div> }
        <div className='subreddit-search-result-text-container'>
          <h3>{data.display_name_prefixed}</h3>
          <p>{shortenLink(data.public_description, 100)}</p>
        </div>
        </div>
      </div>
      : <></>
    }
    </>
  )
}