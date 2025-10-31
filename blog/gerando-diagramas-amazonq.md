---
path: principios-first
date: 2025-10-31T19:45:44.059Z
title: Gerando diagramas AWS com IA (sem sofrimento)
---

Manter diagramas de arquitetura atualizados é um desafio constante — especialmente quando o time cresce e a infraestrutura muda rápido.
Mas e se fosse possível gerar diagramas AWS completos, padronizados e com ícones oficiais a partir de um simples prompt de texto?

Neste artigo, vou te mostrar como configurar o Amazon Q Developer CLI com MCP (Model Context Protocol) para gerar diagramas automaticamente, sem precisar arrastar e soltar caixinhas. 

## O que vamos usar

- **Amazon Q Developer CLI** — assistente de IA oficial da AWS (gratuito com Builder ID).

- **MCP Servers:**
    - awslabs.aws-diagram-mcp-server → gera diagramas com ícones oficiais AWS.
    - awslabs.aws-documentation-mcp-server → busca informações na documentação oficial da AWS.

Com esses dois servidores, o Q consegue validar seu pedido na doc oficial e gerar um diagrama coerente, mantendo boas práticas de arquitetura e nomenclatura.

###  Passo 1 — Instalar o Amazon Q Developer CLI
macOS (recomendado)
brew install --cask amazon-q

Ou baixe diretamente o instalador .dmg em:
👉 <https://desktop-release.q.us-east-1.amazonaws.com/latest/mac>

### Passo 2 — Fazer login no Q

Após a instalação:

q --version
q login

Você pode usar uma conta Builder ID (gratuita) ou AWS Pro.
Isso habilita o chat do Q diretamente no terminal.

### Passo 3 — Configurar os MCP Servers

Crie (ou edite) o arquivo de configuração:
```bash
nano ~/.aws/amazonq/mcp.json
```

Adicione o conteúdo abaixo:

```bash
{
  "mcpServers": {
    "awslabs.aws-diagram-mcp-server": {},
    "awslabs.aws-documentation-mcp-server": {}
  }
}
```

Esses servidores serão detectados automaticamente pelo Q.

### Passo 4 — Inicie o chat do Q

```bash
q chat
```

Agora você pode conversar com o Q direto no terminal e pedir o diagrama que quiser.

#### Prompt base (copiar e colar)
> Gere um diagrama de uma aplicação serverless com API Gateway, Lambda, DynamoDB e S3 (static hosting), Cognito para autenticação e CloudFront na borda.
> Inclua VPC, sub-redes públicas/privadas, Security Groups/NACLs e múltiplas AZs em us-east-1.
> Consulte a documentação oficial da AWS antes de gerar, seguindo boas práticas.
> Rotule tudo de forma objetiva e exporte em SVG para ./generated-diagrams.

O servidor Documentation busca e valida as informações na doc oficial da AWS.
O servidor Diagram transforma o código em um SVG com ícones oficiais e padrão AWS.

Diagrama gerado: 
![](/assets/serverless-architecture-complete.svg)

### 5 usos práticos

1. PRs e RFCs → anexe um diagrama técnico coerente em minutos.
2. Reuniões executivas → gere visual “clean” e consistente.
3. Onboarding de novos devs → uma visão real da infra.
4. Governança e compliance → padrões entre squads.
5. Evolução da arquitetura → altere o prompt e regenere.


🔗 Referências oficiais

Amazon Q Developer CLI – Instalação: https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/command-line-installing.html?utm_source=chatgpt.com
