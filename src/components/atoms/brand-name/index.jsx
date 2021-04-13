import React from 'react'
import { css } from 'emotion'
import Typewriter from "typewriter-effect"
import { StaticQuery, graphql, Link } from "gatsby"

const style = css`
  line-height: 1;
  font-size: 1.3rem;
  color: white !important;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  @media (max-width: 780px) {
    font-size: 0.9rem;
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
        <Link to="/" className={style}>
          {data.site.siteMetadata.title}
        </Link>
      )}
    />
  )
}

export default BrandName;