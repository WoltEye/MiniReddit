import React from 'react';
import { useSelector } from 'react-redux';
import { selectNightmode } from '../Features/CurrentPage/currentPageSlice';

export default function PostCommentsSVG({ userComment }) {
  const nightMode = useSelector(selectNightmode);
  return (
    <svg fill={nightMode ? "#F5F5F5" : "#000000"} width={userComment ? "20px" : "25px"} height={userComment ? "20px" : "25px"}  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.25 6H19v2h1v8h-3a1 1 0 0 0-1 1v1.586l-2.293-2.293A1 1 0 0 0 13 16h-2.172l-2 2h3.758l3.707 3.707A1 1 0 0 0 18 21v-3h2.25A1.752 1.752 0 0 0 22 16.25v-8.5A1.752 1.752 0 0 0 20.25 6z"></path> <path d="M7 18a1 1 0 0 1-1-1v-3H3.75A1.752 1.752 0 0 1 2 12.25v-8.5A1.752 1.752 0 0 1 3.75 2h12.5A1.752 1.752 0 0 1 18 3.75v8.5a1.762 1.762 0 0 1-.514 1.238A1.736 1.736 0 0 1 16.25 14h-4.836l-3.707 3.707A1 1 0 0 1 7 18zm-3-6h3a1 1 0 0 1 1 1v1.586l2.293-2.293A1 1 0 0 1 11 12h5V4H4v8z"></path> </g></svg>
  )
}