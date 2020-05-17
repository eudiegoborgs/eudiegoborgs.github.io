import React from 'react'
import { css } from 'emotion'
import { useStaticQuery, graphql, Link } from "gatsby"

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
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Link className={style}>
      {data.site.siteMetadata.title}
    </Link>
  )
}

export default BrandName;