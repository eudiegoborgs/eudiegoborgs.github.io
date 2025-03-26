import React from 'react';
import Icon from './icon';
import { faGithub, faInstagram, faLinkedin, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const socialList = [
  {
    icon: faInstagram,
    link: 'https://www.instagram.com/eudiegoborgs'
  },
  {
    icon: faTwitter,
    link: 'https://twitter.com/eudiegoborgs'
  },
  {
    icon: faLinkedin,
    link: 'https://www.linkedin.com/in/eudiegoborgs'
  },
  {
    icon: faGithub,
    link: 'https://github.com/eudiegoborgs'
  },
  {
    icon: faWhatsapp,
    link: 'https://wa.me/5531986883889'
  }
]

const SocialList = () => (
  <React.Fragment>
    { socialList.map(item => (
      <a href={item.link} target="_blank" rel="noopener noreferrer" title={item.icon} style={{ margin: '15px 10px' }} >
        <Icon source={item.icon} />
      </a>
    ))}
  </React.Fragment>
)

export default SocialList
