import React from "react"
import { css } from '@emotion/react';
import Navbar from "../molecules/navbar";
import BrandName from '../atoms/brand-name';

const style = css`
  background: var(--black);
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;

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
  <header css={style}>
    <div className="container">
      <div className="left">
        <BrandName />
      </div>
      <Navbar />
    </div>
  </header>
)

export default Header
