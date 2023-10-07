import React from 'react';
import { Interweave } from 'interweave';
import { useNavigate } from 'react-router-dom';
import { formatTime, fixRedditMarkdown, replaceRedditPreviewLinks } from '../../../utils/helperFunctions';
import './Comment.css';
import { useSelector } from 'react-redux';
import { selectNightmode } from '../../../Features/CurrentPage/currentPageSlice';

export default function Comment({data, type, margin}) {
  const nightMode = useSelector(selectNightmode);
  const navigate = useNavigate();
  return (
   <>
    { /* The last item in the comments array from reddit
         isn't a comment make sure that the data props 
         has the author key that every comment has if 
         not render nothing */ }
    { data.author ?
     <div style={margin ? {margin: `1rem 0 1rem ${margin}`} : {}} className={nightMode ? 'comment dark' : 'comment light'}>
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
        <Interweave content={replaceRedditPreviewLinks(data.body_html)} />
        : <p style={{color: '#323232'}}>{data.body}</p>}
        </div>
      </div>
    </div>
    : <></>}
  </>
  )
}
//<ReactMarkdown children={fixRedditMarkdown(data.body)} />