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
            readingTime {
              text
              minutes
            }
          }
          frontmatter {
            date(locale: "pt-br", formatString: "DD [de] MMMM")
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
      {list.map(item => <BlogItem key={item.slug} content={item.node}/>)}
      <Link to="/blog">
        Ver mais posts...
      </Link>
    </div>
  )
}

export default BlogResume