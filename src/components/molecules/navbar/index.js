import { Link } from "gatsby"
import React from "react"
import { css } from 'emotion';
import MobileMenu from '../../atoms/mobile-menu'
import SocialMenu from '../../molecules/social-menu'
import LightButton from "../../molecules/light-button";

const style = css `
  display: flex;
  align-items: center;
  .menu {
    top: 45px;
    transition: display 0.5s linear;
  }
  .menu {
    .social-menu {
      display: none;
    }
  }
  .mobile-menu {
    display: none;
    >* {
      height: 6px;
    }
  }
  .menu-item {
    padding: 2px 10px;
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    @media(max-width: 780px) {
      padding: 0 5px;
    }
    &:hover {
      background: #fff;
      color: #000;
    }
  }
  @media(max-width: 780px) {
    .menu {
      display: none;
    }
    .mobile-menu {
      display: inline-block;
    }
    .menu.active {
      display: block;
      position: absolute;
      left: 0;
      width: 100vw;
      background: #212121;
      padding: 1rem 1.0875rem;
      .menu-item {
        display: block;
        margin: 30px auto;
        font-size: 2rem;
        text-align: right;
      }
      .social-menu {
        display: block;
      }

      .social-menu a {
        color: white!important;
        float: right;
      }
    }
  }
`;

const Navbar = () => {
  const [Open, setOpen] = React.useState(false);
  return (
    <div className={style}>
      <div className={`menu ${Open && 'active'}`}>
        <Link to="/" className="menu-item">
          Início
        </Link>
        <Link to="/curriculo" className="menu-item">
          Currículo
        </Link>
        <Link to="/blog" className="menu-item">
          Blog
        </Link>
        <Link to="/contato" className="menu-item">
          Contato
        </Link>
        <div className="social-menu">
          <SocialMenu />
        </div>
      </div>
      <LightButton />
      <div className="mobile-menu">
        <MobileMenu onClick={setOpen}/>
      </div>
    </div>
  )
}

export default Navbar
