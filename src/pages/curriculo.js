import React from "react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {dracula} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Layout from "../components/themes/layout"
import SEO from "../components/organisms/seo"
import Content from "../components/organisms/content"
import BlogResume from "../components/organisms/blog-resume"

const data = `{
  "name": "Diego Borges Ferreira",
  "birthday": "1994-12-27",
  "from": {
    "city": "Vespasiano",
    "state": "Minas Gerais",
    "country": "Brasil",
    "complete": "Vespasiano/MG - Brasil"
  },
  "skills": {
    "hard": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "React Native",
      "TypeScript",
      "Node.js",
      "PHP",
      "Python",
      "SQL DB (MySQL, Postgre & Maria DB)",
      "NoSQL DB (Mongo, Firebase & Redis)",
      "AWS Services (EC2, ECS, ELB, S3, Lambda Functions)",
      "Docker & Docker Compose",
      "Git",
    ],
    "concepts": [
      "OOP",
      "TDD",
      "Clean Architecture",
      "Clean Code",
      "Micro Services",
      "Events",
    ],
    "soft": [
      "Criatividade",
      "Comunicação",
      "Trabalho em equipe",
      "Autodidata",
    ],
  },
  "academics": [
    {
      "name": "Sistemas de Informação",
      "school": "PUC MG",
      "type": "Graduação",
    }
  ],
  "experiences": [
    {
      "name": "Picpay",
      "from": "05/2021",
      "to": undefined,
    },
    {
      "name": "Sympla",
      "from": "10/2020",
      "to": "04/2021",
    },
    {
      "name": "Gamefik",
      "from": "01/2020",
      "to": "10/2020",
    },
    {
      "name": "MaxMilhas",
      "from": "10/2018",
      "to": "01/2020",
    },
    {
      "name": "4yousee",
      "from": "10/2017",
      "to": "10/2018",
    },
    {
      "name": "Quartel Design",
      "from": "02/2017",
      "to": "10/2017",
    },
  ]
}`;

const CurriculoPage = () => (
  <Layout>
    <SEO title="Curriculo" />
    <Content>
      <main style={{textAlign: 'center'}}>
        <SyntaxHighlighter 
          language={'javascript'}
          style={dracula}
          showLineNumbers={true}
        >
         {data}
        </SyntaxHighlighter>
      </main>
      <BlogResume />
    </Content>
  </Layout>
)

export default CurriculoPage
