import React from "react"
import Layout from "../components/themes/layout"
import SEO from "../components/organisms/seo"
import Banner from "../components/organisms/banner"
import Content, { ContentMax } from "../components/organisms/content"
import BlogResume from "../components/organisms/blog-resume"
import Contact from "../components/organisms/contact"
import ServicesResume from "../components/organisms/services-resume"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Banner />
    <ContentMax className="bg-super-black">
      <ServicesResume />
    </ContentMax>
    <Content>
      <main style={{textAlign: 'center'}}>
        <h1 className="gradient__text">Olá mundo!</h1>
        <p>
          Me chamo <strong>Diego Borges</strong>, sou graduando em Sistemas de Informação pela PUC Minas, tenho mais de { new Date().getFullYear() - 2011 } anos de experiência em desenvolvimento. Apaixonado pelo estudo de música, programação e automação.
        </p>
        <p>
          Atualmente trabalho como Coordenador de Engenharia de Software na <a href="https://picpay.com.br" target="_blank">PicPay</a>, faço parte da organização do PHPMG e escrevo sobre desenvolvimento e carreira para este blog de tecnologia.
        </p>
        <p>
          Com base na minha <strong>experiência de mais de 14 anos no mercado de tecnologia</strong>, ofereço serviços especializados para empresas e startups que buscam excelência em desenvolvimento de software.
        </p>
        <p>
          Atendendo toda a região da Grande Belo Horizonte e remotamente para todo o Brasil, meu objetivo é transformar desafios técnicos em soluções eficientes e escaláveis.
        </p>
      </main>
    </Content>
    <ContentMax className="bg-super-black">
      <BlogResume />
    </ContentMax>
    <Content>
      <Contact />
    </Content>
  </Layout>
)

export default IndexPage
