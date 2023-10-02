import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchSVG from '../../../assets/SearchSVG/SearchSVG.jsx';
import './SearchBar.css';
import { useSelector } from 'react-redux';
import { selectCurrentSearchType, selectNightmode } from '../../../Features/CurrentPage/currentPageSlice.js';
import { formatSearchTerm } from '../../../utils/helperFunctions.js';

export default function SearchBar() {
  const [ isFocused, setIsFocused ] = useState(false);
  const [ isHovered, setIsHovered ] = useState(false);
  const [ searchTerm, setSearchTerm ] = useState('');
  
  const inputRef = useRef(null);
  const nightMode = useSelector(selectNightmode);
  const searchType = useSelector(selectCurrentSearchType);
  const navigate = useNavigate();

  const handleChange = e => {
    if(e.target.value.length <= 50) {
    setSearchTerm(e.target.value);
    }
  }

  const handleKeyPress = e => {
    if(e.key === 'Enter' && searchTerm !== '') {
      navigate(`/search?q=${searchTerm}${searchType ? `&type=${searchType}` : ''}`);
      if(inputRef.current) {
        inputRef.current.blur();
      }
    }
  }
 
  const handleClick = () => {
    if(inputRef.current) {
      inputRef.current.blur();
    }  
  }

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100)
  }


 
  return (
      <div 
      className={isFocused && !nightMode ? 'search-input focused light' : !nightMode ? 'search-input light' :
                 isFocused ? 'search-input focused dark' : 'search-input dark'}>
      <label 
      htmlFor='search'>
        <SearchSVG 
        focused={isFocused} 
        hovered={isHovered}/>  
      </label>
      <input
      className={isFocused || isHovered ? 'input-field focused' : 'input-field'}
      type="text" 
      id='search' 
      placeholder='Search'
      value={searchTerm}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      onFocus={() => {setIsFocused(true)}}
      onBlur={handleBlur}
      ref={inputRef}
      onMouseOver={() => {setIsHovered(true)}}
      onMouseOut={() => {setIsHovered(false);}}/>
      { searchTerm !== '' && isFocused &&
        <div className='search-for'>
        <Link 
        to={`/search?q=${searchTerm}${searchType ? `&type=${searchType}` : ''}`} 
        className='search-bar-link'
        onClick={handleClick}>
          <div className='search-for-container' aria-hidden="true">
            <SearchSVG 
            focused={true} 
            hovered={true}/>
            <p>
              Search for "{searchTerm}"
            </p>
          </div>
        </Link>
    </div>
    }  
    </div> 
  )
}