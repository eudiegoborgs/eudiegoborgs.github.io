import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { css } from 'emotion'
import BlogItem from './blog-item'


const blogListQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 2
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(locale: "pt-br", formatString: "DD MMM[,] YYYY")
            title
          },
        }
      }
    }
  }
`

const BlogResume = () => {
  const allBlogList = useStaticQuery(blogListQuery)
  const list = allBlogList.allMarkdownRemark.edges

  return (
    <div className={ css`margin-top: 5rem` }>
      <h2>Posts recentes</h2>
      {list.map(item => <BlogItem content={item.node}/>)}
    </div>
  )
}

export default BlogResume