# gatsby-shopify-example

Example Gatsby website with Shopify integration. This pulls data in from
Shopify in two stages:

- **Build Time**: All product data is fetched at build time to generate product
  pages. For example, product names, images, and variants.

- **Run Time**: Live data that cannot (or should not) be statically rendered.
  For example, product stock levels, shopping carts, and user data.

This allows us to build a fully-featured e-commerce website using a standard
Gatsby/React workflow.

## Considerations

- **SEO**

  Product pages are statically rendered and are available to search engines
  without JavaScript.

- **Non-static pages when the visitor disables JavaScript**

  Pages like carts and account info are client-only and are not statically
  built. Instead, they rely on React to fetch and render the content
  dynamically in the browser. This requires JavaScript, meaning it is
  inaccessbile to users who explicitly disable JavaScript.

  Roughly 1% worldwide disable JavaScript. Depending on the target audience of
  the website, this number could be nearly 0.

  Creating a better experience for 99% of users (faster, visually appealing,
  better features) is worth the trade-off. A message can be posted to users
  specifically without JavaScript to enable JavaScript.

- **Dependent on Shopify's API**

  From a purely data handling perspective, this is no different than using
  Shopify's hosted service. As APIs change, the website will need to evolve to
  ensure compatibility with the service whether it is hosted on Shopify or a
  custom website.

  The Shopify Storefront API is built specifically for custom storefronts, like
  a Gatsby-powered website. As such, the API it provides will be tailored
  exactly for the purpose of this website.

  Changes to the API are well documented in the documentation and GraphQL API.
