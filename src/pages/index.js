import React from 'react'
import { Link } from 'gatsby'

import Layout from 'src/components/layout'

const IndexPage = () => (
  <Layout>
    <Link to="/products/">Go to Products page</Link>
  </Layout>
)

export default IndexPage
