import React from 'react';
import banner from '../../images/banner/banner.jpg';
import { css } from 'emotion';
import SocialMenu from '../molecules/social-menu';

const style = css`
  background-color: #212121;
  background-image: url(${banner});
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 50vh;
  color: #ffffff;
  text-align: center;
  text-transform: uppercase;
  overflow: hidden;

  .caption {
    padding: 20vh 0;
    height: 50vh;
    background-image: linear-gradient(#212121, rgba(33,33,33, 0.8));
  }

  a {
    color: white !important;
  }
`

const Banner = () => (
  <div className={style}>
    <div className="caption">
      <h1><div className="typewriter">Writing <span style={{color: '#ff8a80'}}>code</span> with love</div></h1>
      <SocialMenu />
    </div>
  </div>
)

export default Banner;