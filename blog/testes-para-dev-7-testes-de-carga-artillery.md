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
4. [Testes de Contrato](https://diegoborgs.com.br/blog/testes-para-dev-4-testes-de-contrato)
5. [Testes de Mutação](https://diegoborgs.com.br/blog/testes-para-dev-5-testes-de-mutacao)
6. [Testes End-to-End (Cypress)](https://diegoborgs.com.br/blog/testes-para-dev-6-testes-e2e-cypress)

Para encerrar com chave de ouro, vamos falar sobre **desempenho, escalabilidade e resiliência sob extrema pressão**: bem-vindo ao mundo dos **Testes de Carga e Estresse com Artillery**!

Agora, imagine o seguinte cenário no mundo real:

> É meio-dia da sexta-feira de Black Friday. O time de marketing acaba de enviar uma notificação push para 100.000 clientes. Em questão de 30 segundos, 5.000 usuários tentam acessar o checkout da sua API simultaneamente. O uso de CPU da máquina salta para 100%, as conexões do banco de dados esgotam (*connection pool exhaustion*), as requisições começam a estourar o tempo limite retornando `504 Gateway Timeout` e a sua plataforma inteira cai durante a hora de maior faturamento do ano! **KABOOM! 💥 Milhares de vendas perdidas porque ninguém testou como o sistema se comporta sob pressão!**

Como saber o limite exato de requisições que a sua infraestrutura suporta antes de abrir as portas para o tráfego real?

Para descobrir gargalos de desempenho e calibrar o auto-escalonamento da nuvem, surgem os **Testes de Carga e Estresse**.

Hoje vamos aprender **passo a passo (baby steps)** como instalar, escrever cenários declarativos em YAML com o **Artillery**, entender métricas essenciais como latência `p95` e `p99`, interpretar relatórios visuais e criar barreiras no CI/CD para travar deploys que degradem a velocidade do sistema.

---

## Carga vs. Estresse vs. Pico: Qual a diferença? 📊

É muito comum confundir as modalidades de testes de performance. Vamos alinhar os conceitos:

* **Teste de Carga (Load Test)**: Simula o tráfego **esperado** de usuários simultâneos em produção para validar se a aplicação atende aos tempos de resposta e SLAs prometidos.
* **Teste de Estresse (Stress Test)**: Aumenta o volume de requisições **além do limite operacional** até encontrar o **Ponto de Ruptura (Breaking Point)**, avaliando como o sistema se recupera de um colapso sem corromper dados.
* **Teste de Pico (Spike Test)**: Simula um surto repentino e massivo de tráfego em poucos segundos (ex: notificação push do app) para testar se o *Autoscaling* da nuvem (AWS/Kubernetes) responde a tempo.
* **Teste de Resistência (Soak Test)**: Mantém uma carga moderada por longas horas para identificar vazamentos de memória (*memory leaks*) ou esgotamento progressivo de recursos de disco/banco.

---

## Glossário de Termos dos Testes de Performance 📖

Para ler relatórios de carga como um engenheiro de software sênior, guarde estas definições:

* **Virtual Users (VUs / Usuários Virtuais)**: Clientes virtuais simulados por software que disparam fluxos de requisições concorrentes para o seu servidor.
* **Ramp-up (Rampa de Acesso)**: O período de tempo em que a carga aumenta gradualmente (ex: subir de 5 para 100 requisições por segundo em 60 segundos).
* **RPS / Throughput (Vazão)**: O número total de requisições por segundo que a aplicação consegue processar com sucesso.
* **Latência Média vs. Latência Percentil (p95 e p99)**:
  * *Média*: Pode enganar! Se 9 pessoas esperam 10ms e 1 pessoa espera 10.000ms (10s), a média será 1.009ms (parece aceitável, mas 1 cliente teve uma experiência horrível!).
  * *Latência p95*: Garante que **95% dos seus usuários** receberam resposta em um tempo menor ou igual àquele valor. É a métrica padrão da indústria para contratos de nível de serviço (SLA).
* **Connection Pool Exhaustion**: Erro que ocorre quando o banco de dados atinge o número máximo de conexões simultâneas permitidas e novas requisições ficam travadas indefinidamente.

---

## Ponto fundamental: Artillery vs. JMeter / k6 (Quem faz o quê?) 🤝

Antes de criar o script, vale entender onde o Artillery se posiciona:

> **O Artillery é a ferramenta moderna, leve e declarativa em YAML nativa do ecossistema Node.js!**

* **Apache JMeter**: Ferramenta legada em Java, pesada, baseada em interfaces visuais complexas dos anos 2000 e arquivos XML difíceis de versionar no Git.
* **k6**: Excelente ferramenta em Go que utiliza scripts em JS.
* **Artillery**: Ferramenta focada na experiência do desenvolvedor (*DX*), escrita em JS/Node, que utiliza arquivos **YAML legíveis**, integração nativa com Playwright/HTTP e facilidade de execução em pipelines de CI/CD.

---

## Quando USAR (e quando NÃO usar) Testes de Carga? 🎯

### ✅ Quando USAR:
1. **Antes de Grandes Eventos de Tráfego**: Black Friday, lançamentos de produtos, campanhas de marketing ou transmissões ao vivo.
2. **Após Mudanças Estruturais na Arquitetura**: Migrações de banco de dados, troca de frameworks ou mudança de provedor de nuvem (AWS/GCP).
3. **Calibrar Regras de Autoscaling**: Ajustar os gatilhos de CPU/Memória das máquinas virtuais ou pods do Kubernetes (HPA).

### 🛑 Quando NÃO usar:
1. **Em ambiente de produção sem janela agendada**: Rodar testes de estresse em produção no meio do dia pode derrubar clientes reais! Faça os testes em um ambiente de *Staging* espelhado.
2. **Contra APIs de Terceiros sem permissão (ex: Stripe, SendGrid, Twilio)**: Disparar 5.000 reqs/sec contra uma API externa fará seu IP ser bloqueado por *Rate Limit* ou acarretará cobranças altíssimas na sua fatura.

---

## Como o Artillery funciona por baixo dos panos? 🔍

Veja como o Artillery orquestra o disparo concorrente de requisições:

```
┌─────────────────┐       ┌────────────────────┐       ┌──────────────────────┐
│  1. Leitura do  │ ────► │  2. Criação dos    │ ────► │  3. Disparo HTTP     │
│  Script (YAML)  │       │  Virtual Users(VUs)│       │  Concorrente na API  │
└─────────────────┘       └────────────────────┘       └──────────┬───────────┘
                                                                  │
┌─────────────────┐       ┌────────────────────┐                  │
│  5. Relatório e │ ◄──── │  4. Coleta de      │ ◄────────────────┘
│  Validação SLA  │       │  Latências (p95)   │
└─────────────────┘       └────────────────────┘
```

1. **Geração Assíncrona de VUs**: O Artillery utiliza a arquitetura não-bloqueante do Node.js para simular milhares de conexões HTTP concorrentes usando pouca memória da sua máquina local.
2. **Fases de Tráfego**: Ele segue a curva de rampa configurada (ex: aquecimento -> carga pico -> sustentação).
3. **Avaliação de Regras (Ensure)**: Ao final do teste, ele compara a latência real medida contra as metas de SLA (ex: `p95 < 500ms`). Se o SLA for violado, ele falha a execução para avisar o CI.

---

## PARTE PRÁTICA: Passo a Passo do Zero (Baby Steps) 🛠️

Vamos construir um teste de carga completo declarativo.

### Passo 1: Instalação das Dependências no Projeto

No terminal do seu projeto Node.js, instale o Artillery como dependência de desenvolvimento:

```bash
npm install --save-dev artillery
```

---

### Passo 2: Criando o Script Declarativo de Carga (`artillery-load-test.yml`)

Crie o arquivo `artillery-load-test.yml` na raiz do projeto:

```yaml
config:
  target: "http://localhost:3000" # URL base da sua API de testes
  phases:
    # Fase 1: Aquecimento (Ramp-up)
    - duration: 20
      arrivalRate: 5
      rampTo: 20
      name: "1. Aquecimento do Servidor (5 a 20 reqs/sec)"

    # Fase 2: Carga Sustentada
    - duration: 40
      arrivalRate: 20
      name: "2. Carga Sustentada de Pico (20 reqs/sec)"

  # SLAs de Qualidade de Performance (Se violar, o teste FALHA!)
  ensure:
    p95: 500         # 95% das requisições devem responder em menos de 500ms
    maxErrorRate: 1  # A taxa de erro de requisições não pode passar de 1%

scenarios:
  - name: "Fluxo de Consulta e Busca de Produtos"
    flow:
      # Passagem 1: GET na rota de lista de produtos
      - get:
          url: "/api/products"
          expect:
            - statusCode: 200
            - contentType: json

      # Pausa de 1 segundo simulando a leitura do usuário
      - think: 1

      # Passagem 2: GET nos detalhes do produto ID 10
      - get:
          url: "/api/products/10"
          expect:
            - statusCode: 200
```

---

### Passo 3: Configurando os Scripts no `package.json`

Adicione os scripts no `package.json`:

```json
{
  "scripts": {
    "test:load": "artillery run --output report.json artillery-load-test.yml",
    "test:load:report": "artillery report report.json"
  }
}
```

---

### Passo 4: Executando o Teste de Carga no Terminal

Tenha sua API rodando em `http://localhost:3000` e execute no terminal:

```bash
npm run test:load
```

#### Saída do Terminal do Artillery 📊:

```bash
--------------------------------------------------------------------------------
Summary report @ 14:22:05(-0300)
--------------------------------------------------------------------------------

http.codes.200: ................................................................ 1200
http.request_rate: ............................................................. 20/sec
http.requests: ................................................................. 1200
http.response_time:
  min: ......................................................................... 12
  max: ......................................................................... 380
  median: ...................................................................... 45
  p95: ......................................................................... 180.5
  p99: ......................................................................... 290.2
vusers.completed: .............................................................. 600
vusers.created: ................................................................ 600
vusers.failed: ................................................................. 0

✔ Ensure check passed: p95 (180.5ms) is less than target (500ms)
✔ Ensure check passed: maxErrorRate (0%) is less than target (1%)
```

🎉 **SLA de Performance Aprovado! 95% das requisições responderam em apenas 180.5ms!**

---

### Passo 5: Gerando o Relatório HTML Interativo com Gráficos

Para visualizar gráficos interativos de latência, vazão e status codes, execute:

```bash
npm run test:load:report
```

Isso gerará o arquivo `report.json.html`. Abra no navegador para ver os gráficos visuais de oscilação de resposta durante o pico!

---

### Passo 6: O que fazer quando o teste FALHA? (Diagnóstico de Gargalos) 🛠️

Se o teste falhar e o `p95` explodir para `3500ms` com erros `500` ou `504`:

1. **Verifique o Banco de Dados**: O pool de conexões (`max connections`) está pequeno demais? Falta um índice (`index`) na coluna utilizada no `WHERE` da SQL?
2. **Verifique Event Loop e CPU**: O código Node.js está executando tarefas síncronas pesadas (como `JSON.parse` gigantes ou loops ordenando arrays massivos em memória)?
3. **Verifique Concorrência I/O**: Use ferramentas de APM (Datadog, New Relic, Prometheus/Grafana) durante a execução do Artillery para ver a linha exata que travou.

---

## Como Integrar os Testes de Carga no CI/CD com GitHub Actions 🚀

Você pode rodar testes de carga automáticos em staging a cada Pull Request para garantir que nenhum dev adicione uma consulta SQL sem índice que destrua a velocidade da API:

```yaml
name: Performance & Load Testing CI

on:
  pull_request:
    branches: [main, master]

jobs:
  load-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci
      - run: npm run build
      - run: npm start & # Sobe a aplicação em background

      - name: Wait for server to be ready
        run: npx wait-on http://localhost:3000

      - name: Run Artillery Load Test
        run: npx artillery run artillery-load-test.yml
```

---

## Resumo dos Benefícios 🎯

1. **Fim dos sustos em produção**: Descubra exatamente quantos usuários o sistema suporta antes da campanha de marketing ir ao ar.
2. **Garantia de SLAs reais**: Monitore latências percentuais reais (`p95` e `p99`) em vez de médias simplistas.
3. **Calibragem perfeita de infraestrutura**: Defina o tamanho exato dos contêineres e máquinas necessárias sem desperdiçar dinheiro na nuvem.

---

## Encerramento da Série "Testes para Dev" 🏁 🎉

Chegamos ao final da nossa jornada de 7 artigos! 🚀

Percorremos todo o ecossistema moderno da engenharia de testes de software:
- **#1: Testes de Unidade** (Regras atômicas isoladas)
- **#2: Testes de Integração** (Comunicação real entre módulos e banco)
- **#3: Continuous Integration** (Esteiras de automação de CI/CD)
- **#4: Testes de Contrato** (Pact & integração desacoplada entre times)
- **#5: Testes de Mutação** (Stryker & eliminação do 100% de cobertura falso)
- **#6: Testes End-to-End** (Cypress & navegação real do usuário no browser)
- **#7: Testes de Carga e Estresse** (Artillery & resiliência sob pressão)

Se tem uma lição fundamental que quero que você leve para toda a sua carreira como desenvolvedor é:

> **Escrever código que funciona na sua máquina é o básico. Construir sistemas resilientes, testáveis, automatizados e preparados para escalar sob pressão é o que separa um programador comum de um verdadeiro Engenheiro de Software.**

Muito obrigado por acompanhar esta série até aqui! 💙  
Deixe seus comentários, compartilhe com seus colegas de equipe e até os próximos artigos no blog! 🚀💻
