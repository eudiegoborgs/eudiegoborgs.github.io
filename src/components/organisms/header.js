import { Link } from "gatsby"
import React from "react"
import { css } from 'emotion';
import LightButton from "../molecules/light-button";
import BrandName from '../atoms/brand-name';

const style = css`
  background: #212121;

  .container {
    margin: 0 auto;
    max-width: 960px;
    padding: 1rem 1.0875rem;
    display: flex;
    justify-content: space-between;
  }

  .menu-item {
    color: white !important;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    @media (max-width: 780px) {
      font-size: 0.7rem;
    }
  }

  .right, .left {
    display: flex;
    align-items: center;

    >* {
      padding: 0 10px;
      @media (max-width: 780px) {
        padding: 0 5px;
      }
    }
  }
`;

const Header = () => (
  <header className={style}>
    <div className="container">
      <div className="left">
        <BrandName />
      </div>
      <div className="right">
        <LightButton />
        <Link to="curriculo" className="menu-item">
          Curriculo
        </Link>
        <Link to="blog" className="menu-item">
          Blog
        </Link>
      </div>
    </div>
  </header>
)

export default Header
