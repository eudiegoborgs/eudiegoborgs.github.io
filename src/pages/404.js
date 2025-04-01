import React from "react"
import Layout from "../components/themes/layout";
import SEO from "../components/organisms/seo";
import Content from "../components/atoms/content";
import BlogResume from "../components/organisms/blog-resume";
import { css } from "@emotion/react";

const style = css`
  text-align: center;
  .code {
    font-size: 4rem;
    line-height: 7rem;
    font-weight: bold;
    padding: 5px 20px;
    background: var(--primary);
  }
  h1 {
    text-transform: uppercase;
  }
`;

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Content>
      <main css={style}>
        <span>:/</span>
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
