export const authReducer = (auth, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...auth,
          userToken: action.token,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...auth,
          isSignout: false,
          userToken: action.token,
          authError: false
        };
      case 'SIGN_OUT':
        return {
          ...auth,
          isSignout: true,
          userToken: null,
        };
      case 'AUTH_ERROR':
        return {
          ...auth,
          authError: action.status,
        };
      case 'SET_LOADING':
        return {
          ...auth,
          isLoading: action.loading
        }
      default: 
        return state;
    }
  }