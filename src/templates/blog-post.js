import React from 'react'
import { Disqus } from 'gatsby-plugin-disqus'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'
import Content from '../components/atoms/content';
import ReadTime from '../components/atoms/read-time';
import BlogItem from '../components/organisms/blog-item';
import Layout from '../components/themes/layout';
import SEO from '../components/organisms/seo';

const style = css`
  text-decoration: none;
  margin-top: 3rem;
  h1 {
    display: inline;
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
  .time-icon {
    color: var(--primary);
    font-weight: bold;
  }
  .pagination {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .previous, .next {
      min-width: 50%;
      padding: 0 5px;
    }
    .blog-box {
      padding: 10px 15px;
    }
    h3 {
      font-size: 1rem;
    }
  }
`;

const BlogPost = (props) => {
  const post = props.data.markdownRemark
  const next = props.pageContext.next
  const previous = props.pageContext.previous
  const disqusConfig = {
    url: `https://diegoborgs.com.br/${post.fields.slug}`,
    identifier: post.id,
    title: post.title,
  }

  return (
    <Layout>
      <SEO title={`Blog - ${post.frontmatter.title}`} />
      <Content>
        <main css={ style }>
          <header>
            <div>
              <h1>{ post.frontmatter.title }</h1>
            </div>
            <small><ReadTime time={post.fields.readingTime.minutes} className="time-icon"/> • { post.frontmatter.date }</small>
          </header>
          <article dangerouslySetInnerHTML={{ __html: post.html }} />
          <div className="pagination">
            {previous && (
              <div className="previous">
                Post anterior:
                <BlogItem content={previous} />
              </div>
            )}
            {next && (
              <div className = "next" >
                Proxímo post:
                <BlogItem content={next}/>
              </div>
            )}
          </div>
          <div>
            <Disqus config={disqusConfig} />
          </div>
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
`
