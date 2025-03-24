import React from 'react'
import { css } from 'emotion'
import Icon from '../atoms/icon';


const styles = css`
  margin-top: 2rem;

  .service-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 16px; 
    justify-items: center;

    @media (max-width: 900px) {
      grid-template-columns: 1fr; /* Apenas 1 coluna no mobile */
    }
  }

  .service-header {
    display: flex;
    justify-content: space-between;
    color: var(--primary);
    padding-bottom: 20px;
  }
`

const ServicesResume = () => {
  const list = [
    {
      title: "Consultoria em Desenvolvimento",
      description: "Análise e otimização de código, arquitetura de software, melhores práticas e padrões de projeto para elevar a qualidade do seu produto.",
      icon: "code"
    },
    {
      title: "Processos de desenvolvimento",
      description: "Implementação e melhoria de processos ágeis, DevOps, integração contínua e entrega contínua para aumentar a eficiência da sua equipe.",
      icon: "group"
    },
    {
      title: "Treinamento para equipes",
      description: "Capacitação técnica personalizada para equipes de desenvolvimento em tecnologias modernas, metodologias ágeis e boas práticas.",
      icon: "graduation-cap"
    }
  ];

  return (
    <div className={ styles }>
      <div className="service-header">
        <h2>Serviços</h2>
      </div>
      <div className="service-list">
        {list.map(item => (
          <div key={item.title} className="service-item">
            <div className="header">
              <h3><Icon source={item.icon}></Icon> {item.title}</h3>
            </div>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServicesResume
