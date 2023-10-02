import React from 'react';
import './SearchSVG.css';
import { useSelector } from 'react-redux';
import { selectNightmode } from '../../Features/CurrentPage/currentPageSlice';

export default function SearchSVG({focused, hovered}) {
  const nightMode = useSelector(selectNightmode);
  return (
    <svg className={focused && !hovered && !nightMode ? 'search-svg focused light' : !focused && hovered && !nightMode ? 'search-svg hovered light' : focused && hovered && !nightMode ? 'search-svg focused hovered light' : !nightMode ? 'search-svg light' : focused && !hovered && nightMode ? 'search-svg focused dark' :  !focused && hovered && nightMode ? 'search-svg hovered dark' : focused && hovered && nightMode ? 'search-svg focused hovered dark' : 'search-svg dark'} width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#949494" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
  )
}