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
  .item {
    color: var(--primary);
    &.php {
      color: var(--php-color);
    }
    &.js {
      color: var(--js-color);
    }
    &.ts {
      color: var(--ts-color);
    }
  }
`;

const TypeWritter = () => {
  const items = (
    <Typewriter
      onInit={(typewriter)=> {
        const words = [
          'php',
          'js',
          'ts',
          'tdd',
          'quality',
          'simplicity',
          'love',
          '💚'
        ];
        words.map((word, index) => {
          typewriter.typeString(`<span class="item ${word}">${word}</span>`)
          if (words.length > index + 1) {
            typewriter.pauseFor(500).deleteAll()
          } else {
            typewriter.start();
          }
        });
      }}
    />
  );
  return (
    <h1 className={style}>Writing code with {items}</h1>
  )
}

export default TypeWritter;