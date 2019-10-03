import React from 'react';
import { Link } from 'gatsby';
import { css } from 'emotion';

const style = `
  box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  border-radius: 5px;
  padding: 20px 30px;
  margin-bottom: 30px;
  h3 {
    margin: 0;
  }
  a {
    color: #212121; 
    text-decoration: none;
  }
`

const BlogItem = ({ content }) => {
  const { frontmatter } = content;
  return (
    <React.Fragment>
      <div className={ css`${style}` }>
        <Link to={content.fields.slug}>
          <h3 className>{ frontmatter.title }</h3>
          <small>{ frontmatter.date }</small>
        </Link>
      </div>
    </React.Fragment>
  )
}

export default BlogItem;