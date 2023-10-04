import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUserFeedPopularityFilter, changeCurrentUserFeedPopularityFilter, selectNightmode } from '../../../Features/CurrentPage/currentPageSlice';
import NewSVG from '../../../assets/NewSVG.jsx';
import TopSVG from '../../../assets/TopSVG.jsx';
import './UserFeedFilterSelector.css';
import HotSVG from '../../../assets/HotSVG';
import UserFeedDropdown from './UserFeedDropdown/UserFeedDropdown';

export default function UserFeedFilterSelector() { 
  const [ hovering, setHovering ] = useState('');
  const { username, userFeedFilter } = useParams();
  const nightMode = useSelector(selectNightmode);
  const currentFeedPopularityFilter = useSelector(selectCurrentUserFeedPopularityFilter);
  const dispatch = useDispatch();
  return (
    <div className={nightMode ? 'user-feed-filter-selector dark' : 'user-feed-filter-selector light'}>
      <Link 
      to={`/user/${username}${userFeedFilter ? `/${userFeedFilter}` : ''}?sort=new`}
      onClick={() => { dispatch(changeCurrentUserFeedPopularityFilter('new')) }}>
      <div className={ currentFeedPopularityFilter === 'new' ?
                        'filter-selector-item active' :
                        'filter-selector-item inactive'}
                        onMouseOver={() => {setHovering('new')}}
                        onMouseOut={() => {setHovering('')}}>
         <div className='filter-selector-item-container'>
           <NewSVG selected={currentFeedPopularityFilter === 'new' || hovering === 'new'}/>
           <p>New</p>
         </div> 
      </div>
      </Link>
      <Link
       to={`/user/${username}${userFeedFilter ? `/${userFeedFilter}` : ''}?sort=hot`}
       onClick={() => { dispatch(changeCurrentUserFeedPopularityFilter('hot')) }}>
      <div className={ currentFeedPopularityFilter === 'hot' ?
                        'filter-selector-item active' :
                        'filter-selector-item inactive'}
                        onMouseOver={() => {setHovering('hot')}}
                        onMouseOut={() => {setHovering('')}}>
        <div className='filter-selector-item-container'> 
          <HotSVG selected={currentFeedPopularityFilter === 'hot' || hovering === 'hot'}/>
          <p>Hot</p>
        </div> 
      </div>
      </Link>
      <div className='user-feed-filter-top-container'>
        <Link
         to={`/user/${username}${userFeedFilter ? `/${userFeedFilter}` : ''}?sort=top`}
         onClick={() => { dispatch(changeCurrentUserFeedPopularityFilter('top')) }}>
        <div className={ currentFeedPopularityFilter === 'top' ?
                          'filter-selector-item active' :
                          'filter-selector-item inactive'}
                          onMouseOver={() => {setHovering('top')}}
                          onMouseOut={() => { setHovering('')}}>
          <div className='filter-selector-item-container'>
            <TopSVG selected={currentFeedPopularityFilter === 'top' || hovering === 'top'}/>
            <p>Top</p> 
          </div>
        </div>
        </Link>
        { currentFeedPopularityFilter === 'top' &&
        <UserFeedDropdown />
        }
      </div>
      
    </div>
  )
}