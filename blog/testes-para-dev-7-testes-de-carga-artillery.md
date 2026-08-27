---
path: testes-para-dev-7-testes-de-carga-artillery
date: 2026-09-06T09:00:00.000Z
title: "Testes para Dev #7: Testes de Carga e Estresse com Artillery — Descobrindo o Ponto de Ruptura"
---

Fala, dev! Chegamos ao **sétimo e último capítulo** da nossa série **Testes para Dev**! 🚀🎉

Percorremos uma jornada incrível:
1. [Testes de Unidade](https://diegoborgs.com.br/blog/testes-para-dev-1-testes-de-unidade)
2. [Testes de Integração](https://diegoborgs.com.br/blog/testes-para-dev-2-testes-de-integracao)
3. [Continuous Integration (CI/CD)](https://diegoborgs.com.br/blog/testes-para-dev-3-continuous-integration)
4. [Testes de Contrato (Pact)](https://diegoborgs.com.br/blog/testes-para-dev-4-testes-de-contrato)
5. [Testes de Mutação (Stryker)](https://diegoborgs.com.br/blog/testes-para-dev-5-testes-de-mutacao)
6. [Testes End-to-End (Cypress)](https://diegoborgs.com.br/blog/testes-para-dev-6-testes-e2e-cypress)

Para encerrar com chave de ouro, vamos falar sobre **desempenho e resiliência sob pressão**: bem-vindo ao mundo dos **Testes de Carga e Estresse**!

---

## Carga vs Estresse: Qual a diferença?

Embora usados juntos, esses dois testes têm objetivos bem distintos:

- **Teste de Carga (Load Test)**: Simula o volume de acessos e picos **esperados** de usuários simultâneos (VUs) em produção para medir tempos de resposta, vazão e validar SLAs.
- **Teste de Estresse (Stress Test)**: Leva a aplicação **além dos seus limites operacionais** até encontrar o seu ponto de ruptura (*breaking point*), avaliando como o sistema se recupera de uma sobrecarga sem corromper dados.

---

## Por que realizar Testes de Carga? 🎯

1. **Descobrir Gargalos Ocultos**: Vazamento de memória, esgotamento do *pool* de conexões com o banco de dados (connection pool exhaustion), concorrência de I/O de disco e travamentos de threads.
2. **Validar o Autoscaling**: Garantir que as regras de auto-escalonamento da AWS/GCP (como Kubernetes HPA) realmente sobem novos contêineres a tempo antes da aplicação cair.
3. **Evitar a Tragédia do Lançamento**: Evitar que a sua aplicação caia na Black Friday ou no lançamento daquele recurso super aguardado.

---

## Conhecendo o Artillery 🎯

O **Artillery** (https://www.artillery.io/) é uma das ferramentas modernas mais poderosas do ecossistema Node.js. Ele permite escrever cenários de carga complexos em arquivos declarativos **YAML** super legíveis.

---

## Exemplo Prático de Script de Carga (`load-test.yml`)

### 1. Fases de Tráfego e SLAs (`load-test.yml` — Parte 1/2)
No bloco `config`, você define a URL de destino, os degraus de rampa de acesso (*ramp-up*) e os critérios aceitáveis de garantia de performance (`ensure`):

```yaml
config:
  target: "https://api.minhaaplicacao.com"
  phases:
    - duration: 30
      arrivalRate: 5
      rampTo: 50
      name: "Ramp-up de Carga (5 para 50 reqs/sec)"
    - duration: 60
      arrivalRate: 50
      name: "Carga Sustentada (50 reqs/sec)"
  ensure:
    p95: 500         # 95% das requisições devem responder em menos de 500ms
    maxErrorRate: 1  # Taxa máxima de erro permitida de 1%
```

### 2. Cenários e Fluxos HTTP (`load-test.yml` — Parte 2/2)
No bloco `scenarios`, você especifica as requisições HTTP e as asserções de status code esperadas:

```yaml
scenarios:
  - name: "Buscar Produtos"
    flow:
      - get:
          url: "/produtos"
          expect:
            - statusCode: 200
```

Para rodar o teste pelo terminal:
```bash
npx artillery run load-test.yml
```

---

## Métricas-Chave para Ficar de Olho 📊

Quando você executa um teste de carga, atente-se às seguintes métricas:

- **RPS (Requests Per Second)**: A taxa de vazão real suportada pela aplicação.
- **Latência p95 / p99**: O tempo de resposta garantido para 95% e 99% das requisições (muito mais realista que a média simples!).
- **Taxa de Erros (5xx / Timeouts)**: Quantas requisições falharam por indisponibilidade ou timeout.
- **Métricas de Infraestrutura**: Uso de CPU, RAM e contagem de conexões ativas no banco de dados durante o pico.

---

## Conclusão da Série "Testes para Dev" 🏁

Chegamos ao fim da nossa série! 🎉

Se tem uma lição principal que quero que você leve para a sua carreira como desenvolvedor é:

> **Escrever testes manuais de rotina pode se tornar perda de tempo na era da Inteligência Artificial. Mas pensar, arquitetar, entender e garantir a estrutura de suítes automatizadas de teste é o valor mais valioso que um dev pode entregar.**

Espero de coração que essa série tenha te ajudado a enxergar testes não como uma burocracia, mas como uma ferramenta poderosa de engenharia de software!

Muito obrigado por acompanhar até aqui! Deixe suas dúvidas, feedbacks e compartilhe com a galera do time. Até a próxima! 👋🚀
