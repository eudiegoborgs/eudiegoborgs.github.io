import React from "react";
import SocialList from '../atoms/social-list';
import TypeWritter from "../atoms/typewritter";
import { css } from "@emotion/react";
import { StaticImage } from "gatsby-plugin-image";

const style = css`
  position: relative;
  background-color: var(--black);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 540px;
  color: var(--white);
  text-align: center;
  text-transform: uppercase;
  overflow: hidden;

  .caption {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 25vh 40px;
    height: 540px;
    background-image: linear-gradient(#212121, rgba(33,33,33, 0.8));
    z-index: 1;
  }

  a {
    color: var(--white) !important;
    :hover {
      color: var(--primary) !important;
    }
  }

  a.button {
    color: var(--black) !important;
    :hover {
      color: var(--black) !important;
    }
  }

  .action {
    padding: 20px;
  }

  .item {
    color: var(--primary-light);
    &.php {
      color: var(--php-color);
    }
    &.swoole {
      color: var(--php-color);
    }
    &.hyperf {
      color: var(--php-color);
    }
    &.js {
      color: var(--js-color);
    }
    &.ts {
      color: var(--ts-color);
    }
  }
`

const Banner = () => (
  <div css={style}>
    <StaticImage src="../../images/banner/banner.webp" alt="Banner" placeholder="blurred" layout="fullWidth" />
    <div className="caption">
      <h1>Writing code with  <TypeWritter words={[
        'php',
        'hyperf',
        'swoole',
        'js',
        'ts',
        'tdd',
        'quality',
        'simplicity',
        'love',
        '💚'
      ]} /></h1>
      <h2 className="thin h3">Soluções profissionais para desenvolvimento de software</h2>
      <SocialList />
      {/* <div className='action'>
        <Button href="#contato" className="button gradient">
          Fale comigo
        </Button>
      </div> */}
    </div>
  </div>
)

export default Banner;
