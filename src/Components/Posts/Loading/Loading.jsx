import React from 'react';
import './Loading.css'


const randomHeight = () => {
    return Math.floor(Math.random() * 15 + 5);
  }
  

export default function Loading() {
  return (
   <>
   <div 
   className='loading-box' 
   style={{height: `${randomHeight()}rem`}}
   aria-hidden="true"
   data-testid='loading-box'></div>
   <div 
   className='loading-box' 
   style={{height: `${randomHeight()}rem`}}
   aria-hidden="true"
   data-testid='loading-box'></div>
   <div 
   className='loading-box' 
   style={{height: `${randomHeight()}rem`}}
   aria-hidden="true"
   data-testid='loading-box'></div>
   <div 
   className='loading-box' 
   style={{height: `${randomHeight()}rem`}}
   aria-hidden="true"
   data-testid='loading-box'></div>
   <div 
   className='loading-box' 
   style={{height: `${randomHeight()}rem`}}
   aria-hidden="true"
   data-testid='loading-box'></div>
   </>
  )
}