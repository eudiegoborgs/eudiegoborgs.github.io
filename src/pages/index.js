import React from "react"
import Layout from "../components/themes/layout"
import SEO from "../components/organisms/seo"
import Banner from "../components/organisms/banner"
import Content from "../components/organisms/content"
import BlogResume from "../components/organisms/blog-resume"
import { Link } from "gatsby"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Banner />
    <Content>
      <main style={{textAlign: 'center'}}>
        <h1 className="gradient__text">Olá mundo!</h1>
        <p>
          Me chamo <strong>Diego Borges</strong>, sou graduando em Sistemas de Informação pela PUC Minas, tenho mais de { new Date().getFullYear() - 2011 } anos de experiência em desenvolvimento. Apaixonado pelo estudo de música, programação e automação.
        </p>
        <p>
          Atualmente trabalho como Engenheiro de Software na <a href="https://picpay.com.br" target="_blank">PicPay</a>, faço parte da organização do PHPMG e escrevo sobre desenvolvimento e carreira para este blog de tecnologia.
        </p>
      </main>
      <BlogResume />
    </Content>
  </Layout>
)

export default IndexPage
