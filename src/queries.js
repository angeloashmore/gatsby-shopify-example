// import gql from 'graphql-tag'

// export const GET_CUSTOMER_ACCESS_TOKEN = gql`
//   query {
//     customerAccessToken @client
//   }
// `

// export const GET_PRODUCT = gql`
//   query($handle: String!) {
//     shop {
//       productByHandle(handle: $handle) {
//         variants(first: 250) {
//           edges {
//             node {
//               id
//               availableForSale
//             }
//           }
//         }
//       }
//     }
//   }
// `

// export const SIGN_IN = gql`
//   mutation($input: CustomerAccessTokenCreateInput!) {
//     customerAccessTokenCreate(input: $input) {
//       userErrors {
//         field
//         message
//       }
//       customerAccessToken {
//         accessToken
//         expiresAt
//       }
//     }
//   }
// `

// export const GET_CUSTOMER = gql`
//   query($customerAccessToken: String!) {
//     customer(customerAccessToken: $customerAccessToken) {
//       displayName
//     }
//   }
// `

// export const CHECKOUT_CREATE = gql`
//   mutation($input: CheckoutCreateInput!) {
//     checkoutCreate(input: $input) {
//       checkout {
//         id
//       }
//     }
//   }
// `

// export const CHECKOUT_GET = gql`
//   query($id: ID!) {
//     node(id: $id) {
//       id
//       ... on Checkout {
//         webUrl
//         lineItems(first: 250) {
//           edges {
//             node {
//               id
//               title
//               variant {
//                 product {
//                   id
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `

// export const CHECKOUT_GET_LOCAL_ID = gql`
//   query {
//     checkoutId @client
//   }
// `

// export const CHECKOUT_LINE_ITEMS_REPLACE = gql`
//   mutation($lineItems: [CheckoutLineItemInput!]!, $checkoutId: ID!) {
//     checkoutLineItemsReplace(lineItems: $lineItems, checkoutId: $checkoutId) {
//       checkout {
//         id
//       }
//     }
//   }
// `
