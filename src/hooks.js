import { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { globalHistory } from '@reach/router'
import { useShopifyCustomerAccessTokenWithContext } from 'react-shopify-hooks'

// Navigate to another path if not signed in. Defaults to the sign in page.
export const useAuthenticatedRoute = (to = '/sign-in/') => {
  const { isSignedIn } = useShopifyCustomerAccessTokenWithContext()

  useEffect(() => {
    if (!isSignedIn) navigate(to)
  }, [isSignedIn])
}

// Navigate to another path if signed in. Defaults to the account page.
export const useUnauthenticatedRoute = (to = '/account/') => {
  const { isSignedIn } = useShopifyCustomerAccessTokenWithContext()

  useEffect(() => {
    if (isSignedIn) navigate(to)
  }, [isSignedIn])
}

// Returns the global location.
export const useLocation = () => {
  const initialState = {
    location: globalHistory.location,
    navigate: globalHistory.navigate,
  }

  const [state, setState] = useState(initialState)

  useEffect(() => {
    const removeListener = globalHistory.listen(params => {
      const { location } = params
      const newState = Object.assign({}, initialState, { location })
      setState(newState)
    })

    return () => {
      removeListener()
    }
  }, [])

  return state
}
