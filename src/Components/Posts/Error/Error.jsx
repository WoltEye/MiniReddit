import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearEverything, selectError, selectSubredditError } from '../../../Features/Api/redditApiSlice.js';
import './Error.css';

export default function Error() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoBack = () => {
      dispatch(clearEverything());
      navigate('/');
    }

    return (
        <div id='fetch-error-container'>
          <h1>Error</h1>
          <p>
            The application has encountered a error
            please wait a couple of minutes before using 
            the app again. Reddit's ratelimit has been
            most likely reached.
          </p>
           <div className='error-button-container'>
             <button onClick={handleGoBack}>Go back</button>
           </div> 
        </div>
    )
}