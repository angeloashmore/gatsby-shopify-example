// Load .env files.
// .env.development - Loaded during `yarn develop`
// .env.production  - Loaded during `yarn build`
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

// Configure the following constants for the project.
const SITE_TITLE = 'Gatsby Shopify Example'
const SITE_TITLE_SHORT = 'Example'
const SITE_DESCRIPTION =
  'Example Gatsby website to test Shopify static and live data'
const SITE_URL = 'https://gatsby-shopify-example.netlify.com'

const SHOPIFY_SHOP_NAME = process.env.GATSBY_SHOPIFY_SHOP_NAME
const SHOPIFY_ACCESS_TOKEN = process.env.GATSBY_SHOPIFY_ACCESS_TOKEN

module.exports = {
  __experimentalThemes: [
    {
      resolve: '@walltowall/gatsby-theme-ww-base',
      options: {
        root: __dirname,
        siteTitle: SITE_TITLE,
        siteTitleShort: SITE_TITLE_SHORT,
        siteDescription: SITE_DESCRIPTION,
        siteUrl: SITE_URL,
        withNetlify: true,
      },
    },
  ],
  plugins: [
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        helpers: '@walltowall/helpers',
        system: '@walltowall/system',
      },
    },
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['react-shopify-hooks'],
      },
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: {
        prefixes: ['/account/*'],
      },
    },
    {
      resolve: 'gatsby-source-shopify',
      options: {
        shopName: SHOPIFY_SHOP_NAME,
        accessToken: SHOPIFY_ACCESS_TOKEN,
      },
    },
  ],
}
