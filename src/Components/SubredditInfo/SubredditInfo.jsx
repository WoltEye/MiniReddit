import React from 'react';
import CakeSVG from '../../assets/CakeSVG';
import { useSelector } from 'react-redux';
import { selectIsLoading, selectSubredditData, selectSubredditIsLoading } from '../../Features/Api/redditApiSlice';
import { selectNightmode } from '../../Features/CurrentPage/currentPageSlice';
import { convertUnixTimpestamp, formatNumber } from '../../utils/helperFunctions';
import './SubredditInfo.css';

export default function SubredditInfo() {
  const subredditData = useSelector(selectSubredditData);
  const nightMode = useSelector(selectNightmode);
  const isLoading = useSelector(selectIsLoading);
  const subredditIsLoading = useSelector(selectSubredditIsLoading);
  return (
    <>
    { !isLoading && !subredditIsLoading &&
      <div className={nightMode ? 'subreddit-info dark' : 'subreddit-info light'}>
      <div className='subreddit-info-content-container'>
      <div className='subreddit-info-header'>
        <h3 className='subreddit-info-main-header'>About community</h3>
        <p className='subreddit-info-desc'>{subredditData.public_description}</p>
        <div 
        className='subreddit-created-date'
        aria-hidden="true">
        <CakeSVG />
        <p className='subreddit-info-created'>
          Created {convertUnixTimpestamp(subredditData.created)}
        </p>
        </div>
      </div>
      <hr />
      <div className='subreddit-info-body'>
        <div 
        className='subreddit-subscribers'
        aria-hidden="true">
          <p>
            { formatNumber(subredditData.subscribers) }
          </p>
          <p className='subreddit-info-body-key'>
            Members
          </p>
          </div>
          <div className='subreddit-info-users-online'>
            <p className='subreddit-info-users-users-online-value'>
              <span className='online-icon' aria-hidden="true"></span>
              { formatNumber(subredditData.accounts_active) }  
            </p>
            <p className='subreddit-info-body-key'>
              Online
            </p>
          </div>      
      </div>
      </div>
    </div>
   }
    </>
  )
}