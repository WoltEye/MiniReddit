import React from 'react';
import './NoPostsError.css';
import { useSelector } from 'react-redux';
import { selectNightmode } from '../../../Features/CurrentPage/currentPageSlice';

export default function NoPostsError() {
  const nightMode = useSelector(selectNightmode);
  return (
    <div className={nightMode ? 'no-posts-error dark' : 'no-posts-error light'}>
      <div className='no-posts-error-container'>
        <h2>:(</h2>
        <p>No posts found</p>
      </div>
    </div>
  )
}