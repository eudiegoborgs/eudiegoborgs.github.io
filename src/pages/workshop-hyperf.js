import React from "react"
import Layout from "../components/themes/layout"
import SEO from "../components/organisms/seo"
import Banner from "../components/organisms/workshop-banner"
import Content from "../components/organisms/content"
import Button from "../components/atoms/button"
import { css } from 'emotion';

const style = css`
    text-align: center;
    h2, h3 {
      margin-bottom: 1rem;
      margin-top: 2rem;
    }
    .button {
      font-size: 1.6rem;
      margin: 2rem 0;
      display: inline-block;
      text-transform: uppercase;
    }
`;


const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Banner />
    <main className={style}>
      <Content>
        <h2 className="color__workshop-secondary">Dê um upgrade na sua carreira de desenvolvedor PHP com o <a href="https://hyperf.cn/" target="_blank" className="color__workshop-primary">HyperF</a>.</h2>
        <p>
          Já pensou em poder escrever código concorrente com <strong className="color__workshop-primary">PHP</strong>? Ter um desempenho incrível na sua aplicação sem ter que mudar de tecnologia? O objetivo desse workshop é te capacitar para isso, juntos vamos construir uma API abordando os principais tópicos necessários no dia a dia para construção de uma aplicação robusta e resiliente.
        </p>
        <Button className="workshop" href="https://www.sympla.com.br/evento/workshop-hyperf/2105289">Garanta a sua vaga</Button>
        <p>
          O <strong className="color__workshop-primary">HyperF</strong> é um framework PHP extremamente flexível e de alto desempenho, alimentada por um servidor de corrotina de última geração e muitos componentes testados para grande performance. Além de vencer decisivamente os frameworks PHP-FPM em benchmarks, o Hyperf é único em seu foco em flexibilidade e composição. O Hyperf vem com um injetor de dependência habilitador de AOP (programação orientada a aspectos) para garantir que componentes e classes sejam conectáveis e metaprogramáveis. Todos os principais componentes do Hyperf seguem estritamente os padrões PSR e podem ser usados em outras estruturas.
        </p>
        <h3 className="color__workshop-secondary">O que você vai aprender nesse <strong className="color__workshop-primary">workshop</strong>?</h3>
        <ul className="left-list">
          <li>Introdução a programação concorrente</li>
          <li>Instalação do PHP, Composer e Framework</li>
          <li>Hello Word com HyperF</li>
          <li>Container: Criando um dockerfile</li>
          <li>Rotas e Controllers</li>
          <li>Middlewares: Autenticação</li>
          <li>Database: Migrations e Seeders</li>
          <li>Database: recuperação de dados e relacionamentos</li>
          <li>Injeção de dependencias</li>
          <li>Testes Unitários</li>
          <li>Comunicação assíncrona: Trabalhando com Pub e Sub</li>
          <li>Criando componentes</li>
        </ul>
        <Button className="workshop" href="https://www.sympla.com.br/evento/workshop-hyperf/2105289">Quero comprar</Button>
        <h3 className="color__workshop-secondary">O que eu preciso para <strong className="color__workshop-primary">participar</strong>?</h3>
        <ul className="left-list">
          <li>Conhecimento básico em PHP e algum framework de PHP (Laravel, Symfony, Cake, etc)</li>
          <li>Conhecimento básico em Orientação a Objetos</li>
          <li>Conhecimento básico em Banco de Dados e ORM</li>
          <li>Conhecimento básico em Docker</li>
        </ul>
        <h3 className="color__workshop-secondary">Diferencial deste <strong className="color__workshop-primary">workshop</strong>:</h3>
        <p>
          Faremos um evento presencial com uma estrutura de qualidade para apoiar no aprendizado, a turma terá no máximo 15 pessoas para que todas possam ser acompanhadas com bastante atenção e todas as dúvidas sejam respondidas por nossa equipe. Durante o evento, além do conteúdo, iremos disponibilizar um coffee break pela manhã e outro no fim e todos os alunos irão receber um certificado de participação até 15 dias após o fim do evento.
        </p>
        <h2 className="color__workshop-secondary">Sobre o <strong className="color__workshop-primary">professor</strong>:</h2>
        <p>
          Me chamo <strong>Diego Borges</strong>, sou graduando em Sistemas de Informação pela PUC Minas, tenho mais de { new Date().getFullYear() - 2011 } anos de experiência em desenvolvimento. Apaixonado pelo estudo de música, programação e automação.
        </p>
        <p>
          Atualmente trabalho como Engenheiro de Software na <a href="https://picpay.com.br" target="_blank">PicPay</a>, faço parte da organização do PHPMG e escrevo sobre desenvolvimento e carreira para este blog de tecnologia.
        </p>
      </Content>
    </main>
  </Layout>
)

export default IndexPage
