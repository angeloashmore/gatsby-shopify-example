require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const shopName = process.env.SHOPIFY_SHOP_NAME
const accessToken = process.env.SHOPIFY_ACCESS_TOKEN

module.exports = {
  siteMetadata: {
    title: 'Gatsby Shopify Example',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-root-import',
    'gatsby-plugin-lodash',
    'gatsby-plugin-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-apollo-boost',
      options: {
        uri: `https://${shopName}.myshopify.com/api/graphql`,
        headers: {
          'X-Shopify-Storefront-Access-Token': accessToken,
        },
      },
    },
    {
      resolve: 'gatsby-source-shopify',
      options: {
        shopName,
        accessToken,
      },
    },
  ],
}
