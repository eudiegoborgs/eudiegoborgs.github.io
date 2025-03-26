import React from "react"
import { css } from '@emotion/react';;

const style = css `
  background: transparent;
  border: none;
  span {
    margin: 0 auto;
    -webkit-transition-duration: 0s;
    transition-duration: 0s;
    -webkit-transition-delay: 0.2s;
    transition-delay: 0.2s;
  }
  span:before, span:after {
    position: absolute;
    content: '';
  }
  span, span:before, span:after {
    width: 25px;
    height: 3px;
    background-color: #FFF;
    display: block;
  }
  span:before {
    margin-top: -8px;
    -webkit-transition-property: margin, -webkit-transform; 
    transition-property: margin, transform;
    -webkit-transition-duration: 0.2s; 
    transition-duration: 0.2s;
    -webkit-transition-delay: 0.2s, 0s; 
    transition-delay: 0.2s, 0s;
  }
  span:after {
    margin-top: 8px;
    -webkit-transition-property: margin, -webkit-transform;
    transition-property: margin, transform;
    -webkit-transition-duration: 0.2s;
    transition-duration: 0.2s;
    -webkit-transition-delay: 0.2s, 0s;
    transition-delay: 0.2s, 0s;
  }
  @media(max-width: 780px) {
    display: inline-block;
  }
  span.active {
    background-color: rgba(0,0,0,0.0);
    -webkit-transition-delay: 0.2s;
    transition-delay: 0.2s;
  }
  span.active:before {
    margin-top: 0;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-transition-delay: 0s, 0.2s;
    transition-delay: 0s, 0.2s;
    background-color: var(--primary-light);
  }
  span.active:after {
    margin-top: 0;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transition-delay: 0s, 0.2s;
    transition-delay: 0s, 0.2s;
    background-color: var(--primary-light);
  }
`;

const MobileMenu = props => {
  const [Open, setOpen] = React.useState(false);
  const change = () => {
    const newOpen =  !Open;
    setOpen(newOpen);
    props.onClick(newOpen);
  }
  return (
    <button css={style} onClick={change} aria-label="Menu" alt="Menu">
      <span className={Open && 'active'}/>
    </button>
  )
}

export default MobileMenu
