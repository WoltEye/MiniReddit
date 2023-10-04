import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './UserFeedDropdown.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentUserFeedTimeFilter, selectCurrentUserFeedTimeFilter, selectNightmode } from '../../../../Features/CurrentPage/currentPageSlice';
import DropdownSVG from '../../../../assets/DropdownSVG';
import { getUserFeedTimeFilterDisplayName } from '../../../../utils/helperFunctions'; 

export default function UserFeedDropdown() {
  const [ showOptions, setShowOptions ] = useState(false);
  const nightMode = useSelector(selectNightmode);
  const currentUserFeedTimeFilter = useSelector(selectCurrentUserFeedTimeFilter);
  const { username, userFeedFilter } = useParams();
  const location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const sort = params.get('sort');
  
  const closeDropdownAnywhere = (e) => {
    if(e.target.className !== 'open-top-of-filter' &&
       e.target.className !== 'user-feed-dropdown-option' &&
       e.target.className.animVal !== 'dropdown-svg') {
        setShowOptions(false);
       }
  }

  useEffect(() => {
    document.addEventListener('click', closeDropdownAnywhere);
    return () => {
      setShowOptions(false);
      document.removeEventListener('click', closeDropdownAnywhere);
    }
  }, []);

  return (
    <div className={nightMode ? 'user-feed-dropdown dark' : 'user-feed-dropdown light'}>
      <button 
      className='open-top-of-filter'
      onClick={() => { setShowOptions(prev => !prev) }}>
        { getUserFeedTimeFilterDisplayName(currentUserFeedTimeFilter) }
        <DropdownSVG customClass='dropdown-svg' />  
      </button>
      { showOptions &&
      <div className='dropdown-options'>
        <Link
        className='user-feed-dropdown-option' 
        to={`/user/${username}/${userFeedFilter ? userFeedFilter : 'overview'}?sort=${sort}&t=hour`}>
        <p>
          Now
        </p>
        </Link>
        <Link
        className='user-feed-dropdown-option'
        to={`/user/${username}/${userFeedFilter ? userFeedFilter : 'overview'}?sort=${sort}&t=day`}>
        <p>
          Today
        </p>
        </Link>  
        <Link
        className='user-feed-dropdown-option'
        to={`/user/${username}/${userFeedFilter ? userFeedFilter : 'overview'}?sort=${sort}&t=week`}>
        <p>
          Week
        </p>
        </Link>  
        <Link
        className='user-feed-dropdown-option'
        to={`/user/${username}/${userFeedFilter ? userFeedFilter : 'overview'}?sort=${sort}&t=month`}>
        <p>
          Month
        </p>
        </Link>  
        <Link
        className='user-feed-dropdown-option'
        to={`/user/${username}/${userFeedFilter ? userFeedFilter : 'overview'}?sort=${sort}&t=year`}>
        <p>
          Year
        </p>
        </Link>  
        <Link
        className='user-feed-dropdown-option'
        to={`/user/${username}/${userFeedFilter ? userFeedFilter : 'overview'}?sort=${sort}&t=all`}>
        <p>
          All Time
        </p>
        </Link>    
      </div>
      }
    </div>
  )
}