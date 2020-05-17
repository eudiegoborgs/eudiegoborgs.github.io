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
    @media (max-width: 780px) {
      font-size: 0.7rem;
      line-height: 2rem;
    }
  }

  .right {
    float: right;
    display: flex;
    align-items: center;

    >* {
      padding: 0 10px;
      @media (max-width: 780px) {
        padding: 0 5px;
      }
    }
  }

  .hide-mobile {
    @media (max-width: 780px) {
      display: none;
    }
  }
  .logo {
    @media (max-width: 780px) {
      font-size: 0.9rem;
      line-height: 2rem;
    }
  }
`;

const Header = ({ siteTitle }) => (
  <header className={style}>
    <div className="container">
      <h1>
        <Link className="logo">
          <span>{siteTitle}</span>
        </Link>
      </h1>
      <div className="right">
        <LightButton />
        <Link to="curriculo">
          Curriculo
        </Link>
        <Link to="blog">
          Blog
        </Link>
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
