import React from 'react';
import Typewriter from "typewriter-effect";
import { css } from 'emotion';

const style = css`
  .Typewriter {
    display: inline;
    .Typewriter__cursor {
      display: none;
    }
  }
`;

const TypeWritter = ({words, className}) => {
  return (
    <span className={`${style} ${className}`}>
      <Typewriter
        onInit={(typewriter)=> {
          words.map((word, index) => {
            typewriter.typeString(`<span class="item ${word}">${word}</span>`)
            if (words.length > index + 1) {
              typewriter.pauseFor(500).deleteAll()
            } else {
              typewriter.start();
            }
            return;
          });
        }}
      />
    </span>
  );
}

export default TypeWritter;
