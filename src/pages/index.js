import React from 'react'

import { Layout } from 'src/components/Layout'
import { Link } from 'src/components/Link'

const IndexPage = () => (
  <Layout>
    <Link to="/products/">Go to Products page</Link>
  </Layout>
)

export default IndexPage
