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

const TypeWritter = () => {
  const items = (
    <Typewriter
      onInit={(typewriter)=> {
        typewriter 
        .typeString("PHP.")
        .pauseFor(500)
        .deleteAll()
        .typeString("JS.")
        .pauseFor(500)
        .deleteAll()
        .typeString("TS.")
        .pauseFor(500)
        .deleteAll()
        .typeString("TDD.")
        .pauseFor(500)
        .deleteAll()
        .typeString("quality.")
        .pauseFor(500)
        .deleteAll()
        .typeString("simplicity.")
        .pauseFor(500)
        .deleteAll()
        .typeString("love.")
        .start();
      }}
    />
  );
  return (
    <h1 className={style}>Writing <span style={{color: '#fff'}}>{'code'}</span> with <span style={{color: '#11C76F'}}>{items}</span></h1>
  )
}

export default TypeWritter;