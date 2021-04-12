import React from 'react'
import { Link } from "gatsby"
import { useStaticQuery, graphql } from 'gatsby'
import { css } from 'emotion'
import BlogItem from './blog-item'


const blogListQuery = graphql`
  query {
    allMarkdownRemark(
      limit: 3
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
      <Link to="/blog">
        Ver mais posts...
      </Link>
    </div>
  )
}

export default BlogResume