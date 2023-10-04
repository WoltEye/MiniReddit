import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './Root.css'
import { selectHasError, selectSubredditHasError, selectSubredditData } from '../../Features/Api/redditApiSlice.js';
import { selectShowNotification } from '../../Components/NotificationOverlay/notificationOverlaySlice';
import { useSelector } from 'react-redux';
import SecondaryNavBar from '../SecondaryNavBar/SecondaryNavBar.jsx';
import NavBar from '../MainNavBar/MainNavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import NotificationOverlay from '../NotificationOverlay/NotificationOverlay';
import SubredditHeader from '../SubredditHeader/SubredditHeader';
import SubredditInfo from '../SubredditInfo/SubredditInfo';
import { selectCurrentPage } from '../../Features/CurrentPage/currentPageSlice';
import Alert from '../Alert/Alert';


export default function Root() {
  const hasError = useSelector(selectHasError);
  const showNotification = useSelector(selectShowNotification);
  const subredditHasError = useSelector(selectSubredditHasError);
  const subredditData = useSelector(selectSubredditData);
  const currentPage = useSelector(selectCurrentPage);
  const location = useLocation();
  const isOnSearchPage = currentPage === 'search';
  const isOnUserFeed = currentPage === 'userFeed';

  return (
    <>
    { showNotification && <NotificationOverlay /> }
    { subredditData && !hasError && !subredditHasError &&
    <SubredditHeader subredditData={subredditData}/>
    }
    <NavBar />
    {
      !hasError && 
      !isOnSearchPage && 
      !subredditHasError &&
      !isOnUserFeed
      || !hasError &&
      !subredditHasError && 
      !isOnSearchPage &&
      !isOnUserFeed ?
     <Alert /> : <></>
    }
    { !hasError && 
      !isOnSearchPage && 
      !subredditHasError &&
      !isOnUserFeed
      || !hasError &&
      !subredditHasError && 
      !isOnSearchPage &&
      !isOnUserFeed
      ? <SecondaryNavBar /> : <></> }
    <Outlet />
    { !hasError && !subredditHasError &&
    <Footer /> 
    }
    </>
  )
}
