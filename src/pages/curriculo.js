import React from "react"
import Layout from "../components/themes/layout"
import SEO from "../components/organisms/seo"
import Banner from "../components/organisms/banner"
import Content from "../components/organisms/content"
import BlogResume from "../components/organisms/blog-resume"
import { Link } from "gatsby"
import curriculo from '../images/curriculo.png';

const CurriculoPage = () => (
  <Layout>
    <SEO title="Curriculo" />
    <Content>
      <main style={{textAlign: 'center'}}>
        <img src={curriculo} />
      </main>
      <BlogResume />
      <Link to="blog">
        Ver mais posts
      </Link>
    </Content>
  </Layout>
)

export default CurriculoPage
