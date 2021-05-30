import debounce from 'lodash.debounce'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

import * as API from '@/lib/strapi'
import { MONTH } from '@/lib/constants'

async function initializeUser(dispatch) {
  try {
    dispatch({ type: 'INITIALIZE_REQUEST' })

    const { bb_token } = parseCookies()

    if (bb_token) {
      let data = await API.getCurrentUser(bb_token)

      if (data.id) {
        dispatch({
          type: 'INITIALIZE_SUCCESS',
          payload: { user: data, token: bb_token },
        })

        return data
      }
    }
  } catch (error) {
    dispatch({ type: 'INITIALIZE_ERROR', error: error })
  }
}

async function getCurrentUser(dispatch) {
  try {
    dispatch({ type: 'FETCH_USER_REQUEST' })

    const { bb_token } = parseCookies()

    const data = await API.getCurrentUser(bb_token)

    dispatch({ type: 'FETCH_USER_SUCCESS', payload: data })
    return data
  } catch (error) {
    dispatch({ type: 'FETCH_USER_ERROR', error: error })
  }
}

async function registerUser(dispatch, credentials) {
  try {
    dispatch({ type: 'REGISTER_REQUEST' })

    const data = await API.registerUser(credentials)

    setCookie(null, 'bb_token', data.jwt, {
      path: '/',
      maxAge: MONTH,
    })

    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: { user: data, jwt: data.jwt },
    })
    return data
  } catch (error) {
    dispatch({ type: 'REGISTER_ERROR', error: error })
  }
}

async function loginUser(dispatch, credentials) {
  try {
    dispatch({ type: 'LOGIN_REQUEST' })

    const data = await API.loginUser(credentials)

    setCookie(null, 'bb_token', data.jwt, {
      path: '/',
      maxAge: MONTH,
    })

    const updatedUser = await API.getCurrentUser(data.jwt)

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { user: updatedUser, token: data.jwt },
    })
    return data
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error })
  }
}

async function logoutUser(dispatch) {
  destroyCookie(null, 'bb_token', {
    domain: window.location.hostname,
    path: `/`,
  })

  dispatch({ type: 'LOGOUT_SUCCESS' })
}

async function googleAuthentication(dispatch, access_token) {
  try {
    dispatch({ type: 'GOOGLE_AUTH_REQUEST' })

    const data = await API.googleAuthentication(access_token)

    if (!data.user || !data.jwt) {
      dispatch({
        type: 'GOOGLE_AUTH_ERROR',
        error: 'Google Authentication Error',
      })
    }

    setCookie(null, 'bb_token', data.jwt, {
      path: '/',
      maxAge: MONTH,
    })

    const updatedUser = await API.getCurrentUser(data.jwt)

    dispatch({
      type: 'GOOGLE_AUTH_SUCCESS',
      payload: { user: updatedUser, token: data.jwt },
    })

    return data
  } catch (error) {
    dispatch({ type: 'GOOGLE_AUTH_ERROR', error: error })
  }
}

async function setShowAuthModal(dispatch, showAuthModal = true) {
  try {
    if (showAuthModal) {
      dispatch({ type: 'SHOW_AUTH_MODAL' })
    } else {
      dispatch({ type: 'HIDE_AUTH_MODAL' })
    }
  } catch (error) {
    dispatch({ type: 'AUTH_MODAL_ERROR', error: error })
  }
}

async function setShowBackToTop(dispatch, showBackToTop = true) {
  try {
    if (showBackToTop) {
      dispatch({ type: 'SHOW_BACK_TO_TOP' })
    } else {
      dispatch({ type: 'HIDE_BACK_TO_TOP' })
    }
  } catch (error) {
    dispatch({ type: 'SHOW_BACK_TO_TOP_ERROR', error: error })
  }
}

function setProgress(dispatch, progress = 0) {
  dispatch({ type: 'PROGRESS', payload: progress })
}

const setSearchTerm = debounce(async (dispatch, searchTerm) => {
  try {
    if (searchTerm) {
      const data = await API.getBlogPosts(0, 100, {
        _or: [{ title_contains: searchTerm, meta_description_contains: searchTerm }],
      })
      dispatch({ type: 'SEARCH', payload: { searchTerm, searchResults: data.posts } })
    } else {
      dispatch({ type: 'SEARCH', payload: { searchTerm, searchResults: [] } })
    }
  } catch (error) {
    dispatch({ type: 'SEARCH_ERROR', error: error })
  }
}, 500)

export {
  initializeUser,
  getCurrentUser,
  registerUser,
  loginUser,
  logoutUser,
  googleAuthentication,
  setShowAuthModal,
  setShowBackToTop,
  setSearchTerm,
  setProgress,
}
