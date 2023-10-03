import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectNightmode } from '../../../Features/CurrentPage/currentPageSlice';
import { shortenLink, reformatCommentUrl, formatNumber, formatTime, fixRedditMarkdown, removeAmp } from '../../../utils/helperFunctions';
import './UserComment.css';
import PostCommentsSVG from '../../../assets/PostCommentsSVG';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function UserComment({ data, showComments }) {
  const nightMode = useSelector(selectNightmode);
  const navigate = useNavigate();

  const handleShowComments = e => {
    if(e.target.className !== 'user-comment-subreddit' &&
       e.target.className !== 'user-commment-link-author') {
      showComments(reformatCommentUrl(data.permalink));
    }
  }

  return (
    <div 
    className={nightMode ? 'user-comment dark' : 'user-comment light'}
    onClick={handleShowComments}>
      <div className='user-comment-content-container'>
        <div className='user-comment-text-container'>
          <PostCommentsSVG userComment={true}/>
          <p>
            {data.author} commented on 
          </p>
          <p className='user-comment-commented-on'>
            {shortenLink(data.link_title, 40)}
          </p>
          <p className='user-comment-dot'>
            •
          </p>
          <p 
          className='user-comment-subreddit'
          onClick={() => {  navigate(`/${data.subreddit_name_prefixed}`) }}>
            {data.subreddit_name_prefixed}
          </p>
          <p className='user-comment-dot'>
            •
          </p>
          <p 
          className='user-commment-link-author'
          onClick={() => { navigate(`/user/${data.link_author}`) }}>
            Posted by u/{data.link_author}
          </p>
        </div>
        <hr />
        <div className='user-comment-body'>
          <div className='user-comment-body-content-container'>
          <div className='user-comment-body-text-container'>
              <p className='user-comment-author'>{data.author}</p>
              <p>{formatNumber(data.score)} Points</p>
              <p className='user-comment-dot'>•</p>
              <p>{formatTime(data.created_utc)}</p>
            </div>
              <ReactMarkdown
               children={fixRedditMarkdown(removeAmp(data.body))} 
               remarkPlugins={[remarkGfm]}/>
           </div>
        </div>
      </div>
    </div>
  )
}