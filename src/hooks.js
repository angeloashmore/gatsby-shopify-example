import { useEffect } from 'react'
import { navigate } from 'gatsby'

import { useShopifyCustomerAccessTokenWithContext } from 'src/shopify'

// Navigate to another path if not signed in. Defaults to the sign in page.
export const useAuthenticatedRoute = (to = '/sign-in/') => {
  const { isSignedIn } = useShopifyCustomerAccessTokenWithContext()

  useEffect(
    () => {
      if (!isSignedIn) navigate(to)
    },
    [isSignedIn]
  )
}

// Navigate to another path if signed in. Defaults to the account page.
export const useUnauthenticatedRoute = (to = '/account/') => {
  const { isSignedIn } = useShopifyCustomerAccessTokenWithContext()

  useEffect(
    () => {
      if (isSignedIn) navigate(to)
    },
    [isSignedIn]
  )
}
