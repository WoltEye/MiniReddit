import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { formatTime, formatNumber, fixRedditLink } from '../../../../utils/helperFunctions';
import { Link } from 'react-router-dom';
import './PostSearchResult.css';

export default function PostSearchResult({ data, showComments, loadComments }) {
    const [ thumbnailHasError, setThumbnailHasError ] = useState(false);

    const handleClick = e => {
        if(e.target.className !== 'search-result-post-subreddit-link') {
        showComments(true);
        loadComments(data.permalink);
      }
      }

    const handleError = () => {
        setThumbnailHasError(true);
      }    

    
  return (
    <div className='search-result-container' onClick={handleClick}>
    <div className='search-result-post-additional-info'>
      <Link className='search-result-post-subreddit-link' to={`/${data.subreddit_name_prefixed}`}>{data.subreddit_name_prefixed}</Link> 
      <p className='search-result-post-dot'>•</p> 
      <p>Posted by {data.author}</p>
      <p>{formatTime(data.created_utc)}</p>
    </div>
    <div className='search-result-body link'>
      <h2 className='search-result-post-title'>{data.title}</h2>
      { data.thumbnail !== 'self' && data.thumbnail !== 'default' && !thumbnailHasError ?
      <div className='search-result-thumbnail-container link'>
        <img 
        className='search-result-thumbnail link' 
        src={fixRedditLink(data.thumbnail)}
        onError={handleError} /> 
      </div>
      : <></>
    }
      </div> 
      <div className='search-result-footer link'>
        <p>{formatNumber(data.ups)} Upvotes</p>    
        <p>{formatNumber(data.num_comments)} Comments</p>
      </div>
  </div>
  )    
}