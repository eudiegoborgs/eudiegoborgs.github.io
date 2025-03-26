import { css } from '@emotion/react';
import React from 'react';
import TypewriterComponent from 'typewriter-effect';

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
    <span css={style} className={className}>
      <TypewriterComponent
        onInit={(typewriter)=> {
          words?.length > 0 && words?.map((word, index) => {
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
