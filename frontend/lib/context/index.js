import React, { createContext, useReducer } from 'react'

import { AppReducer, initialState } from './reducer'

const AppStateContext = createContext()
const AppDispatchContext = createContext()

function useAppState() {
  const context = React.useContext(AppStateContext)
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider')
  }

  return context
}

function useAppDispatch() {
  const context = React.useContext(AppDispatchContext)
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppProvider')
  }

  return context
}

function AppProvider({ children }) {
  const [userState, dispatch] = useReducer(AppReducer, initialState)

  return (
    <AppStateContext.Provider value={userState}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

export { AppProvider, useAppDispatch, useAppState }
