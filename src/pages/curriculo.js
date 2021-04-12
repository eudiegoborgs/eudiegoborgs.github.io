import React from "react"
import Layout from "../components/themes/layout"
import SEO from "../components/organisms/seo"
import Content from "../components/organisms/content"
import BlogResume from "../components/organisms/blog-resume"
import { Link } from "gatsby"
import curriculo from '../images/curriculo.png';

const CurriculoPage = () => (
  <Layout>
    <SEO title="Curriculo" />
    <Content>
      <main style={{textAlign: 'center'}}>
        <img src={curriculo} alt="Meu curriculo" />
      </main>
      <BlogResume />
    </Content>
  </Layout>
)

export default CurriculoPage
