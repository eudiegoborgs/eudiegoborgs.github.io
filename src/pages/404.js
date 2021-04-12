import React from "react"
import { css } from 'emotion'
import Layout from "../components/themes/layout"
import SEO from "../components/organisms/seo"
import Content from "../components/organisms/content"
import BlogResume from "../components/organisms/blog-resume"

const style = css `
  text-align: center;
  .code {
    font-size: 4rem;
    line-height: 7rem;
    font-weight: bold;
    padding: 5px 20px;
    background: #11C76F;
  }
  h1 {
    text-transform: uppercase;
  }
`;

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Content>
      <main className={style}>
        <span className="code">:/</span>
        <h1>404 - Conteúdo não encontrado</h1>
        <p>
          Você pode não ter encontrado o que queria, mas tenho alguns posts que podem ser bem interessantes para você.
        </p>
      </main>
      <BlogResume />
    </Content>
  </Layout>
)

export default NotFoundPage
