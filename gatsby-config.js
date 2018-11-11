const shopName = 'hokulani-bake-shop'
const accessToken = 'd7675449a3457fdf3a8f615fbdb2336b'

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-root-import',
    'gatsby-plugin-lodash',
    'gatsby-plugin-sharp',
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
