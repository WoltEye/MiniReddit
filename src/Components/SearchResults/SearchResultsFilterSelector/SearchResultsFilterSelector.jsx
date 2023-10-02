import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrentSearchSort, selectCurrentSearchSort, selectNightmode } from '../../../Features/CurrentPage/currentPageSlice';
import './SearchResultsFilterSelector.css';
import DropdownSVG from '../../../assets/DropdownSVG';
import { clearSearchResults } from '../../../Features/Api/redditApiSlice';

export default function SearchResultsFilterSelector() {
  const [ popularityFilterDropdown, setPopularityFilterDropdown ] = useState(false);
  const [ hideFilterDropdown, setHideFilterDropdown ] = useState(true);
  const [ timeFilterDropdown, setTimeFilterDropdown ] = useState(false);
  const [ hideTimeDropdown, setHideTimeDropdown ] = useState(true);
  const nightMode = useSelector(selectNightmode);
  const searchSort = useSelector(selectCurrentSearchSort);
  const dispatch = useDispatch();
  const location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const q = params.get('q');
  const type = params.get('type');
  const sort = params.get('sort');

  let filterTimeout;

  const animationTimeout = (dropdown) => {
    if(dropdown === 'popularity') {
    if(popularityFilterDropdown) {
      setPopularityFilterDropdown(false);
    }
    if(!hideFilterDropdown) {
    filterTimeout = setTimeout(() => {
      setHideFilterDropdown(true);
    }, 350)
    } else {
      clearTimeout(filterTimeout);
      setHideFilterDropdown(false);
    }
    }
  }

  useEffect(() => {
  console.log(hideFilterDropdown);
  }, [hideFilterDropdown])

  const handleDocumentClick = (e) => {
    if(typeof e.target.className === 'string') {
      if(!e.target.className.includes('popularity')) {
        animationTimeout('popularity');
        setPopularityFilterDropdown(false);
      }
    }
    if(typeof e.target.className === 'object') {
      if(e.target.className.animVal) {
        if(e.target.className.animVal !== 'popularity-svg') {
          animationTimeout('popularity');
          setPopularityFilterDropdown(false);
        }
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick)
    return () => {
      setPopularityFilterDropdown(false);
      setHideFilterDropdown(true);
      clearTimeout(filterTimeout);
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
      animationTimeout('popularity');
      }}>
        {!searchSort ? 'Sort' : searchSort}
        <DropdownSVG 
        from='search-results'
        active={popularityFilterDropdown}
        customClass='popularity-svg'/>
      </button>
      <ul 
      className={popularityFilterDropdown ? 'popularity-filter active' : 'popularity-filter inactive'}
      style={popularityFilterDropdown || !hideFilterDropdown ? { opacity: 100 } : { display: 'none'}}>
        <Link 
        onClick={() => { animationTimeout('popularity') }}
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}&sort=relevance`}>
          <li className='sr-one popularity'>Relevance</li>
        </Link>
        <Link 
        onClick={() => { animationTimeout('popularity') }}
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}&sort=hot`}>
          <li className='sr-two popularity'>Hot</li>
        </Link>
        <Link 
        onClick={() => { animationTimeout('popularity') }}
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}&sort=top`}>
          <li className='sr-three popularity'>Top</li>
        </Link>
        <Link 
        onClick={() => { animationTimeout('popularity') }}
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}&sort=new`}>
          <li className='sr-four popularity'>New</li>
        </Link>
        <Link 
        onClick={() => { animationTimeout('popularity') }}
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}&sort=comments`}>
          <li className='sr-five popularity'>Most Comments</li>
        </Link>
      </ul>
      </div>
      <div className='search-results-filter-dropdown'>
      <button
      onClick={() => { 
        setTimeFilterDropdown(prev => !prev);
        animationTimeout('time');
        }}>
        Time
        <DropdownSVG 
        from='search-results'
        active={timeFilterDropdown} /> 
      </button>
      <ul className={timeFilterDropdown ? 'time-filter active' : 'time-filter inactive'}
      style={timeFilterDropdown || !hideTimeDropdown ? { opacity: 100 } : { display: 'none'}}>
      <Link 
        onClick={() => { animationTimeout('time') }}
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}${sort ? `sort=${sort}` : ''}&t=all`}>
          <li className='sr-one time'>All Time</li>
        </Link>
        <Link 
        onClick={() => { animationTimeout('time') }}
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}${sort ? `sort=${sort}` : ''}&t=year`}>
          <li className='sr-two time'>Past Year</li>
        </Link>
        <Link 
        onClick={() => { animationTimeout('time') }}
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}${sort ? `sort=${sort}` : ''}&t=month`}>
          <li className='sr-three time'>Past Month</li>
        </Link>
        <Link 
        onClick={() => { animationTimeout('time') }}
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}${sort ? `sort=${sort}` : ''}&t=week`}>
          <li className='sr-four time'>Past Week</li>
        </Link>
        <Link 
        onClick={() => { animationTimeout('time') }}
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}${sort ? `sort=${sort}` : ''}&t=day`}>
          <li className='sr-five time'>Past 24 Hours</li>
        </Link>
        <Link 
        onClick={() => { animationTimeout('time') }}
        to={`/search/?q=${q}${type ? `&type=${type}` : ''}${sort ? `sort=${sort}` : ''}&t=hour`}>
          <li className='sr-six time'>Past Hour</li>
        </Link>
      </ul>
      </div>
    </div>
  )
}