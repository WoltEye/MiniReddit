import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectShowNotification, toggleNotification } from './notificationOverlaySlice';
import './NotificationOverlay.css'
import { selectNightmode } from '../../Features/CurrentPage/currentPageSlice';

export default function NotificationOverlay() {
  const dispatch = useDispatch();
  const nightMode = useSelector(selectNightmode);
  const handleClose = () => {
    dispatch(toggleNotification());
  }
  return (
    <div className='notification-bg'>
      <div className={nightMode ? 'notification dark' : 'notification light'}>
        <div className='notification-content-container'>
        <h1>Notification</h1>
        <p>
           This application doesn't support interactions like 
           posting comments or liking posts. This functionality
           <strong> might</strong> be added in future updates.
        </p>
        <button onClick={handleClose}>
          Gotcha
        </button>
        </div>    
      </div>
    </div>
  )
}