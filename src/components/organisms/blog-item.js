import React from 'react';
import { Link } from 'gatsby';
import { css } from 'emotion';
import ReadTime from '../atoms/read-time';
import Icon from '../atoms/icon';

const style = css`
  border-radius: 5px;
  padding: 20px 30px;
  margin-bottom: 35px;
  h3 {
    margin: 0;
  }
  a {
    text-decoration: none;
  }
  color: var(--black);
`

const BlogItem = ({ content }) => {
  const { frontmatter, fields } = content;
  return (
    <React.Fragment>
      <div className={ `${style} blog-box gradient` }>
        <Link to={`/${content.fields.slug}`} className="blog-link">
          <h3 className>{ frontmatter.title }</h3>
        </Link>
        {fields.readingTime && (<small><ReadTime time={fields.readingTime.minutes} className="time-icon"/> • { frontmatter.date }</small>)}
        <div style={{paddingTop: '10px'}}>
          <Link to={`/${content.fields.slug}`} className="blog-link">
            Ler artigo <Icon source="arrow-right" />
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}

export default BlogItem;
