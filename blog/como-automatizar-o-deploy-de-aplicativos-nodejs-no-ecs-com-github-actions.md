---
path: Como automatizar o deploy de uma api nodejs no ECS com Github Actions
date: 2020-07-28T16:10:53.987Z
title: Como automatizar o deploy de uma api nodejs no ECS com Github Actions
---
![Pipeline no Github Actions mostrando os passos do deploy com sucesso](assets/fireshot-capture-052-merge-branch-shopping-into-develop-·-gamefik_webspot-gamefik-fdbb24_-github.com.png "Pipeline no Github Actions mostrando os passos do deploy com sucesso")

Não existe uma aplicação completa, se ela não estiver disponível para uso. Por este motivo a publicação de um projeto é parte essencial no desenvolvimento de um software. 

Porém, a publicação é sempre uma sequencia de passos repetitivos e que podem roubar muito do seu tempo, além de que se feito de maneira errada, pode acarretar na indisponibilidade da sua aplicação. Neste caso a automação é uma ferramenta poderosa e muito importante para garantir a produtividade e segurança para você e a sua equipe.

Neste artigo eu pretendo mostrar a vocês como criar um ambiente de publicação automatizado usando Docker, Github Actions e o AWS ECS. Este tutorial foi feito com uma aplicação em nodejs, mas acredito que possa ser usado por qualquer tipo de linguagem desde que devidamente feita em containers com Docker.

## Pré-requisitos

1. Uma conta na AWS com alguns créditos para usar o AWS ECS (com o Fargate);
2. O AWS CLI instalado em sua máquina;
3. Um Dockerfile para servir o seu projeto em um container servindo ele em alguma porta (pode ser qualquer uma);
4. Um repositório no Github com o seu projeto.

## Mão na massa

### Criando um repositório no ECR para a sua imagem

![Tela do ECR](assets/fireshot-capture-055-amazon-ecr-us-east-2.console.aws.amazon.com.png "Tela do ECR")

Entre em sua conta da AWS e acesse o [ECR](https://us-east-2.console.aws.amazon.com/ecr/repositories?region=us-east-2#) *(o link aponta para a região que eu uso, se você usar outra é só procurar por ECR nos serviços da AWS)* e clique em **"Create Repository"** para criar um repositório.

![Tela de criacao de um repositorio ECR](assets/1_vuoux4lib0etgqgbj3krsa.png "Tela de criacao de um repositorio ECR")

Você só precisa inserir o nome da sua imagem e clicar em **"Create Repository".** Guarde o nome completo da imagem, ele é o link para o seu repositório e você vai precisar dele um pouco mais tarde.

### Criando uma Task Definition

A Task Definition é um documento de configuração que vai explicar para o seu cluster como e quais containers ele vai rodar.

```json
{
  "family": "task-definition-name",
  "executionRoleArn": "<ARN DA ECS EXECUTATION ROLE>",
  "networkMode": "awsvpc",
  "containerDefinitions": [
      {
          "name": "container-name",
          "image": "<LINK DO REPO DA IMAGEM NO ECR>",
          "portMappings": [
              {
                  "containerPort": 8080,
                  "hostPort": 8080,
                  "protocol": "tcp"
              }
          ],
          "essential": true
      }
  ],
  "requiresCompatibilities": [
      "FARGATE"
  ],
  "cpu": "512",
  "memory": "1024"
}
```