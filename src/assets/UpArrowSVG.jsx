import React from 'react';
import { useSelector } from 'react-redux';
import { selectNightmode } from '../Features/CurrentPage/currentPageSlice';

export default function upArrowSVG() {
  const nightMode = useSelector(selectNightmode);
  return (
    <svg width="54px" height="54px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill={nightMode ? "#d1d1d1" : "#2b2b2b"} d="m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z"></path></g></svg>
  )
}