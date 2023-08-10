import React from 'react';
import banner from '../../images/banner/bg.jpg';
import { css } from 'emotion';
import TypeWritter from '../atoms/typewritter/workshop';
import Content from "../organisms/content"
import Button from '../atoms/button';

const style = css`
  background-color: var(--workshop-bg);
  background-image: url(${banner});
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 60vh;
  color: var(--white);
  text-align: left;
  text-transform: uppercase;
  overflow: hidden;

  .caption {
    padding: 25vh 40px;
    height: 60vh;
  }

  a {
    color: var(--white) !important;
  }
  .center {
    text-align: center;
  }
`

const Banner = () => (
  <div className={style}>
      <div className="caption">
        <Content>
          <TypeWritter />
          <Button className="workshop" href="https://www.sympla.com.br/evento/workshop-hyperf/2105289">Inscreva-se</Button>
        </Content>
      </div>
  </div>
)

export default Banner;