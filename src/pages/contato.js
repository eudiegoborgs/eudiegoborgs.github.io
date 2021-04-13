import React from "react"
import { css } from 'emotion';
import Layout from "../components/themes/layout"
import SEO from "../components/organisms/seo"
import Content from "../components/organisms/content"

const style = css`
  text-align: left;
  @media(max-width: 780px) {
    padding-top: 30px;;
  }
  input, textarea {
    display: block;
    width: 100%;
    box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2);
    border-radius: 5px;
    border: solid 1px #11C76F;
    padding: 5px 10px;
    background-color: #212121;
    color: white;
  }
  .submit {
    text-align: center;
    button {
      text-transform: uppercase;
      padding: 10px 30px;
      cursor: pointer;
      border: solid 1px #11C76F;
      background-color: #11C76F;
      border-radius: 5px;
      transition: 0.5s ease all;
      font-weight: bold;
      color: #212121;
      &:hover {
        background: #212121;
        color: #11C76F;
      }
    }
  }
`;


const NotFoundPage = () => (
  <Layout>
    <SEO title="Contato" />
    <Content>
      <main style={{textAlign: 'center'}}>
        <h1>Contato</h1>
        <p>
          Você pode me mandar uma mensagem por aqui mesmo.
        </p>
        <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" className={style}>
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-name" value="contact" />
          <p>
            <label>Nome: <input type="text" name="name" /></label>
            <label>E-mail: <input type="email" name="email" /></label>
            <label>Mensagem: <textarea name="message"></textarea></label>
          </p>
          <p className="submit">
            <button type="submit">Enviar</button>
          </p>
        </form>
      </main>
    </Content>
  </Layout>
)

export default NotFoundPage
