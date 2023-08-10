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
  h1 {
    font-size: 3.5rem;
    text-transform: none;
    margin: 0;
    color: var(--workshop-primary);
  }

  .item {
    font-weight: bold;
    font-size: 1.5rem;
    color: var(--workshop-secondary);
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
          'desenvolvendo aplicações de alta performance com PHP e Swoole',
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
    <div className={style}>
      <h1>HyperF </h1>
      <p>{items}</p>
    </div>
  )
}

export default TypeWritter;