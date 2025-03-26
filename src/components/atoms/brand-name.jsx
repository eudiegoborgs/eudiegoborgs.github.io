import React from 'react'
import { StaticQuery, graphql, Link } from "gatsby"
import { css } from '@emotion/react';

const style = css`
  line-height: 1;
  font-size: 1.3rem;
  color: var(--white) !important;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  @media (max-width: 780px) {
    font-size: 1.2rem;
  }
`;

const BrandName = () => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <Link to="/" css={style}>
          {data.site.siteMetadata.title}
        </Link>
      )}
    />
  )
}

export default BrandName;
