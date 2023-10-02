import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import redditApiSlice from '../Features/Api/redditApiSlice'
import notificationOverlaySlice from '../Components/NotificationOverlay/notificationOverlaySlice'
import currentPageSlice from '../Features/CurrentPage/currentPageSlice'

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({ reducer: { redditApi: redditApiSlice, notificationOverlay: notificationOverlaySlice, currentPage: currentPageSlice}, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions}) }
}