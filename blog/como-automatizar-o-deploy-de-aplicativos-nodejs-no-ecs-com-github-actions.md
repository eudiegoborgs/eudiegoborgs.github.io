---
path: Como automatizar o deploy de aplicativos nodejs no ECS com Github Actions
date: 2020-07-28T16:10:53.987Z
title: Como automatizar o deploy de aplicativos nodejs no ECS com Github Actions
---
![Pipeline no Github Actions mostrando os passos do deploy com sucesso](assets/fireshot-capture-052-merge-branch-shopping-into-develop-·-gamefik_webspot-gamefik-fdbb24_-github.com.png "Pipeline no Github Actions mostrando os passos do deploy com sucesso")

Não existe uma aplicação completa, se ela não estiver disponível para uso. Por este motivo a publicação de um projeto é parte essencial no desenvolvimento de um software. 

Porém, a publicação é sempre uma sequencia de passos repetitivos e que podem roubar muito do seu tempo, além de que se feito de maneira errada, pode acarretar na indisponibilidade da sua aplicação. Neste caso a automação é uma ferramenta poderosa e muito importante para garantir a produtividade e segurança para você e a sua equipe.

Neste artigo eu pretendo mostrar a vocês como criar um ambiente de publicação automatizado usando Docker, Github Actions e o AWS ECS. Este tutorial foi feito com uma aplicação em nodejs, mas acredito que possa ser usado por qualquer tipo de linguagem desde que devidamente feita em containers com Docker.