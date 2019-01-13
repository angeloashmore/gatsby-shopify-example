require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const shopName = process.env.GATSBY_SHOPIFY_SHOP_NAME
const accessToken = process.env.GATSBY_SHOPIFY_ACCESS_TOKEN

module.exports = {
  __experimentalThemes: [
    {
      resolve: '@walltowall/gatsby-theme-ww-base',
      options: {
        root: __dirname,
        siteTitle: 'Gatsby Shopify Example',
        siteTitleShort: 'Shopify',
        siteDescription:
          'Example Gatsby website to test Shopify static and live data',
        siteUrl: 'https://gatsby-shopify-example.netlify.com',
        withNetlify: true,
      },
    },
  ],
  plugins: [
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        system: '@walltowall/system',
      },
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: {
        prefixes: ['/account/orders/*'],
      },
    },
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
