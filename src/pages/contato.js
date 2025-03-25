import React from "react"
import Layout from "../components/themes/layout"
import SEO from "../components/organisms/seo"
import Content from "../components/organisms/content"
import Contact from "../components/organisms/contact";

const Contato = () => (
  <Layout>
    <SEO title="Contato" />
    <Content>
      <Contact />
    </Content>
  </Layout>
)

export default Contato
