---
path: Como automatizar o deploy de uma api nodejs no ECS com Github Actions
date: 2020-07-28T16:10:53.987Z
title: Como automatizar o deploy de uma api nodejs no ECS com Github Actions
---
![Pipeline no Github Actions mostrando os passos do deploy com sucesso](assets/2.png "Pipeline no Github Actions mostrando os passos do deploy com sucesso")

Não existe uma aplicação completa, se ela não estiver disponível para uso. Por este motivo a publicação de um projeto é parte essencial no desenvolvimento de um software. 

Porém, a publicação é sempre uma sequencia de passos repetitivos e que podem roubar muito do seu tempo, além de que se feito de maneira errada, pode acarretar na indisponibilidade da sua aplicação. Neste caso a automação é uma ferramenta poderosa e muito importante para garantir a produtividade e segurança para você e a sua equipe.

Neste artigo eu pretendo mostrar a vocês como criar um ambiente de publicação automatizado usando Docker, Github Actions, o AWS ECS e o Load Balancer. Este tutorial foi feito com uma aplicação em nodejs, mas acredito que possa ser usado por qualquer tipo de linguagem desde que devidamente feita em containers com Docker.

## Pré-requisitos

1. Uma conta na AWS com alguns créditos para usar o AWS ECS (com o Fargate) e o Load Balancer;
2. O AWS CLI instalado em sua máquina;
3. Um Dockerfile para servir o seu projeto em um container servindo ele em alguma porta (pode ser qualquer uma);
4. Um repositório no Github com o seu projeto.

## Mão na massa

### Criando um repositório no ECR para a sua imagem

![Tela do ECR](assets/3.png "Tela do ECR")

Entre em sua conta da AWS e acesse o [ECR](https://us-east-2.console.aws.amazon.com/ecr/repositories?region=us-east-2#) *(o link aponta para a região que eu uso, se você usar outra é só procurar por ECR nos serviços da AWS)* e clique em **"Create Repository"** para criar um repositório.

![Tela de criacao de um repositorio ECR](assets/1.png "Tela de criacao de um repositorio ECR")

Você só precisa inserir o nome da sua imagem e clicar em **"Create Repository".** Guarde o nome completo da imagem, ele é o link para o seu repositório e você vai precisar dele um pouco mais tarde.

### Configurando uma execution role

O ideal é que para cada task definition (nós iremos criar uma no próximo tópico) que você possui no ECS, você deve ter um ARN de uma execution role em vigor. 

Vá para ECS e na seção Task Definitions clique em **"Create new Task Definition".**

Essa é a maneira mais fácil de criar uma função ecsTaskExecution.

Na página Create new Task Definition, selecione Fargate, clique em **"Next step"** e procure por **Task execution IAM role**. Selecione a opção **ecsTaskExecutionRole** se já não estiver selecionado.

![Tela de Create new Task Definition](assets/4.png "Tela de Create new Task Definition")

Quando você salvar, será criado automaticamente uma execution role. 

Agora é só acessar o [IAM](https://console.aws.amazon.com/iam/home?region=us-east-2#/roles), procurar a role executionRoleArn e pegar o ARN dele para inserir em sua task definition.

### Criando uma Task Definition

A Task Definition é um documento de configuração que vai explicar para o seu cluster como e quais containers ele vai rodar.

Você deverá ser criado na pasta raiz do seu projeto com o nome de **ecs-task-definition.json** substituindo o ARN da exection role e o link do repositório pelos dados criados nos passos anteriores.

Sei que criamos uma no item acima, mas ela foi apenas para facilitar a criação do **executionRoleArn**, se quiser reaproveitar ela basta usar o seu nome no campo **family** do documento abaixo:

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

Com o documento criado rode o seguinte comando na pasta raiz do seu projeto:

`aws_ecs register-task-definition --region <REGIÃO ECOLHIDA> --cli-input-json file://./ecs-task-definition.json`

Esse comando vai registrar sua task definition na AWS.

### Configurando um Load Balancer

Para servir o seu projeto é necessário usar o ELB, ele serve para como uma porta de entrada da sua aplicação. Com o Load Balancer podemos fazer várias coisas, podemos aumentas a escalabilidade do projeto com o auto scaling, usar SSL, fazer teste A/B, etc. No caso deste tutorial, iremos usar o ELB apenas para apontar para o container da nossa aplicação com um Target Group.

Para configurar um Load Balancer, no seu console AWS, vá em EC2 -> Load Balancer e clique em **"Create Load Balancer"** e depois selecione a opção **Application Load Balancer** para poder disponibilizar sua aplicação nos protocolos HTTP e HTTPS.

No formulário de criação você vai preencher os campos com estes dados:

![Configuracao Load Balancer](assets/5.png "Configuracao Load Balancer")

Em VPC's coloque as VPC's e subnets desejadas e depois clique **"Next Configure Security Settings"**.

Se você for usar o HTTPS a seção **"Security Settings"** serve para que você vincule um certificado de SSL a sua aplicação, se não for usar, pode pular esta seção.

O próximo passo é configurar os security groups que com as regras de exposição que fazem mais sentido para a sua aplicação.

Na seção **"Configure routing"** você vai criar um Target Group para receber as requisições que chegarem no ELB, neste ponto você irá criar um Target Group falso que será trocado no futuro, mas é muito importante já configurar uma rota de health check real do seu projeto (Uma URL para checar se tá tudo bem com o seu projeto). Isso irá facilitar a troca depois e é a partir desta rota que o ELB vai conferir se está tudo bem com o seu serviço e se não estiver, vai pedir ao ECS que recrie ele.

A última seção é desnecessária para o que vamos fazer, ela faria sentido se você fosse apontar para alguma instância de EC2. Então só clique em **"Preview"** e depois em **"Create Load Balancer"**.

Com o Load Balancer criado partimos para o último passo na AWS que é criar um service no ECS.

### Criando o Service no ECS