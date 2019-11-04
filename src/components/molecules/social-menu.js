import React from 'react';

const socialList = [
  {
    icon: 'instagram',
    link: 'https://www.instagram.com/eudiegoborgs/?hl=pt-br'
  },
  {
    icon: 'twitter',
    link: 'https://twitter.com/eudiegoborgs'
  },
  {
    icon: 'linkedin',
    link: 'https://www.linkedin.com/in/eudiegoborgs/'
  },
  {
    icon: 'github',
    link: 'https://github.com/eudiegoborgs'
  }
]

const SocialMenu = () => (
  <React.Fragment>
    { socialList.map(item => (
      <a href={item.link} target="_blank" rel="noopener noreferrer" title={item.icon}>
        <i class={`fa fa-${item.icon}`} style={{
          padding: '0 7px'
        }} />
      </a>
    ))}
  </React.Fragment>
)

export default SocialMenu