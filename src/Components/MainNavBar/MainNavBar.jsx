import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './MainNavBar.css'
import navLogo from '../../assets/minireddit.png'
import { clearEverything, loadData, selectUserProfile, selectIsLoading, selectSubredditData, selectSubredditIsLoading, selectUserData } from '../../Features/Api/redditApiSlice';
import SearchBar from './SearchBar/SearchBar';
import NightmodeSwitch from './NightmodeSwitch/NightmodeSwitch'
import { selectCurrentPage, selectNightmode, changeCurrentPage, changeCurrentFilterMethod } from '../../Features/CurrentPage/currentPageSlice';
import { fixRedditLink } from '../../utils/helperFunctions';

export default function NavBar() {
    const { subreddit, postId } = useParams();
    // Just to make sure the code is more readable
    const commentsOverlayOpen = postId;
    
    const currentPage = useSelector(selectCurrentPage);
    const subredditData = useSelector(selectSubredditData);
    const isLoading = useSelector(selectIsLoading);
    const subredditIsLoading = useSelector(selectSubredditIsLoading);
    const userProfile = useSelector(selectUserProfile);
    const nightMode = useSelector(selectNightmode);
    const dispatch = useDispatch();
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const handleClick = () => { 
      dispatch(clearEverything());
      dispatch(loadData({subreddit: 'all'}));
      dispatch(changeCurrentPage('all'));
      dispatch(changeCurrentFilterMethod('best'));
    }

    return (
      <nav className={nightMode ? 'main-nav dark' : 'main-nav light'}>
      <div className='main-nav-flex-container'>
        { isLoading || subredditIsLoading || isHomePage ? 
        <img src={navLogo} alt="navigation bar logo" className='nav-logo'/>
        :
        <Link to='/' onClick={handleClick}>
        <img src={navLogo} alt="navigation bar logo" className='nav-logo'/>
        </Link> }
        <div className='main-nav-bar-content-container'>
        { userProfile.data &&
          <img 
          src={fixRedditLink(userProfile.data.icon_img)}
          className='main-nav-bar-user-icon' />
        }
        <h1>
          { subredditData && subreddit ?
           subredditData.display_name_prefixed 
           : currentPage === 'search' ? <></>
           : userProfile.data ?
            `u/${userProfile.data.name}` :
           !subreddit || /all/i.test(subreddit) || 
           commentsOverlayOpen && !subredditData ? 
           'r/All' 
           : 'Loading...'}
        </h1>
        </div>
        <SearchBar />
        <NightmodeSwitch />
      </div>
      </nav>
    )
}