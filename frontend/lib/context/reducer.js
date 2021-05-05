const initialState = {
  loading: false,
  user: null,
  token: null,
  showAuthModal: false,
  showBackToTop: false,
  progress: 0,
  errorMessage: null,
}

function AppReducer(initialState, action) {
  console.log(action.type)

  switch (action.type) {
    case 'INITIALIZE_REQUEST':
      return {
        ...initialState,
        loading: true,
      }

    case 'INITIALIZE_SUCCESS':
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      }

    case 'INITIALIZE_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      }

    case 'FETCH_USER_REQUEST':
      return {
        ...initialState,
        loading: true,
      }

    case 'FETCH_USER_SUCCESS':
      return {
        ...initialState,
        user: action.payload,
        loading: false,
      }

    case 'FETCH_USER_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      }

    case 'REGISTER_REQUEST':
      return {
        ...initialState,
        loading: true,
      }

    case 'REGISTER_SUCCESS':
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      }

    case 'REGISTER_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      }

    case 'LOGIN_REQUEST':
      return {
        ...initialState,
        loading: true,
      }

    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      }

    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      }

    case 'GOOGLE_AUTH_REQUEST':
      return {
        ...initialState,
        loading: true,
      }

    case 'GOOGLE_AUTH_SUCCESS':
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      }

    case 'GOOGLE_AUTH_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      }

    case 'LOGOUT':
      return {
        ...initialState,
        user: null,
        token: null,
        loading: false,
        errorMessage: null,
      }

    case 'SHOW_BACK_TO_TOP':
      return {
        ...initialState,
        showBackToTop: true,
      }

    case 'HIDE_BACK_TO_TOP':
      return {
        ...initialState,
        showBackToTop: false,
      }

    case 'SHOW_BACK_TO_TOP_ERROR':
      return {
        ...initialState,
        errorMessage: action.error,
      }

    case 'SHOW_AUTH_MODAL':
      return {
        ...initialState,
        showAuthModal: true,
      }

    case 'HIDE_AUTH_MODAL':
      return {
        ...initialState,
        showAuthModal: false,
      }

    case 'SHOW_AUTH_MODAL_ERROR':
      return {
        ...initialState,
        errorMessage: action.error,
      }

    case 'PROGRESS':
      return {
        ...initialState,
        progress: action.payload,
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export { AppReducer, initialState }
