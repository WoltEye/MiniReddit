import React from 'react';
import { useSelector } from 'react-redux';
import { selectNightmode } from '../Features/CurrentPage/currentPageSlice';

export default function TopSVG({selected}) {
  const nightMode = useSelector(selectNightmode);
  return (
    <svg width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill={selected && !nightMode ? '#0470d4' : nightMode && !selected ? '#b0b0b0' : nightMode && selected ? '#fcfcfc' : '#4a4a4a'}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="none" d="M0 0h24v24H0z"></path> <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm11.793 6.793l-2.45 2.45-2.121-2.122-4.243 4.243 1.414 1.414 2.829-2.828 2.121 2.121 3.864-3.864L18 13V8h-5l1.793 1.793z"></path> </g> </g></svg>
  )
}