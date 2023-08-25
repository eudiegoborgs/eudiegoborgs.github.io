import React from 'react';
import banner from '../../images/banner/banner.jpg';
import { css } from 'emotion';
import SocialMenu from '../molecules/social-menu';
import TypeWritter from '../atoms/typewritter';

const style = css`
  background-color: var(--black);
  background-image: url(${banner});
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 60vh;
  color: var(--white);
  text-align: center;
  text-transform: uppercase;
  overflow: hidden;

  .caption {
    padding: 25vh 40px;
    height: 60vh;
    background-image: linear-gradient(#212121, rgba(33,33,33, 0.8));
  }

  a {
    color: var(--white) !important;
    :hover {
      color: var(--primary) !important;
    }
  }

  .item {
    color: var(--primary);
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
  <div className={style}>
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
      <SocialMenu />
    </div>
  </div>
)

export default Banner;