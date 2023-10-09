import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectNightmode } from '../../../Features/CurrentPage/currentPageSlice';
import { shortenLink, reformatCommentUrl, formatNumber, formatTime, fixRedditMarkdown, removeAmp } from '../../../utils/helperFunctions';
import './UserComment.css';
import PostCommentsSVG from '../../../assets/PostCommentsSVG';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useMediaQuery } from 'react-responsive';

export default function UserComment({ data, showComments }) {
  const nightMode = useSelector(selectNightmode);
  const navigate = useNavigate();

  const handleShowComments = e => {
    if(e.target.className !== 'user-comment-subreddit' &&
       e.target.className !== 'user-commment-link-author') {
      showComments(reformatCommentUrl(data.permalink));
    }
  }

  const isMediumSize = useMediaQuery({ query: '(max-width: 830px)' });
  const isSmallSize = useMediaQuery({ query: '(max-width: 500px)' });
  const isMicroSize = useMediaQuery({ query: '(max-width: 450px)' });
  const isReallyFSmall = useMediaQuery({ query: '(max-width: 405px)' });

  return (
    <div 
    className={nightMode ? 'user-comment dark' : 'user-comment light'}
    onClick={handleShowComments}>
      <div className='user-comment-content-container'>
        <div className='user-comment-text-container'>
          { !isMediumSize &&
          <PostCommentsSVG userComment={true}/>
          }
          
          { !isReallyFSmall &&
          <>
          <p>
            {data.author} commented on 
          </p>
          <p className='user-comment-commented-on'>
            { !isMediumSize && !isSmallSize && !isMicroSize ?
            shortenLink(data.link_title, 40) :
              isMediumSize && !isSmallSize && !isMicroSize ?
            shortenLink(data.link_title, 30) :
              isSmallSize && !isMicroSize ?
            shortenLink(data.link_title, 20) :
            shortenLink(data.link_title, 10) }
          </p>
          <p className='user-comment-dot'>
            •
          </p>
          <p 
          className='user-comment-subreddit'
          onClick={() => {  navigate(`/${data.subreddit_name_prefixed}`) }}>
            {data.subreddit_name_prefixed}
          </p>
          </>
          }
          { !isMediumSize &&
          <p className='user-comment-dot'>
            •
          </p>
          }
          { !isMediumSize &&
          <p 
          className='user-commment-link-author'
          onClick={() => { navigate(`/user/${data.link_author}`) }}>
            Posted by {data.link_author}  
          </p>
          }
        </div>
        { !isReallyFSmall && 
        <hr />
        }
        <div className='user-comment-body'>
          <div className='user-comment-body-content-container'>
          <div className='user-comment-body-text-container'>
              <p className='user-comment-author'>{data.author}</p>
              <p className='user-comment-points'>{formatNumber(data.score)} Points</p>
              <p className='user-comment-dot'>•</p>
              <p className='user-comment-created-at'>{formatTime(data.created_utc)}</p>
            </div>
              <ReactMarkdown
               children={fixRedditMarkdown(removeAmp(data.body))} />
           </div>
        </div>
      </div>
    </div>
  )
}