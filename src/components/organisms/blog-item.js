import React from 'react';
import { Link } from 'gatsby';
import { css } from 'emotion';
import ReadTime from '../atoms/read-time';

const style = css`
  background-color: #11C76F;
  border-radius: 5px;
  padding: 20px 30px;
  margin-bottom: 35px;
  h3 {
    margin: 0;
  }
  a {
    text-decoration: none;
  }
`

const BlogItem = ({ content }) => {
  const { frontmatter } = content;
  return (
    <React.Fragment>
      <div className={ `${style} blog-box` }>
        <Link to={`/${content.fields.slug}`} className="blog-link">
          <h3 className>{ frontmatter.title }</h3>
          <small>{ frontmatter.date }</small>
        </Link>
      </div>
    </React.Fragment>
  )
}

export default BlogItem;