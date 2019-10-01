import React from 'react';
import banner from '../../images/banner/banner.jpg';

const Banner = () => (
  <div style={{
    backgroundColor: '#212121',
    backgroundImage: `url(${banner})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    height: '50vh',
    color: '#ffffff',
    textAlign: 'center',
    textTransform: 'uppercase',
    overflow: 'hidden'
  }}>
    <div style={{
      padding: '20vh 0',
      backgroundImage: 'linear-gradient(#212121, rgba(33,33,33, 0.8))'
    }}>
      <h1><div className="typewriter">Writing <span style={{color: '#ff8a80'}}>code</span> with love</div></h1>
    </div>
  </div>
)

export default Banner;