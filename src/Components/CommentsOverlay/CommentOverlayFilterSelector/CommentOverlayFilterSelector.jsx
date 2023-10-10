import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentCommentFilter, selectNightmode } from '../../../Features/CurrentPage/currentPageSlice';
import './CommentOverlayFilterSelector.css';
import DropdownSVG from '../../../assets/DropdownSVG';
import { getCommentFilterDisplayString } from '../../../utils/helperFunctions';

export default function CommentOverlayFilterSelector() {
  const [ openSelector, setOpenSelecor ] = useState(false);
  const nightMode = useSelector(selectNightmode);
  const currentCommentFilter = useSelector(selectCurrentCommentFilter);

  const closeDropdownAnywhere = e => {
    if(typeof e.target.className === 'string') {
    if(!e.target.className.includes('comment-overlay-filter-selector') &&
       !e.target.className.includes('comment-overlay-filter-list') &&
       !e.target.className.includes('filter-list-item') &&
       !e.target.className.includes('comment-overlay-filter-button')) {
        console.log(e.target.className); 
        setOpenSelecor(false);
       }
      } else {
        setOpenSelecor(false);
      }
  }

  useEffect(() => {
    document.addEventListener('click', closeDropdownAnywhere);
    return () => {
      document.removeEventListener('click', closeDropdownAnywhere);
    }
  }, [])

  return (
    <div className={nightMode ? 'comment-overlay-filter-selector dark' : 'comment-overlay-filter-selector light' }>
    <button 
    className='comment-overlay-filter-button'
    onClick={() => { setOpenSelecor(prev => !prev) }}>
      { currentCommentFilter ? getCommentFilterDisplayString(currentCommentFilter) : 'Sort' }
      <DropdownSVG active={openSelector}/>
    </button>
    { openSelector &&
    <ul className='comment-overlay-filter-list'>
      <Link
      to="?sort=confidence">
        <li>
          Best
        </li>
      </Link>
      <Link to="?sort=top">
        <li>
          Top
        </li>
      </Link>
      <Link to="?sort=new">
        <li>
          New
        </li>
      </Link>
      <Link to="?sort=controversial">
        <li>
         Controversial
        </li>
      </Link>
      <Link to="?sort=old">
        <li>
         Old
        </li>
      </Link>
      <Link to="?sort=qa">
        <li>
         Q&A
        </li>
      </Link>
    </ul>
    }
    </div>
  )
}