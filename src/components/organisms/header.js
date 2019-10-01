import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import SocialMenu from "../molecules/social-menu"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#212121`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1rem 1.0875rem`,
      }}
    >
      <h1 
        style={{ 
          margin: 0,
          lineHeight: 1,
          fontSize: `1.5rem`,
        }}
      >
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <span>{siteTitle}</span>
        </Link>
        <SocialMenu />
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
