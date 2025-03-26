import { css } from "@emotion/react";
import React from "react"
import { Button } from "../atoms/button";

const style = css`
  padding-top: 50px;
  text-align: center;

  form {
    text-align: left;
    @media(max-width: 780px) {
      padding-top: 30px;;
    }
    input, textarea {
      display: block;
      width: 100%;
      box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2);
      border-radius: 5px;
      border: solid 1px var(--primary-light);
      padding: 5px 10px;
      background-color: var(--black);
      color: var(--white);
    }
    .submit {
      text-align: center;
    }
  }
`;


const Contact = () => (
  <div css={style}>
    <h1>Contato</h1>
    <p>
      Você pode me mandar uma mensagem por aqui mesmo.
    </p>
    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="contact" />
      <p>
        <label>Nome: <input type="text" name="name" required /></label>
        <label>E-mail: <input type="email" name="email" required /></label>
        <label>Mensagem: <textarea name="message" required></textarea></label>
      </p>
      <p className="submit">
        <Button type="submit">Enviar</Button>
      </p>
    </form>
  </div>
)

export default Contact
