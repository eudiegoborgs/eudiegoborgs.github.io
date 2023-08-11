import React from 'react';
import { css } from 'emotion';

const style = css`
    background-color: var(--primary);
    color: var(--white) !important;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.2rem;
    transition: all 0.3s ease-in-out;
    display: inline-block;
    margin: 10px 0;
    &:hover {
        background-color: var(--primary-light);
        color: var(--white) !important;
    }
    &.workshop {
        background-color: var(--workshop-primary);
    }
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
`;

const Button = props => {
  return (
    <a className={`button ${style} ${props.className}`} target='_blank' href={props.href}>{props.children}</a>
  )
}

export default Button;