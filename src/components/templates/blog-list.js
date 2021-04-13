import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../themes/layout'
import SEO from '../organisms/seo'
import Content from '../organisms/content'
import BlogItem from '../organisms/blog-item'

const BlogList = (props) => {
  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '/blog/' : `/blog/page/${currentPage - 1}`
  const nextPage = `/blog/page/${currentPage + 1}`

  const list = props.data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Blog" />
      <Content>
        <main>
          <h2>Blog</h2>
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
            date(locale: "pt-br", formatString: "DD [de] MMMM")
            title
          }
        }
      }
    }
  }
`

export default BlogList