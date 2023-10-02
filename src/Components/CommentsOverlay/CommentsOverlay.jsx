import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Comment from './Comment/Comment.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentComments, loadComments } from '../../Features/Api/redditApiSlice.js';
import { changeCurrentPage, selectIsFromSite, selectNightmode, toggleIsFromSite } from '../../Features/CurrentPage/currentPageSlice.js';
import './CommentsOverlay.css';
import Post from '../Posts/Post/Post.jsx';
import NoCommentsSVG from '../../assets/NoCommentsSVG.jsx';

export default function CommentsOverlay({disableDefaultBehaviour, showComments}) {
  const navigate = useNavigate();
  const commentsData = useSelector(selectCurrentComments);
  const isFromSite = useSelector(selectIsFromSite);
  const nightMode = useSelector(selectNightmode);
  const dispatch = useDispatch();
  const { subreddit, postId, postName } = useParams();
  const fetchParams = `/r/${subreddit}/comments/${postId}/${postName}`;


  //Used to render new comments untill the comment has no replies
  const findReplyChain = comment => {
    const replies = [];
    for(const reply in comment.replies.children) {
    }
  }

  const handleClose = e => {
    /* Prevents onClick spreading to children */
    if(e.target.className === 'comments-overlay-bg' ||
       e.target.className === 'comments dark'       ||
       e.target.className === 'comments light') {
    /* Prevents navigate(-1) going out of the page
       if the comments are opened using a button or
       a link from the website the site can use navigate(-1)
       to get back to the page where the link was pressed
       if the comment section was opened with a external
       link it uses .. to get back to the subreddit the
       post belongs to */
     if(isFromSite) {
      navigate(-1);
      dispatch(toggleIsFromSite());
     } else if (disableDefaultBehaviour) {
       showComments(false);
    } else {
      navigate('..' + '/best');
    }
    }
  }
  
  useEffect(() => {
    if(!disableDefaultBehaviour) {
    dispatch(loadComments(fetchParams));
    }
    console.log(disableDefaultBehaviour);
    console.log(postId);
  }, []);

  return (
    <>
    { (postId || disableDefaultBehaviour) &&
    <div 
    className='comments-overlay-bg'
    onClick={handleClose}>
      <div className={nightMode ? 'comments dark' : 'comments light'}>
      <button className='close-button'>x</button>
       { commentsData && <Post 
       data={commentsData[0]?.data.children[0].data}
       previewPage={true}/> }
      <div className='comments-container'>
        <div className='comments-content-container'> 
        {
         commentsData && commentsData[1].data.children.length > 0 ? commentsData[1].data.children.map((comment, index) => {
          return ( 
          <Comment data={comment.data} key={index}/>
          )
        })
        : commentsData && commentsData[1].data.children.length === 0 ?
        <div className='no-comments-alert'>
          <div className='no-comments-alert-content-container'>
            <NoCommentsSVG />
            <h1>No comments here</h1>
            <h2>:(</h2>
          </div>
        </div> :
        <h1>Loading...</h1> 
        }
        </div>
      </div>
      </div>
    </div>
    }
    </>
    )
}