import React from 'react'
import { graphql } from 'gatsby'
import { css } from 'emotion'
import Layout from '../themes/layout'
import SEO from '../organisms/seo'
import Content from '../organisms/content'

const style = `
  text-decoration: none;
  h1 {
    margin: 0;
  }
  header {
    margin-bottom: 30px;
  }
  blockquote {
    font-style: italic;
    font-size: 1.1rem;
    margin-left: 0;
    font-weight: bold;
  }
  blockquote:before {
    content: "\f10d";
    font-family: 'Fontawesome';
    float: left;
    margin-right: 10px;
  }
  img {
    width: 100%;
  }
`;

const BlogPost = (props) => {
  const post = props.data.markdownRemark
  const next = props.pageContext.next
  const previous = props.pageContext.previous

  return (
    
    <Layout>
      <SEO title="Blog" />
      <Content>
        <main className={ css`${style}` }>
          <header>
            <h1>{ post.frontmatter.title }</h1>
            <small>{ post.frontmatter.date }</small>
          </header>
          <article dangerouslySetInnerHTML={{ __html: post.html }} />
        </main>
      </Content>
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query Post($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
        title
      }
    }
  }
`
