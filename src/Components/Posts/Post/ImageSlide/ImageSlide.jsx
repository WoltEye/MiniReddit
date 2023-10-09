import React, { useState } from 'react';
import { fixRedditLink } from '../../../../utils/helperFunctions';
import PrevSlideSVG from '../../../../assets/PrevSlideSVG.jsx';
import NextSlideSVG from '../../../../assets/NextSlideSVG.jsx';
import './ImageSlide.css';
import { useSelector } from 'react-redux';
import { selectNightmode } from '../../../../Features/CurrentPage/currentPageSlice';
import { useMediaQuery } from 'react-responsive';

export default function ImageSlide({data, preview}) {
  const [ imageIndex, setImageIndex ] = useState(0);
  const slideAmount = Object.keys(data).length;
  const nightMode = useSelector(selectNightmode);

  const handleNextSlice = () => {
    if(imageIndex !== slideAmount - 1) {
      setImageIndex(prev => prev + 1);
    } 
  }

  const handlePrevSlice = () => {
    if(imageIndex !== 0) {
      setImageIndex(prev => prev - 1);
    }
  }

  const isMediumSize = useMediaQuery({ query: '(max-width: 755px)' });

  return (
   <div className={preview ? 'image-slide preview' : 'image-slide'}>
      <button 
      className={nightMode ? 'prev-slide slide-button dark' : 'prev-slide slide-button light'}
      onClick={handlePrevSlice}
      style={imageIndex === 0 ? {opacity: 0} : {}}><PrevSlideSVG nightMode={nightMode}/></button>
     { 
       Object.keys(data).map((item, index) => {
       if(/image/i.test(data[item].e)) {
        return <img src={fixRedditLink(data[item].s.u)} 
        alt={'Error loading asset :('}
        className={index}
        key={`image-slide-image-${index}`}
        style={imageIndex === index ? {display: 'block'} : {display: 'none'}}/>
       } else {
        return  <p key={`image-slide-image-${index}`} style={imageIndex === index ? {color: 'red'} : {display: 'none'}}>Error loading asset {data[item].e}</p>
       }
     }) 
     }
     <button 
     className={nightMode ? 'next-slide slide-button dark' : 'next-slide slide-button light'}
     onClick={handleNextSlice}
     style={imageIndex === slideAmount - 1 ? {opacity: 0} : {}}><NextSlideSVG nightMode={nightMode} /></button>
   </div>
  )
}