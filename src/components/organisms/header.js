import { Link } from "gatsby"
import React from "react"
import { css } from 'emotion';
import LightButton from "../molecules/light-button";
import Navbar from "../molecules/navbar";
import BrandName from '../atoms/brand-name';

const style = css`
  background: #212121;
  position: fixed;
  width: 100vw;

  .container {
    margin: 0 auto;
    max-width: 960px;
    padding: 1rem 1.0875rem;
    display: flex;
    justify-content: space-between;
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
        <Navbar />
      </div>
    </div>
  </header>
)

export default Header
