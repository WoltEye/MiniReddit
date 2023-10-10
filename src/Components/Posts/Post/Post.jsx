import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown'
import { Interweave } from 'interweave';
//Using ReactHlsPlayer because html video player doesn't support hls file format
import ReactHlsPlayer from '@ducanh2912/react-hls-player';
import DownArrowSVG from '../../../assets/DownArrowSVG';
import UpArrowSVG from '../../../assets/UpArrowSVG.jsx';
import { toggleNotification } from '../../NotificationOverlay/notificationOverlaySlice';
import { selectCurrentPage, selectNightmode, toggleIsFromSite } from '../../../Features/CurrentPage/currentPageSlice';
import { fixRedditLink, formatNumber, formatTime, shortenLink, convertToEmbeddedURL, removeAmp, fixRedditMarkdown } from '../../../utils/helperFunctions';
import './Post.css'
import LinkSVG from '../../../assets/LinkSVG';
import PostCommentsSVG from '../../../assets/PostCommentsSVG';
import ImageSlide from './ImageSlide/ImageSlide';
import remarkGfm from 'remark-gfm';
import { loadComments } from '../../../Features/Api/redditApiSlice';
import { useMediaQuery } from 'react-responsive';

export default function Post({data, previewPage, userFeed, showComments}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPage = useSelector(selectCurrentPage);
  const nightMode = useSelector(selectNightmode);

  const toggleNotificationOverlay = () => {
    dispatch(toggleNotification());
  }

  const handleOpenPost = (e) => {
    //Prevents clicking buttons/links from opening the comments section
    const validClassNames = 
    [
     'post-title',
     'post-body',
     'post-content-container normal',
     'post-created-ago',
     'thumbnail'
    ]
    if(validClassNames.includes(e.target.className) && !userFeed || 
       e.target.tagName === 'P' && e.target.className !== 'post-subreddit-link link-disabled' && e.target.className !== 'post-created-by' &&  !userFeed) {
      navigate(data.permalink);
      dispatch(toggleIsFromSite());
    } else if(userFeed && validClassNames.includes(e.target.className) ||
      e.target.tagName === 'P' && e.target.className !== 'post-subreddit-link link-disabled' && userFeed) {
      showComments(true);
      dispatch(loadComments({fetchParams: data.permalink}));
    } 
  }
  const handlePostClick = () => {
    dispatch(toggleIsFromSite());
  }

  const isSmallishSize = useMediaQuery({ query: '(max-width: 550px)' });
  const isSmallSize = useMediaQuery({ query: '(max-width: 500px)' });

  return (
    <div className={nightMode && !previewPage ? 'post dark' 
                   : !nightMode && !previewPage ? 'post light'
                   : nightMode && previewPage ? 'post dark preview' 
                   : !nightMode && previewPage ? 'post light preview'
                   : 'post'
                   }>
        <div className='post-sidebar'>
        <button 
        className='vote-button'
        aria-hidden="true"
        onClick={!previewPage ? toggleNotificationOverlay : 
        () => { }}>
          <UpArrowSVG width={isSmallishSize ? '40' : null} height={isSmallishSize ? '40' : null}/>
          </button>
          <p className='score'>
            {data.score < 1000 ? data.score : 
            formatNumber(data.score)}
          </p>
          <button 
          className='vote-button'
          aria-hidden="true"
          onClick={!previewPage ? toggleNotificationOverlay : 
          () => { }}>
          <DownArrowSVG width={isSmallishSize ? '40' : null} height={isSmallishSize ? '40' : null}/>
          </button>
        </div>
      <div 
      className={previewPage ? 'post-content-container preview' : 'post-content-container normal'} 
      onClick={!previewPage ? handleOpenPost : null}>
        <div 
        className='additional-info' >
          { currentPage !== data.subreddit ?
          <Link 
          to={`/${data.subreddit_name_prefixed}/best#`}
          className='post-subreddit-link'>{data.subreddit_name_prefixed}</Link> 
          : <p className='post-subreddit-link link-disabled'>{data.subreddit_name_prefixed}</p>
          }
          <p 
          className='dot'>•</p>
          <p 
          className='post-created-by'
          onClick={() => { navigate(`/user/${data.author}`) }}>
           Posted by {data.author}
          </p>
          { !isSmallSize &&
          <p className='post-created-ago'>
            { formatTime(data.created_utc) }
          </p>
          }
        </div>
        <div 
        className='post-body'>
        <h4 
        className='post-title'>
          {removeAmp(data.title)}
         </h4>
        { data.preview?.images && !data.is_video ?
        <img
        src={fixRedditLink(data.preview.images[0].source.url)}
        alt="Cant Load Thumbnail"
        style={ data.preview.images[0].source.width && 
                data.preview.images[0].source.height ?
        {
          width: data.preview.images[0].source.width,
          height: data.preview.images[0].source.height
        }
        : 
        {}
        }
        className='thumbnail' /> :
        data.is_video ?
        <ReactHlsPlayer
        controls={true}
        className='thumbnail-video'
        src={fixRedditLink(data.secure_media.reddit_video.hls_url)} /> :
        data.post_hint === 'link' || !data.url.includes('reddit') && !data.url.includes('youtube') ? 
        <a href={data.url} 
        target="_blank"
        className='external-link'>
          <div className='external-link-container'>
            {shortenLink(data.url, 30)}
            <LinkSVG />
          </div>
        </a> :
        data.selftext !== '' ?
        <div className='markdown-selftext'>
          <Interweave content={fixRedditMarkdown(data.selftext_html)} />
        </div> : 
        !data.post_hint && data.media_metadata ?
        <ImageSlide data={data.media_metadata} preview={true}/> :
        data.url.includes('youtube') || data.url.includes('youtu.be') ?
        <iframe src={convertToEmbeddedURL(data.url)} ></iframe>  :
        <br data-testid='br' />}
        </div>
        <div className={!previewPage ? 'num-comments-container links-enabled' : 'num-comments'}>
          <Link 
          className='num-comments'
          to={`${data.permalink}`}
          onClick={handlePostClick}>
          <div className='num-comments-container'>
          <PostCommentsSVG /> 
          {data.num_comments} Comments
          </div>
          </Link>
        </div>
      </div>
    </div >
  )
}    