import React from "react"
import { Link } from "gatsby"
import Layout from "../components/themes/layout"
import SEO from "../components/organisms/seo"
import Content from "../components/organisms/content"
import BlogResume from "../components/organisms/blog-resume"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Content>
      <main style={{textAlign: 'center'}}>
        <h1>404 - NOT FOUND</h1>
        <p>
          Você pode não ter encontrado o que queria, mas tenho alguns posts que podem ser bem interessantes para você.
        </p>
      </main>
      <BlogResume />
      <Link to="/blog">
        Ver mais posts
      </Link>
    </Content>
  </Layout>
)

export default NotFoundPage
