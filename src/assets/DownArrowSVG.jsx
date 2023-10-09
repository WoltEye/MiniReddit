import React from 'react';
import { useSelector } from 'react-redux';
import { selectNightmode } from '../Features/CurrentPage/currentPageSlice';

export default function DownArrowSVG({height, width}) {
  const nightMode = useSelector(selectNightmode);
  return (
    <svg width={width ? `${width}px` : "54px"} height={height ? `${height}px` : "54px"} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill={nightMode ? "#d1d1d1" : "#2b2b2b"} d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"></path></g></svg>
  )
}