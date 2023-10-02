 import React from 'react';
import './RouterError.css';
import notLikeThis from '../../assets/NotLikeThis.png';
import { useSelector } from 'react-redux';
import { selectNightmode } from '../../Features/CurrentPage/currentPageSlice';

export default function RouterError() {
  const nightMode = useSelector(selectNightmode);
  return (
    <div id="error-container" className={nightMode ? 'dark' : 'light'}>
      <img src={notLikeThis} alt="NotLikeThis.png" className="error-image"/>
      <h1>404</h1>
      <h2>Not found</h2>
    </div>
  )
}