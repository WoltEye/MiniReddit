import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNightmode, toggleNightmode } from '../../../Features/CurrentPage/currentPageSlice';
import SunSVG from '../../../assets/SunSVG';
import MoonSVG from '../../../assets/MoonSVG';
import './NightmodeSwitch.css';

export default function NightmodeSwitch() {
    const nightMode = useSelector(selectNightmode);
    const dispatch = useDispatch();

    return (
    <div className={nightMode ? 'nightmode-switch dark' : 'nightmode-switch light'}
    onClick={() => {dispatch(toggleNightmode())}}>
     <div 
     className={nightMode ? 'nightmode-switch-ball dark' : 'nightmode-switch-ball light'}
     style={{}}>
     { nightMode ?
      <MoonSVG /> :
      <SunSVG />
     }
     </div>
     
    </div>
  )
}