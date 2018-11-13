# gatsby-shopify-example

Example Gatsby website with Shopify integration. This pulls in data from
Shopify in two stages:

- **Build Time**: All product data is fetched at build time to generate product
  pages. For example, product names, images, and variants.

- **Run Time**: Live data that cannot (or should not) be statically rendered.
  For example, product stock levels, shopping carts, and user data.

This allows us to build a fully-featured e-commerce website using a standard
Gatsby/React workflow.

## Benefits

- **Speed**

  This method benefits from all the speed enhancements provided by static sites
  and Gatsby.

- **Portability**

  The website can be hosted anywhere. Netlify is preferred for to its
  static-site-focused product, but any Continuous Integration and web server
  can serve the website.

- **Single codebase**

  A single project contains both marketing and e-commerce pages with shared
  code. Unlike a typical Shopify experience, marketing content can be managed
  with other CMS services, like Prismic or Contentful, while product and
  inventory data is managed by Shopify. Data from both services are combined
  into one seamless experience from a developer and end-user experience.

- **Scalability**

  Due to the static nature of a static site, minimal resources are necessary to
  run the website. Shopify does not need to render each page on its servers.

- **Gatsby/React**

  The benefits of Gatsby and React will not be listed here as there are many
  other resources for that information, but they are tremendously helpful in
  creating a modern site quickly and cleanly.

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

## Technologies

The following technologies (i.e. libraries, frameworks) are used in this
example.

- Gatsby
- React
- GraphQL
- Apollo (via `apollo-boost`)

`gatsby-source-shopify` is used to gather product information at build time.
This eventually can be replaced with the more generic `gatsby-source-graphql`
once `gatsby-image` processing and pagination issues are sorted.

## Sitemap

The following serves as a reference to the pages necessary for an e-commerce
website. This project aims to provide an example for each page.

- Home
- About
- Products (paginated)
  - Collections (paginated)
  - Individual Product
- Cart (guest and authenticated)
- Sign In
- Sign Up
- Forgot Password
- Account (authenticated)
  - Orders (paginated)
  - Addresses
  - Sign Out
