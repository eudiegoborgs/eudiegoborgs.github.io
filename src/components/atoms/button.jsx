import React from "react"
import { css } from "@emotion/react";

const style = css`
    text-transform: uppercase;
    color: var(--black) !important;
    padding: 10px 30px;
    cursor: pointer;
    border: solid 1px var(--primary-light);
    background-color: var(--primary-light);
    border-radius: 5px;
    transition: 0.5s ease all;
    font-weight: bold;
    color: var(--black);
    margin: 0;
    &:hover {
        background: var(--black);
        color: var(--primary-light) !important;
    }
    &.outline {
        background: none;
        color: var(--primary-light) !important;
        border: solid 1px var(--primary-light);
        &:hover {
            background: var(--black);
            color: var(--primary-light) !important;
        }
    }
    &.small {
        padding: 10px;
        font-size: 0.8rem;
    }
`;

export const Button = props => {
    if (props.component) {
        const Component = props.component;
        return <Component {...props} css={style}>{props.children}</Component>;
    }
    return <button {...props} css={style}>{props.children}</button>;
}
