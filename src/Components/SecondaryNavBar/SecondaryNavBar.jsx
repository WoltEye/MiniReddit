import React from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './SecondaryNavBar.css';
import BestSVG from '../../assets/BestSVG';
import NewSVG from '../../assets/NewSVG';
import TopSVG from '../../assets/TopSVG';
import { selectIsLoading, selectSubredditData } from '../../Features/Api/redditApiSlice';
import { selectCurrentFilterMethod, selectNightmode } from '../../Features/CurrentPage/currentPageSlice';
import DropdownMenu from './DropdownMenu/DropdownMenu.jsx';



export default function SecondaryNavBar() {
  const currentFilter = useSelector(selectCurrentFilterMethod);
  const isLoading = useSelector(selectIsLoading);
  const subredditData = useSelector(selectSubredditData);
  const nightMode = useSelector(selectNightmode);
  const { subreddit } = useParams();



  return (
      <nav 
      style={ subredditData && {margin: '3rem auto'}}
      className={nightMode ? `secondary-navigation dark ${isLoading ? 'loading' : ''}` : `secondary-navigation light ${isLoading ? 'loading' : ''}`}>
      <NavLink 
      to={subreddit ? `/r/${subreddit}/best` : '/r/all/best'} 
      className={isLoading ? 'loading' : subreddit === undefined ? 'active' : ''}>
        <div className={currentFilter === 'best' || subreddit === undefined ? 'navlink-container best active' : 'navlink-container best'}>
          <BestSVG selected={currentFilter === 'best' || subreddit === undefined ? true : false} />
          <p>Best</p>
        </div>
      </NavLink>
      <NavLink 
      to={subreddit ? `/r/${subreddit}/new` : '/r/all/new'}
      className={isLoading ? 'loading' : ''}>
      <div className={currentFilter !== 'new' ? 'navlink-container new' : 'navlink-container new active'}>
        <NewSVG selected={currentFilter === 'new' ? true : false} />
        <p>New</p>
      </div>
      </NavLink>
      <NavLink 
      to={subreddit ? `/r/${subreddit}/top` : '/r/all/top'} 
      className={isLoading ? 'loading' : ''}>
        <div className={currentFilter !== 'top' ? 'navlink-container top' : 'navlink-container top active'}>
          <TopSVG selected={currentFilter === 'top' ? true : false} />
          <p>Top</p>
        </div>
      </NavLink>
      {currentFilter === 'top' &&
       <DropdownMenu />
       }
    </nav>
  )
}
