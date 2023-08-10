import React from 'react';
import { css } from 'emotion';

const style = css`
    background-color: var(--primary);
    color: var(--white);
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.2rem;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: var(--primary-light);
        color: var(--white) !important;
    }
    &.workshop {
        background-color: var(--workshop-primary);
    }
`;

const Button = props => {
  return (
    <a className={`button ${style} ${props.className}`} target='_blank' href={props.href}>{props.children}</a>
  )
}

export default Button;