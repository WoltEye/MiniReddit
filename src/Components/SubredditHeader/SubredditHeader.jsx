import React from 'react';
import { fixRedditLink } from '../../utils/helperFunctions';
import './SubredditHeader.css';
import { useSelector } from 'react-redux';
import { selectNightmode } from '../../Features/CurrentPage/currentPageSlice';
import { selectIsLoading, selectSubredditIsLoading } from '../../Features/Api/redditApiSlice';

export default function SubredditHeader({subredditData}) {
  const darkMode = useSelector(selectNightmode);
  const isLoading = useSelector(selectIsLoading);
  const subredditIsLoading = useSelector(selectSubredditIsLoading);

  return (
    <>
    { !isLoading && !subredditIsLoading ?
    <div className='subreddit-header'>
      <div className='subreddit-header-container'>
        { subredditData.banner_background_image ? 
        <div 
        className='subreddit-hero-bg'
        style={{backgroundImage: `url(${fixRedditLink(subredditData.banner_background_image)})`}}></div> 
        : subredditData.header_img ?
        <div 
        className='subreddit-hero-bg'
        style={{backgroundImage: `url(${fixRedditLink(subredditData.header_img)})`}}></div> 
        : <div className='subreddit-hero'></div>}
      </div>
      <div className={darkMode ? 'subreddit-header-content-container dark' :
      'subreddit-header-content-container light'}>
       { subredditData.community_icon ? 
       <div className='subreddit-header-icon-container'>
       <img 
        src={fixRedditLink(subredditData.community_icon)}
        className={darkMode ? 'subreddit-header-icon dark' : 'subreddit-header-icon light'}
        alt=''/>
        </div>
      : subredditData.icon_img ? 
        <div className='subreddit-header-icon-container'>
        <img src={subredditData.icon_img}
        className={darkMode ? 'subreddit-header-icon dark' : 'subreddit-header-icon light'}/>
        </div>
        : <div className='subreddit-icon-error'></div>
      }
        <div className='subreddit-header-text-container'>
        <h2 
        className={darkMode ? 'subreddit-header-title dark' : 
        'subreddit-header-title light'}>
          {subredditData.title}
        </h2>
        <p className={darkMode ? 'subreddit-header-prefix dark' : 'subreddit-header-prefix light'}>{subredditData.url}</p>
        </div>
      </div>
    </div>
    : <div className='subreddit-header-loading-box'></div>
  }
  </>
  )
}