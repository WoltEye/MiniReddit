import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Comment from './Comment/Comment.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentComments, loadComments, selectIsLoading, selectCommentsIsLoading } from '../../Features/Api/redditApiSlice.js';
import { changeCurrentCommentFilter, changeCurrentPage, selectCurrentCommentFilter, selectIsFromSite, selectNightmode, toggleIsFromSite } from '../../Features/CurrentPage/currentPageSlice.js';
import './CommentsOverlay.css';
import Post from '../Posts/Post/Post.jsx';
import NoCommentsSVG from '../../assets/NoCommentsSVG.jsx';
import CommentOverlayFilterSelector from './CommentOverlayFilterSelector/CommentOverlayFilterSelector.jsx';

export default function CommentsOverlay({disableDefaultBehaviour, showComments}) {
  const [ filterChangeAmount, setFilterChangeAmount ] = useState(0);
  /* Another quick fix to prevent useEffect from fetching multiple times when the page is intially loaded
     could be done much cleaner and easier but would require days of refactoring the code. Maybe doing that some time... idk */
  const [ initialPageLoadStatus, setInitialPageLoadStatus ] = useState(false);

  const navigate = useNavigate();
  const commentsData = useSelector(selectCurrentComments);
  const isFromSite = useSelector(selectIsFromSite);
  const nightMode = useSelector(selectNightmode);
  const commentsIsLoading = useSelector(selectCommentsIsLoading);
  const currentCommentFilter = useSelector(selectCurrentCommentFilter);
  const dispatch = useDispatch();
  const { subreddit, postId, postName } = useParams();
  const fetchParams = `/r/${subreddit}/comments/${postId}/${postName}`;

  const location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const sort = params.get('sort');

  const renderReplyChain = (chain, margin) => {
    //Should not happen but if happens does not crash the app
    if(chain === undefined) { 
      return 'error';
    }
    return chain.map((reply, index) => {
      return (
       <React.Fragment key={`reply${reply.data.id}`}>
       <Comment data={reply.data} margin={!margin ? '20px' : '40px'} type='reply'/>
      { reply.data.replies && renderReplyChain(reply.data.replies.data.children, '40px') }
        </React.Fragment>
       )
    })
  }


//<Comment type='reply' data={reply.data} />
  const handleClose = e => {
    /* Prevents onClick spreading to children */
    if(e.target.className === 'comments-overlay-bg' ||
       e.target.className === 'comments dark'       ||
       e.target.className === 'comments light'      ||
       e.target.className === 'close-button') {
    /* Prevents navigate(-1) going out of the page
       if the comments are opened using a button or
       a link from the website the site can use navigate(-1)
       to get back to the page where the link was pressed
       if the comment section was opened with a external
       link it uses .. to get back to the subreddit the
       post belongs to */
    /*  filterChangeAmount tracks how many times the comment filter has been changed
        so that the close button doesn't send the user back to the same comment page
        again. Im completely aware how scuffed this current system is but remaking
        it would take days or even weeks I think im ready to move to the next project :D  */
     if(isFromSite) {
      if(filterChangeAmount === 0) {
      navigate(-1);
      } else {
        navigate(filterChangeAmount - 1);
      }
      dispatch(toggleIsFromSite());
     } else if (disableDefaultBehaviour) {
       showComments(false);
    } else {
      navigate('..' + '/best');
    }
    }
  }
  
  useEffect(() => {
    if(sort) {
      dispatch(changeCurrentCommentFilter(sort));
    }
    if(!disableDefaultBehaviour) {
    dispatch(loadComments({ fetchParams, sort }));
    }
    setInitialPageLoadStatus(true);
    return () => {
      setFilterChangeAmount(0);
      setInitialPageLoadStatus(false);
      dispatch(changeCurrentCommentFilter(''));
    }
  }, []);

  useEffect(() => {
    if(sort) {
      dispatch(changeCurrentCommentFilter(sort));
    }
    if(commentsData && initialPageLoadStatus) {
      dispatch(loadComments({fetchParams, sort}));
      setFilterChangeAmount(prev => prev - 1);
    }
  }, [sort])

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
        { !commentsIsLoading && !showComments &&
          <CommentOverlayFilterSelector /> 
        }
        {
         commentsData && commentsData[1].data.children.length > 0 ? commentsData[1].data.children.map((comment, index) => {
          return (
          <div className='comment-n-replies' key={comment.data.id}>
          <Comment data={comment.data} key={index}/>
          { comment.data.replies ? renderReplyChain(comment.data.replies.data.children) : <></> }
          </div>
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