import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { css } from 'emotion';
import LightButton from "../atoms/light-button";

const style = css`
  background: #212121;

  .container {
    margin: 0 auto;
    max-width: 960px;
    padding: 1rem 1.0875rem;
  }

  h1 {
    display: inline;
    margin: 0;
    line-height: 1;
    font-size: 1.5rem;
  }

  a {
    color: white !important;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
  }

  .right {
    float: right;
    display: flex;
    align-items: center;

    >* {
      padding: 0 5px;
    }
  }
`;

const Header = ({ siteTitle }) => (
  <header className={style}>
    <div className="container">
      <h1>
        <Link>
          <span>{siteTitle}</span>
        </Link>
      </h1>
      <div className="right">
        <Link to="blog">
          Blog
        </Link>
        <h1>
          <LightButton />
        </h1>
      </div>
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
