import React from 'react';
import banner from '../../images/banner/bg.webp';
import { css } from 'emotion';
import TypeWritter from '../atoms/typewritter';
import Content from "../organisms/content"
import Button from '../atoms/button';
import Icon from '../atoms/icon';
import { Countdown } from '../atoms/countdown';

const style = css`
  background-color: var(--workshop-bg);
  background-image: url(${banner});
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 60vh;
  color: var(--white);
  text-align: left;
  text-transform: uppercase;
  overflow: hidden;

  .caption {
    padding: 0 40px;
    padding-top: 15vh;
    min-height: 60vh;
    @media(max-width: 300px) {
      padding: 0 10px;
    }
  }

  a {
    color: var(--white) !important;
  }
  .center {
    text-align: center;
  }
  .title {
    @media(max-width: 1000px) {
      height: 10em;
    }
    @media(max-width: 768px) {
      height: 15em;
    }
    @media(max-width: 429px) {
      height: 19em;
    }
  }
  
  h1 {
    font-size: 3.5rem;
    text-transform: none;
    margin: 0;
    color: var(--workshop-primary);
  }

  .item {
    display: block;
    font-weight: bold;
    font-size: 1.5rem;
    color: var(--workshop-secondary);
  }

  .text-info, .time {
    font-weight: light;
    font-size: 0.8rem;
    line-height: 0.8rem;
    color: var(--workshop-secondary);
  }

  p.text-info {
    margin: 5px 0;
  }
`

const Banner = () => (
  <div className={style}>
      <div className="caption">
        <Content>
          <div className='title'>
            <h1>Hyperf </h1>
            <p><TypeWritter words={['desenvolvendo aplicações de alta performance com PHP e Swoole']} /></p>
            <div className='text-info'>
              <p className='text-info'><Icon source="clock-o"/> 16 de setembro de 2023 - 9:00 as 18:00</p>
              <p className='text-info'><Icon source="map-marker"/> Quartel Design - Alameda das Princesas 756, Belo Horizonte, MG</p>
            </div>
          </div>
          <div className='footer'>
            <Button
              className="workshop"
              href="https://www.sympla.com.br/evento/workshop-hyperf/2105289"
              sub={(<div className='time'>
              <small>
                Faltam apenas: <em><strong><Countdown toTime={new Date('2023/09/16')} /></strong></em>
              </small>
            </div>)}>Inscreva-se</Button>
            
          </div>
        </Content>
      </div>
  </div>
)

export default Banner;
