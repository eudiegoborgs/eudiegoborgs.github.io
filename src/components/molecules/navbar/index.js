import { Link } from "gatsby"
import React from "react"
import { css } from 'emotion';
import MobileMenu from '../../atoms/mobile-menu'
import SocialMenu from '../../molecules/social-menu'

const style = css `
  .menu.active {
    -webkit-transition-property: all, -webkit-transform; 
    transition-property: all, transform;
    -webkit-transition-duration: 0.5s; 
    transition-duration: 0.5s;
    -webkit-transition-delay: 0.5s, 0s; 
    transition-delay: 0.5s, 0s;
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
    padding: 0 10px;
    color: white !important;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    @media(max-width: 780px) {
      padding: 0 5px;
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
      <div className="mobile-menu">
        <MobileMenu onClick={setOpen}/>
      </div>
      <div className={`menu ${Open && 'active'}`}>
        <Link to="curriculo" className="menu-item">
          Curriculo
        </Link>
        <Link to="blog" className="menu-item">
          Blog
        </Link>
        <Link to="contato" className="menu-item">
          Contato
        </Link>
        <div className="social-menu">
          <SocialMenu />
        </div>
      </div>
    </div>
  )
}

export default Navbar
