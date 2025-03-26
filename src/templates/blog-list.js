import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/themes/layout'
import Content from '../components/atoms/content'
import BlogItem from '../components/organisms/blog-item'
import SEO from '../components/organisms/seo'

const BlogList = (props) => {
  const list = props.data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Blog" />
      <Content>
        <main>
          <h1 style={{marginTop: '3rem'}}>Blog</h1>
          {list.map(item => <BlogItem content={item.node}/>)}
        </main>
      </Content>
    </Layout>
  )
}

export const BlogListQuery = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
            readingTime {
              text
              minutes
            }
          }
          frontmatter {
            date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
            title
          }
        }
      }
    }
  }
`

export default BlogList
