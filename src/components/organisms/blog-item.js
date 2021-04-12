import React from 'react';
import { Link } from 'gatsby';
import { css } from 'emotion';
import ReadTime from '../atoms/read-time';

const style = css`
  box-shadow: 0 10px 16px 0 rgba(0,0,0,0.1),0 6px 20px 0 rgba(0,0,0,0.1);
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
      <div className={ style }>
        <Link to={`/${content.fields.slug}`} className="blog-link">
          <h3 className>{ frontmatter.title }</h3>
          <small>{ frontmatter.date }</small>
        </Link>
      </div>
    </React.Fragment>
  )
}

export default BlogItem;