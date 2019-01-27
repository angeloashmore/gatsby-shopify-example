import React from 'react'

import { useShopifyReducer } from 'src/shopify'
import { Text } from 'system'

export const ShopifyReducerViewer = () => {
  const [state] = useShopifyReducer()

  return (
    <Text bg="white" p={[2, 4]} fontFamily="mono" overflowX="auto">
      {JSON.stringify(state)}
    </Text>
  )
}
