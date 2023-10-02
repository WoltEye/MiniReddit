import React, { useEffect } from 'react'
import './App.css'
import { useSelector } from 'react-redux';
import {
createBrowserRouter,
createRoutesFromElements,
RouterProvider,
Route
} from 'react-router-dom';
import Root from '../Components/Root/Root.jsx';
import RouterError from '../Components/RouterError/RouterError';
import CurrentPage from '../Features/CurrentPage/CurrentPage.jsx';
import CommentsOverlay from '../Components/CommentsOverlay/CommentsOverlay';
import SearchResults from '../Components/SearchResults/SearchResults';
import Error from '../Components/Posts/Error/Error.jsx';
import { selectNightmode } from '../Features/CurrentPage/currentPageSlice';
import UserProfile from '../Components/UserFeed/UserFeed';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />} errorElement={<RouterError />}> 
      <Route path='/' element={<CurrentPage />} />
      <Route path='r/:subreddit' element={<CurrentPage />} >
        <Route path='comments/:postId/:postName' element={<CommentsOverlay />} />
      </Route>
      <Route path='/user/:username/' element={<UserProfile />}/>
      <Route path='/user/:username/:userFeedFilter' element={<UserProfile />}/>
      <Route path='r/:subreddit/:filterMethod' element={<CurrentPage />} />
      <Route path='/search' element={<SearchResults />}/>
      <Route path='/error' element={<Error />} />
    </Route>
  )
)

function App() {
  const nightMode = useSelector(selectNightmode);
  useEffect(() => {
    if(nightMode) {
      document.body.style.background = 'rgb(5,5,5)';
    } else {
      document.body.style.background = 'rgb(210,210,210)'
    }
  }, [nightMode]) 
  return (
    <>
    <RouterProvider router={router} />  
    </>
  )
}

export default App
