import React from 'react';
import ReactMarkdown from 'react-markdown'
import { useNavigate } from 'react-router-dom';
import { formatTime, fixRedditMarkdown } from '../../../utils/helperFunctions';
import './Comment.css';
import { useSelector } from 'react-redux';
import { selectNightmode } from '../../../Features/CurrentPage/currentPageSlice';

export default function Comment({data}) {
  const nightMode = useSelector(selectNightmode);
  const navigate = useNavigate();
  return (
   <>
    { /* The last item in the comments array from reddit
         isn't a comment make sure that the data props 
         has the author key that every comment has if 
         not render nothing */ }
    { data.author ?
     <div className={nightMode ? 'comment dark' : 'comment light'}>
      <div className='comment-content-container'> 
        <div className='comment-header'>
        <h2 
        style={data.author === '[deleted]' ? {color: 'red'} : nightMode ? {color: 'whitesmoke'} : {color: 'black'} }
        className='comment-author'
        onClick={() => { navigate(`/user/${data.author}`) }}>
        {data.author}
        </h2>
        <p className='comment-dot'>•</p>
        <p className='comment-created-ago'>{ data.created_utc !== undefined ? formatTime(data.created_utc) : 'huh?' }</p>
        </div>
        <div className='comment-body'>
        { data.body !== '[removed]' ?
        <ReactMarkdown children={fixRedditMarkdown(data.body)} />
        : <p style={{color: '#323232'}}>{data.body}</p>}
        </div>
      </div>
    </div> 
    : <></>}
  </>
  )
}