import React from 'react'
import Icon from '../atoms/icon';
import { css } from '@emotion/react';
import { faCode, faCodeBranch, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../atoms/button';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';


const styles = css`
  margin-top: 2rem;
  color: var(--white);
  margin-bottom: 30px;

  .service-item {
    max-width: 300px;
    margin-bottom: 30px;

    .header {
      width: 80%;
    }
  }

  .service-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 16px; 
    justify-items: center;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }
  }

  .service-header {
    display: flex;
    justify-content: space-between;
    color: var(--primary-light);
    padding-bottom: 20px;
  }
`

const ServicesResume = () => {
  const list = [
    {
      title: "Consultoria em Desenvolvimento",
      description: "Análise e otimização de código, arquitetura de software, melhores práticas e padrões de projeto para elevar a qualidade do seu produto.",
      icon: faCode
    },
    {
      title: "Processos de desenvolvimento",
      description: "Implementação e melhoria de processos ágeis, DevOps, integração contínua e entrega contínua para aumentar a eficiência da sua equipe.",
      icon: faCodeBranch
    },
    {
      title: "Treinamento para equipes",
      description: "Capacitação técnica personalizada para equipes de desenvolvimento em tecnologias modernas, metodologias ágeis e boas práticas.",
      icon: faGraduationCap
    }
  ];

  return (
    <div css={ styles }>
      <div className="service-header">
        <h2>Serviços</h2>
      </div>
      <div className="service-list">
        {list.map(item => (
          <div key={item.title} className="service-item">
            <div className="header">
              <h3><Icon source={item.icon} /> {item.title}</h3>
            </div>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <div className='center'>
        <Button component="a" href="#contato" className="outline" href="https://wa.me/5531986883889" target="_blank" rel="noopener noreferrer">
          <Icon source={faWhatsapp}/>Solicitar orçamento
        </Button>
      </div>
    </div>
  )
}

export default ServicesResume
