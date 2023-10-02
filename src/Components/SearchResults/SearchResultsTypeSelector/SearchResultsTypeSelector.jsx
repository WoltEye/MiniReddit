import React from 'react';
import { NavLink } from 'react-router-dom';
import './SearchResultsTypeSelector.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeSearchType, selectNightmode } from '../../../Features/CurrentPage/currentPageSlice';
import './SearchResultsTypeSelector.css';
import { selectIsLoading } from '../../../Features/Api/redditApiSlice';

export default function SearchResultsTypeSelector({ query, type }) {
  const nightMode = useSelector(selectNightmode);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const changeType = selectedType => {
    dispatch(changeSearchType(selectedType));
  }

  return (
    <div 
    className={nightMode ? 'search-results-type-selector dark' : 'search-results-type-selector light'}>
      <NavLink 
      to={!isLoading ? `?q=${query}&type=link` : null}
      onClick={() => { changeType('link') }}>
        <div className={type === 'link' || !type ? 'postsType type selected' : 'postsType type'}>
          <p>Posts</p>
        </div>
      </NavLink>
      <NavLink 
      to={!isLoading ? `?q=${query}&type=sr` : null}
      onClick={() => { changeType('sr') }}>
        <div className={type === 'sr' ? 'communities type selected' : 'communities type'}>
          <p>Communities</p>
        </div>
      </NavLink>
      <NavLink 
      to={!isLoading ? `?q=${query}&type=user` : null}
      onClick={() => { changeType('user') }}>
        <div className={type === 'user' ? 'users type selected' : 'users type'}>
          <p>Users</p>
        </div>
      </NavLink>
    </div>
  )
}