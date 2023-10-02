import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentSearchSort, selectCurrentSearchSort, selectNightmode } from '../../../Features/CurrentPage/currentPageSlice';
import './SearchResultsFilterSelector.css';
import DropdownSVG from '../../../assets/DropdownSVG';
import { clearSearchResults } from '../../../Features/Api/redditApiSlice';

export default function SearchResultsFilterSelector() {
  const [ popularityFilterDropdown, setPopularityFilterDropdown ] = useState(false);
  const [ timeFilterDropdown, setTimeFilterDropdown ] = useState(false);
  const nightMode = useSelector(selectNightmode);
  const searchSort = useSelector(selectCurrentSearchSort);
  const dispatch = useDispatch();
  const location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const q = params.get('q');
  const type = params.get('type');
  const sort = params.get('sort');


  const handleDocumentClick = (e) => {
    if(typeof e.target.className === 'string') {
      if(!e.target.className.includes('popularity')) {
        setPopularityFilterDropdown(false);
      }
    }
    if(typeof e.target.className === 'object') {
      if(e.target.className.animVal) {
        if(e.target.className.animVal !== 'popularity-svg') {
          setPopularityFilterDropdown(false);
        }
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)
    return () => {
      setPopularityFilterDropdown(false);
      document.removeEventListener('click', handleDocumentClick);
      dispatch(changeCurrentSearchSort(''));
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
        {!searchSort ? 'Sort' : searchSort}
        <DropdownSVG 
        from='search-results'
        active={popularityFilterDropdown}
        customClass='popularity-svg'/>
      </button>
      <ul 
      className={popularityFilterDropdown ? 'popularity-filter active' : 'popularity-filter inactive'}
      style={popularityFilterDropdown ? { opacity: 100 } : { display: 'none'}}>
        <Link 
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}&sort=relevance`}>
          <li className='popularity'>Relevance</li>
        </Link>
        <Link 
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}&sort=hot`}>
          <li className='popularity'>Hot</li>
        </Link>
        <Link  
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}&sort=top`}>
          <li className='popularity'>Top</li>
        </Link>
        <Link
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}&sort=new`}>
          <li className='popularity'>New</li>
        </Link>
        <Link 
         
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}&sort=comments`}>
          <li className='popularity'>Most Comments</li>
        </Link>
      </ul>
      </div>
      <div className='search-results-filter-dropdown'>
      <button
      onClick={() => { 
        setTimeFilterDropdown(prev => !prev);
        }}>
        Time
        <DropdownSVG 
        from='search-results'
        active={timeFilterDropdown} /> 
      </button>
      <ul className={timeFilterDropdown ? 'time-filter active' : 'time-filter inactive'}
      style={timeFilterDropdown ? { opacity: 100 } : { display: 'none'}}>
      <Link 
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}${sort ? `sort=${sort}` : ''}&t=all`}>
          <li className='time'>All Time</li>
        </Link>
        <Link 
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}${sort ? `sort=${sort}` : ''}&t=year`}>
          <li className='time'>Past Year</li>
        </Link>
        <Link 
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}${sort ? `sort=${sort}` : ''}&t=month`}>
          <li className='time'>Past Month</li>
        </Link>
        <Link 
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}${sort ? `sort=${sort}` : ''}&t=week`}>
          <li className='time'>Past Week</li>
        </Link>
        <Link 
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}${sort ? `sort=${sort}` : ''}&t=day`}>
          <li className='time'>Past 24 Hours</li>
        </Link>
        <Link 
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}${sort ? `sort=${sort}` : ''}&t=hour`}>
          <li className='time'>Past Hour</li>
        </Link>
      </ul>
      </div>
    </div>
  )
}