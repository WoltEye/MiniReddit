import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearEverything, selectError, selectSubredditError } from '../../../Features/Api/redditApiSlice.js';
import './Error.css';

export default function Error() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = useSelector(selectError);

    const handleGoBack = () => {
      dispatch(clearEverything());
      navigate('/');
    }

    return (
        <div id='fetch-error-container'>
          <h1>{ error?.error }</h1>
          <p>
            { error?.error === 429 ? 
            'Reddits ratelimit reached please wait two to five minutes before using the app again...'
            : error?.message }
          </p>
           <div className='error-button-container'>
             <button onClick={handleGoBack}>Go back</button>
           </div> 
        </div>
    )
}