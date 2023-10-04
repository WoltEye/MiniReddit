import React from 'react';
import { useSelector } from 'react-redux';
import { selectNightmode } from '../../Features/CurrentPage/currentPageSlice';
import './Alert.css';
import AlertSVG from '../../assets/AlertSVG';

export default function Alert() {
  const nightMode = useSelector(selectNightmode);
  return (
    <div className={nightMode ? 'alert dark' : 'alert light'}>
      <div className='alert-container'>
        <AlertSVG />
        <p>
          Try not to spam links/buttons on this website,
          reddit's new policy limits free requests to 10
          per minute without oauth and 100 with oauth.
          Spamming links/buttons will break this "demo"
          for everyone for a couple of minutes.
        </p>
      </div>
    </div>
  )
}