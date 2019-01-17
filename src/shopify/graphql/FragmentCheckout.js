import { gql } from 'apollo-boost'

import { FragmentDiscountApplication } from './FragmentDiscountApplication'
import { FragmentProductVariantWithProduct } from './FragmentProductVariantWithProduct'

export const FragmentCheckout = gql`
  fragment FragmentMailingAddress on MailingAddress {
    id
    address1
    address2
    city
    company
    country
    firstName
    formatted
    lastName
    latitude
    longitude
    phone
    province
    zip
    name
    countryCode: countryCodeV2
    provinceCode
  }

  fragment FragmentCheckout on Checkout {
    id
    ready
    requiresShipping
    note
    paymentDue
    webUrl
    orderStatusUrl
    taxExempt
    taxesIncluded
    currencyCode
    totalTax
    subtotalPrice
    totalPrice
    completedAt
    createdAt
    updatedAt
    email
    discountApplications(first: 10) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          ...FragmentDiscountApplication
        }
      }
    }
    shippingAddress {
      ...FragmentMailingAddress
    }
    shippingLine {
      handle
      price
      title
    }
    customAttributes {
      key
      value
    }
    order {
      id
      processedAt
      orderNumber
      subtotalPrice
      totalShippingPrice
      totalTax
      totalPrice
      currencyCode
      totalRefunded
      customerUrl
      shippingAddress {
        ...FragmentMailingAddress
      }
      lineItems(first: 250) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            title
            variant {
              ...FragmentProductVariantWithProduct
            }
            quantity
            customAttributes {
              key
              value
            }
          }
        }
      }
    }
    lineItems(first: 250) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          title
          variant {
            ...FragmentProductVariantWithProduct
          }
          quantity
          customAttributes {
            key
            value
          }
          discountAllocations {
            allocatedAmount {
              amount
              currencyCode
            }
            discountApplication {
              ...FragmentDiscountApplication
            }
          }
        }
      }
    }
  }

  ${FragmentDiscountApplication}
  ${FragmentProductVariantWithProduct}
`
