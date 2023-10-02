import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentSearchSort, 
         selectCurrentSearchSort,
         changeCurrentSearchTimeSort,
         selectCurrentSearchTimeSort,
         resetSearchFilters,
         selectNightmode } from '../../../Features/CurrentPage/currentPageSlice';
import { getSearchFilterDisplayName } from '../../../utils/helperFunctions';
import './SearchResultsFilterSelector.css';
import DropdownSVG from '../../../assets/DropdownSVG';
import { clearSearchResults } from '../../../Features/Api/redditApiSlice';

export default function SearchResultsFilterSelector() {
  const [ popularityFilterDropdown, setPopularityFilterDropdown ] = useState(false);
  const [ timeFilterDropdown, setTimeFilterDropdown ] = useState(false);
  const nightMode = useSelector(selectNightmode);
  const searchSort = useSelector(selectCurrentSearchSort);
  const searchTimeSort = useSelector(selectCurrentSearchTimeSort);
  const dispatch = useDispatch();
  const location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const q = params.get('q');
  const type = params.get('type');
  const sort = params.get('sort');
  const time = params.get('t');

  
  const handleDocumentClick = (e) => {
    if(typeof e.target.className === 'string') {
      if(!e.target.className.includes('popularity') &&
         !e.target.className.includes('time')) {
          setPopularityFilterDropdown(false);
          setTimeFilterDropdown(false);
      } if(typeof e.target.className === 'string' &&
                e.target.className.includes('popularity') ||
                e.target.className.includes('time')) {
                  if(e.target.className.includes('popularity')) {
                      setTimeFilterDropdown(false);
                      console.log(timeFilterDropdown);
                    } else {
                      setPopularityFilterDropdown(false);
                    }
                }
    }
    if(typeof e.target.className === 'object') {
      if(e.target.className.animVal) {
        if(e.target.className.animVal !== 'popularity-svg' &&
           e.target.className.animVal !== 'time-svg') {
          setPopularityFilterDropdown(false);
        } else if (e.target.className.animVal === 'popularity-svg' ||
                   e.target.className.animVal === 'time-svg') {
                     if(e.target.className.animVal === 'popularity-svg') {
                       setTimeFilterDropdown(false);
                     } else {
                       setPopularityFilterDropdown(false);
                     }
                   }
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)
    return () => {
      setPopularityFilterDropdown(false);
      setTimeFilterDropdown(false);
      document.removeEventListener('click', handleDocumentClick);
      dispatch(resetSearchFilters());
    }
  }, [])
  
  return (
    <div 
    className={nightMode ? 'search-results-filter-selector dark' : 'search-results-filter-selector light'}>
      <div className='search-results-filter-dropdown'>
      <button 
      className='popularity'
      onClick={() => { 
      setPopularityFilterDropdown(prev => !prev);
      }}>
        {!searchSort ? 'Sort' : getSearchFilterDisplayName(searchSort)}
        <DropdownSVG 
        from='search-results'
        active={popularityFilterDropdown}
        customClass='popularity-svg'/>
      </button>
      <ul 
      className={popularityFilterDropdown ? 'popularity-filter active' : 'popularity-filter inactive'}
      style={popularityFilterDropdown ? { opacity: 100 } : { display: 'none'}}>
        <Link 
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}&sort=relevance${time ? `&t=${time}` : '' }`}>
          <li className='popularity sr-one'>Relevance</li>
        </Link>
        <Link 
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}&sort=hot${time ? `&t=${time}` : '' }`}>
          <li className='popularity'>Hot</li>
        </Link>
        <Link  
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}&sort=top${time ? `&t=${time}` : '' }`}>
          <li className='popularity'>Top</li>
        </Link>
        <Link
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}&sort=new${time ? `&t=${time}` : '' }`}>
          <li className='popularity'>New</li>
        </Link>
        <Link 
         
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}&sort=comments${time ? `&t=${time}` : '' }`}>
          <li className='popularity sr-five'>Most Comments</li>
        </Link>
      </ul>
      </div>
      <div className='search-results-filter-dropdown'>
      <button
      className='time'
      onClick={() => { 
        setTimeFilterDropdown(prev => !prev);
        }}>
        {searchTimeSort ? getSearchFilterDisplayName(searchTimeSort) : 'Time'}
        <DropdownSVG 
        from='search-results'
        active={timeFilterDropdown}
        customClass='time-svg' /> 
      </button>
      <ul className={timeFilterDropdown ? 'time-filter active' : 'time-filter inactive'}
      style={timeFilterDropdown ? { opacity: 100 } : { display: 'none'}}>
      <Link 
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}${sort ? `&sort=${sort}` : ''}&t=all`}>
          <li className='time sr-one'>All Time</li>
        </Link>
        <Link 
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}${sort ? `&sort=${sort}` : ''}&t=year`}>
          <li className='time'>Past Year</li>
        </Link>
        <Link 
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}${sort ? `&sort=${sort}` : ''}&t=month`}>
          <li className='time'>Past Month</li>
        </Link>
        <Link 
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}${sort ? `&sort=${sort}` : ''}&t=week`}>
          <li className='time'>Past Week</li>
        </Link>
        <Link 
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}${sort ? `&sort=${sort}` : ''}&t=day`}>
          <li className='time'>Past 24 Hours</li>
        </Link>
        <Link 
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}${sort ? `&sort=${sort}` : ''}&t=hour`}>
          <li className='time sr-six'>Past Hour</li>
        </Link>
      </ul>
      </div>
    </div>
  )
}