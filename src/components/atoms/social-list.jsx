import React from 'react';
import Icon from './icon';
import { faGithub, faInstagram, faLinkedin, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faBookmark, faRss } from '@fortawesome/free-solid-svg-icons';

const socialList = [
  {
    title: 'Instagram',
    icon: faInstagram,
    link: 'https://www.instagram.com/eudiegoborgs'
  },
  {
    title: 'Twitter',
    icon: faTwitter,
    link: 'https://twitter.com/eudiegoborgs'
  },
  {
    title: 'LinkedIn',
    icon: faLinkedin,
    link: 'https://www.linkedin.com/in/eudiegoborgs'
  },
  {
    title: 'GitHub',
    icon: faGithub,
    link: 'https://github.com/eudiegoborgs'
  },
  {
    title: 'Assine meu feed RSS',
    icon: faRss,
    link: '/rss.xml'
  },
  {
    title: 'Se inscreva no Substack',
    icon: faBookmark,
    link: 'https://eudiegoborgs.substack.com/'
  },
  {
    title: 'Entre em contato comigo pelo WhatsApp',
    icon: faWhatsapp,
    link: 'https://wa.me/5531986883889'
  },
]

const SocialList = () => (
  <React.Fragment>
    { socialList.map(item => (
      <a href={item.link} alt={item.title} target="_blank" rel="noopener noreferrer" title={item.title} style={{ margin: '15px 10px' }} >
        <Icon source={item.icon} />
      </a>
    ))}
  </React.Fragment>
)

export default SocialList
