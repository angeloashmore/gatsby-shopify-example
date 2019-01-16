// import { graphql, withApollo } from 'react-apollo'
// import { compose, get, isEmpty } from 'lodash/fp'

// import { GET_CUSTOMER_ACCESS_TOKEN, GET_CUSTOMER } from 'src/queries'

export const CustomerQuery = ({ children, ...props }) =>
  children({ ...props, isAuthenticated: false, customerAccessToken: '', customer: {} })

// export const CustomerQuery = compose(
//   graphql(GET_CUSTOMER_ACCESS_TOKEN, { name: 'customerAccessTokenData' }),
//   graphql(GET_CUSTOMER, {
//     name: 'customerData',
//     skip: ({ customerAccessTokenData }) =>
//       compose(
//         isEmpty,
//         get('customerAccessToken')
//       )(customerAccessTokenData),
//     options: ({ customerAccessTokenData }) => ({
//       variables: {
//         customerAccessToken: get(
//           'customerAccessToken',
//           customerAccessTokenData
//         ),
//       },
//     }),
//   }),
//   withApollo
// )(({ children, ...props }) =>
//   children({
//     ...props,
//     isAuthenticated: Boolean(
//       get('customerAccessTokenData.customerAccessToken', props)
//     ),
//     customerAccessToken: get(
//       'customerAccessTokenData.customerAccessToken',
//       props
//     ),
//     customer: get('customerData', props),
//   })
// )
