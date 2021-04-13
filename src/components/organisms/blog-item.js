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
  color: #212121;
`

const BlogItem = ({ content }) => {
  const { frontmatter, fields } = content;
  return (
    <React.Fragment>
      <div className={ `${style} blog-box` }>
        <Link to={`/${content.fields.slug}`} className="blog-link">
          <h3 className>{ frontmatter.title }</h3>
        </Link>
        {fields.readingTime && (<small><ReadTime time={fields.readingTime.minutes} className="time-icon"/> - { frontmatter.date }</small>)}
      </div>
    </React.Fragment>
  )
}

export default BlogItem;