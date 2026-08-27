import React from 'react';
import { Link } from 'gatsby';
import ReadTime from '../atoms/read-time';
import Icon from '../atoms/icon';
import { css } from '@emotion/react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const style = css`
  border-radius: 5px;
  padding: 20px 30px;
  margin-bottom: 35px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h3 {
    margin: 0;
  }
  a {
    text-decoration: none;
  }
  .blog-excerpt {
    margin-top: 12px;
    margin-bottom: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    opacity: 0.85;
  }
  color: var(--black);
`

const BlogItem = ({ content }) => {
  const { frontmatter, fields, excerpt } = content;
  return (
    <div css={style} className="blog-box gradient">
      <div>
        <Link to={`/${content.fields.slug}`} className="blog-link">
          <h3>{ frontmatter.title }</h3>
        </Link>
        {fields.readingTime && (<small><ReadTime time={fields.readingTime.minutes} className="time-icon"/> • { frontmatter.date }</small>)}
        {excerpt && <p className="blog-excerpt">{ excerpt }</p>}
      </div>
      <div style={{paddingTop: '10px', textAlign: 'right'}}>
        <Link to={`/${content.fields.slug}`} className="blog-link">
          Ler artigo <Icon source={faArrowRight} />
        </Link>
      </div>
    </div>
  )
}

export default BlogItem;
