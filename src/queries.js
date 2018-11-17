import gql from 'graphql-tag'

export const GET_CUSTOMER_ACCESS_TOKEN = gql`
  query {
    customerAccessToken @client
  }
`

export const GET_PRODUCT = gql`
  query($handle: String!) {
    shop {
      productByHandle(handle: $handle) {
        variants(first: 250) {
          edges {
            node {
              id
              availableForSale
            }
          }
        }
      }
    }
  }
`

export const SIGN_IN = gql`
  mutation($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      userErrors {
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`
