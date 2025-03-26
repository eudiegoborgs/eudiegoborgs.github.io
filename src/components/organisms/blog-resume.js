import React from 'react'
import { Link } from "gatsby"
import { useStaticQuery, graphql } from 'gatsby'
import BlogItem from './blog-item'
import { css } from '@emotion/react'


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

const styles = css`
  margin-top: 2rem;

  .post-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 16px; 
    justify-items: center;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .post-header {
    display: flex;
    justify-content: space-between;
    color: var(--primary-light);
    padding-bottom: 20px;
  }
`

const BlogResume = () => {
  const allBlogList = useStaticQuery(blogListQuery)
  const list = allBlogList.allMarkdownRemark.edges

  return (
    <div css={ styles }>
      <div className="post-header">
        <h2>Posts recentes</h2>
        <Link to="/blog">
          Ver mais posts...
        </Link>
      </div>
      <div className="post-list">
        {list.map(item => <BlogItem key={item.slug} content={item.node}/>)}
      </div>
    </div>
  )
}

export default BlogResume
