import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/themes/layout'
import Content from '../components/atoms/content'
import BlogItem from '../components/organisms/blog-item'
import SEO from '../components/organisms/seo'

const BlogList = (props) => {
  const list = props.data.allMarkdownRemark.edges
  const totalCount = props.data.allMarkdownRemark.totalCount

  return (
    <Layout>
      <SEO title="Blog" />
      <Content>
        <main>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '3rem', marginBottom: '1.5rem' }}>
            <h1 style={{ margin: 0 }}>Blog</h1>
            <span style={{
              fontSize: '0.95rem',
              color: 'var(--primary-light)',
              backgroundColor: 'var(--black)',
              padding: '6px 14px',
              borderRadius: '16px',
              fontWeight: '600'
            }}>
              {totalCount} {totalCount === 1 ? 'artigo' : 'artigos'}
            </span>
          </div>
          {list.map(item => <BlogItem key={item.node.fields.slug} content={item.node}/>)}
        </main>
      </Content>
    </Layout>
  )
}

export const BlogListQuery = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!, $currentDate: Date!) {
    allMarkdownRemark(
      filter: { frontmatter: { date: { lte: $currentDate } } }
      sort: { frontmatter: { date: DESC } }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 160)
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
