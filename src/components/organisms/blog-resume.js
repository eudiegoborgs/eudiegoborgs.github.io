import React from 'react'
import { Link } from "gatsby"
import { useStaticQuery, graphql } from 'gatsby'
import BlogItem from './blog-item'
import { css } from '@emotion/react'


const blogListQuery = graphql`
  # Query atualizada para forçar reavaliação de posts publicados no build
  query {
    recentPublishedPosts {
      excerpt(pruneLength: 160)
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
    align-items: center;
    color: var(--primary-light);
    padding-bottom: 20px;

    a {
      color: var(--primary-light);
      transition: color 0.2s ease;
      &:hover {
        color: var(--white);
      }
    }
  }
`

const BlogResume = () => {
  const data = useStaticQuery(blogListQuery)
  const list = data.recentPublishedPosts || []

  return (
    <div css={ styles }>
      <div className="post-header">
        <h2>Posts recentes</h2>
        <Link to="/blog">
          Ver mais posts...
        </Link>
      </div>
      <div className="post-list">
        {list.map(item => <BlogItem key={item.fields.slug} content={item}/>)}
      </div>
    </div>
  )
}

export default BlogResume
