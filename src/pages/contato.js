import React from "react"
import { css } from 'emotion';
import Layout from "../components/themes/layout"
import SEO from "../components/organisms/seo"
import Content from "../components/organisms/content"
import Contact from "../components/organisms/contact";

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
    border: solid 1px var(--primary);
    padding: 5px 10px;
    background-color: var(--black);
    color: var(--white);
  }
  .submit {
    text-align: center;
    button {
      text-transform: uppercase;
      padding: 10px 30px;
      cursor: pointer;
      border: solid 1px var(--primary);
      background-color: var(--primary);
      border-radius: 5px;
      transition: 0.5s ease all;
      font-weight: bold;
      color: var(--black);
      &:hover {
        background: var(--black);
        color: var(--primary);
      }
    }
  }
`;


const Contato = () => (
  <Layout>
    <SEO title="Contato" />
    <Content>
      <Contact />
    </Content>
  </Layout>
)

export default Contato
