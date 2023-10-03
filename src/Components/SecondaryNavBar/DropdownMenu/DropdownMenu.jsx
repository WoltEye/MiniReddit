import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeFirstLetter } from '../../../utils/helperFunctions';
import './DropdownMenu.css';
import DropdownSVG from '../../../assets/DropdownSVG.jsx';
import { selectNightmode, setTopOfFilter } from '../../../Features/CurrentPage/currentPageSlice.js'
import { selectIsLoading } from '../../../Features/Api/redditApiSlice';

export default function DropdownMenu() {
  const [ showOptions, setShowOptions ] = useState(false);
  const [ timeoutId, setTimeoutId ] = useState(null);
  const nightMode = useSelector(selectNightmode);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const ACCEPTED_TOP_OF_VALUES = ['hour', 'day', 'week', 'month', 'year', 'all']
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const t = params.get('t');
  const validTopOf = t && ACCEPTED_TOP_OF_VALUES.includes(t.toLocaleLowerCase()) ? capitalizeFirstLetter(t) : 'Today';

    const closeDropdownAnywhere = e => {
        e.stopPropagation()
        if(e.target.className !== 'top-of-filter') {
        setShowOptions(false);
      }
    }
    useEffect(() => {
      if(showOptions === true) {
        const timeout = setTimeout(() => {
        window.addEventListener('click', closeDropdownAnywhere);
    }, 100);
      setTimeoutId(timeout);
      } else {
        clearTimeout(timeoutId);
        window.removeEventListener('click', closeDropdownAnywhere);
      }
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('click', closeDropdownAnywhere);
      }
    }, [showOptions])
    
    useEffect(() => {
    dispatch(setTopOfFilter(validTopOf.toLowerCase()));
    }, [])

    useEffect(() => {
      if(t) {
      console.log(t);
      dispatch(setTopOfFilter(validTopOf.toLowerCase()));
    }
    }, [validTopOf])

    return (
    <>
    <div className={nightMode ? 'top-of-the dark' : 'top-of-the light'}>
    <div 
    className='top-of-the-content-container'
    onClick={() => { setShowOptions(!showOptions) }}>
      <p>
        {
         validTopOf === 'Hour' ? 'Now'
         : validTopOf === 'Day' ? 'Today'
         : validTopOf === 'All' ? 'All Time' 
         : validTopOf 
         }
        </p>
      <DropdownSVG />
    </div>
    { showOptions && !isLoading &&
    <div className='top-of-dropdown-menu'>
     <div className='top-of-filter'>
       <Link to="?t=hour">Now</Link>
     </div>
     <div className='top-of-filter'>
       <Link to="?t=day">Today</Link>
     </div>
     <div className='top-of-filter'>
     <Link to="?t=week">Week</Link>
     </div>
     <div className='top-of-filter'>
     <Link to="?t=month">Month</Link>
     </div>
     <div className='top-of-filter'>
     <Link to="?t=year">Year</Link>
     </div>
     <div className='top-of-filter all-time'>
     <Link to="?t=all">All Time</Link>
     </div>
    </div>
  }
  </div>  
  </>
  )
} 