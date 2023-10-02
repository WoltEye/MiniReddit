import React from 'react'
import './Spinner.css';

export default function Spinner({nightMode}) {
  return (
  <div className={nightMode ? 'spinner dark' : 'spinner light'}></div>
  )
}