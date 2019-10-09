import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import SocialMenu from "../molecules/social-menu"
import { css } from 'emotion';

const style = css`
  background: #212121;

  .container {
    margin: 0 auto;
    max-width: 960px;
    padding: 1rem 1.0875rem;
  }

  h1 {
    margin: 0;
    line-height: 1;
    font-size: 1.5rem;
  }

  a {
    color: white !important;
    text-decoration: none;
  }
`;

const Header = ({ siteTitle }) => (
  <header className={style}>
    <div className="container">
      <h1>
        <Link>
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
