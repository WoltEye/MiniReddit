import React from 'react';
import './Footer.css';
import { useSelector } from 'react-redux';
import { selectNightmode } from '../../Features/CurrentPage/currentPageSlice';

export default function Footer() {
    const nightMode = useSelector(selectNightmode);
    return (
      <footer className={nightMode ? 'dark' : 'light'} >
        <h6>Made by Eetu Mäenpää</h6>  
      </footer>    
    )
}