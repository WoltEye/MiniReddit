import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearSubredditData, loadSearchResults, selectIsLoading, selectSearchResults, loadComments, loadMoreSearchResults, selectNewSearchResultsIsLoading, clearSearchResults, selectSubredditData } from '../../Features/Api/redditApiSlice';
import { changeCurrentPage, changeCurrentSearchSort, changeCurrentSearchTimeSort, changeSearchType, resetSearchFilters, resetSearchType, selectCurrentPage, selectCurrentSearchType, selectNightmode } from '../../Features/CurrentPage/currentPageSlice';
import './SearchResults.css';
import CommentsOverlay from '../CommentsOverlay/CommentsOverlay';
import Spinner from '../../Components/Spinner/Spinner';
import SearchResult from './SearchResult/SearchResult.jsx';
import SearchResultsTypeSelector from './SearchResultsTypeSelector/SearchResultsTypeSelector';
import SearchResultsFilterSelector from './SearchResultsFilterSelector/SearchResultsFilterSelector';

export default function SearchResults() {
  const [ showComments, setShowComments ] = useState(false);
   
  const searchResults = useSelector(selectSearchResults);
  const searchType = useSelector(selectCurrentSearchType);
  const subredditData = useSelector(selectSubredditData);
  const newSearchResultsIsLoading = useSelector(selectNewSearchResultsIsLoading);
  const nightMode = useSelector(selectNightmode);
  const isLoading = useSelector(selectIsLoading);
  const currentPage = useSelector(selectCurrentPage);
  const location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const q = params.get('q');
  const type = params.get('type');
  const sort = params.get('sort');
  const timeSort = params.get('t');
  const dispatch = useDispatch();

  const loadCommentsFromApi = url => {
    dispatch(loadComments(url));
  }

  const loadMoreSearchResultsFromApi = () => {
    if(timeSort) {
      dispatch(loadMoreSearchResults({searchTerm: q, type: searchType, after: searchResults.data.after, timeSort, sort}));
    } else { 
      dispatch(loadMoreSearchResults({searchTerm: q, type: searchType, after: searchResults.data.after, sort}));
    }
  }

  useEffect(() => {
    if(!type) {
      dispatch(changeSearchType('link'));
      dispatch(loadSearchResults({searchTerm: q, type: searchType}));
    }
    return () => {
      dispatch(resetSearchType());
    }
  }, [])

  useEffect(() => {
    if(type && type !== searchType) {
      dispatch(changeSearchType(type));
    }
    if(subredditData) {
    dispatch(clearSubredditData());
    }
    if(currentPage !== 'search') {
    dispatch(changeCurrentPage('search'));
    }
    if(q && type && type === searchType) {;
    dispatch(loadSearchResults({searchTerm: q, type: searchType, sort, timeSort}));
    dispatch(resetSearchFilters());
    }
    if(sort) {
      dispatch(changeCurrentSearchSort(sort))
    }
    if(timeSort) {
      dispatch(changeCurrentSearchTimeSort(timeSort));
    }
    /*if(sort && q && type && type === searchType && !timeSort) {
      dispatch(changeCurrentSearchSort(sort));
      dispatch(loadSearchResults({searchTerm: q, type: searchType, sort}))
    }
    if(sort && q && type === searchType && timeSort) {
      dispatch(changeCurrentSearchSort(sort))
      dispatch(changeCurrentSearchTimeSort(timeSort));
      dispatch(loadSearchResults({searchTerm: q, type: searchType, sort, timeSort}))
    }*/
  }, [searchType, q, sort, timeSort])

  return (
    <>
      <SearchResultsTypeSelector  
      query={q} 
      type={searchType}/>
    { searchType !== 'sr' && searchType !== 'user' &&
      <SearchResultsFilterSelector />
    }
    { showComments &&
    <CommentsOverlay 
    disableDefaultBehaviour={true}
    showComments={setShowComments} />
    }
    <div className={nightMode && !isLoading ? 'search-results dark'
                    : nightMode && isLoading ? 'search-results dark loading'
                    : !nightMode && !isLoading ? 'search-results light'
                    : 'search-results light loading'}
                    style={isLoading ? {opacity: .3} : {}}>
      <div className={'search-results-container'}>
      {
        searchResults.data && searchResults.data?.children.length > 0 ? 
        searchResults.data.children.map((item, index) => {
        return <React.Fragment key={index}>
                <SearchResult 
                showComments={setShowComments} 
                data={item.data} 
                type={searchType} 
                loadComments={loadCommentsFromApi}/>
                { index !== searchResults.data.children.length - 1 && <hr /> }
              </React.Fragment>
      }) : isLoading ?
         <></>
       : searchResults.data?.children.length < 1 || !searchResults.data ?
        <div 
        className={nightMode ? 'no-search-results dark'
        : 'no-search-results light'}>
          <h2>:(</h2>
          <p>No search results for {q}</p>
        </div>
        :
        <div 
        className={nightMode ? 'no-search-results dark'
        : 'no-search-results light'}>
          <h2>:(</h2>
          <p>No search results for {q}</p>
        </div>
      }
      </div>
    </div>
    { searchResults.data && !isLoading && !newSearchResultsIsLoading && searchResults.data?.after !== null ?
    <button 
    className={nightMode ? 'load-more-search-results dark' : 'load-more-search-results light'}
    onClick={loadMoreSearchResultsFromApi}>
      Load More
    </button>
    : newSearchResultsIsLoading ? <Spinner nightMode={nightMode} />
    : <></>
    }
    </>
  )
}