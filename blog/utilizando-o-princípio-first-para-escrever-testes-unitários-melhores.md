---
path: principios-first
date: 2019-10-14T19:45:44.059Z
title: Utilizando o princípio First para escrever testes unitários melhores
---
Já não é novidade que sou fã da prática de TDD para desenvolvimento de softwares, acredito realmente que um bom código só é um bom código se tiver bem coberto por testes, afinal de contas, são os testes que terão a capacidade de medir a qualidade de um código.

Recentemente estive lendo o _"Clean Code"_ do Tio Bob, um livro excelente pra quem busca uma maior sensibilidade a qualidade de um código. Neste livro existe um capítulo inteiro dedicado às boas práticas na escrita e execução de testes. Tio Bob afirma que um teste deve ser bem escrito, para que assim os desenvolvedores possam evoluir tanto o teste quanto o código de maneira simples, e que para que não deixem de praticar a escrita de testes por ser um fardo neste projeto.

Para ajudar nessa tarefa ele apresenta o principio **F.I.R.S.T**, uma boa prática que tem como objetivo melhorar a qualidade dos nossos códigos de testes.

Antes de falar desta técnica, gostaria de explicar a vocês que quando falamos qualidade no código de testes, falamos muito mais sobre legibilidade e mantenibilidade do que qualquer outra caracteristca exigida em códigos de produção.

Então vamos lá.

## O que é princípio F.I.R.S.T?

A sigla F.I.R.S.T significa, **F**ast, **I**solated or **I**ndependent, **R**epeatable, **S**elf-Validating and **T**imely, em um bom português Rápido, Isolado, Repetivel, Auto Validavél e Objetivo. A ideia é que comecemos a pensar nessas caracteristicas ao criar um teste.

Vamos esclarecer um pouco mais sobre o que esperado em cada uma das caracteristicas:

### FAST

Os testes unitários devem ser rápidos, caso contrário serão um enorme gargalo no desenvolvimento de sua aplicação. Espera-se que em aplicações maiores, tenhamos milhares de testes.

Agora imagine uma aplicação que contém 3000 testes e que cada teste leva 1 segundo para completar sua execução, serão necessários 50 minutos para finalizar a suite de testes. Por esse motivo, o ideal é que um teste seja executado em apenas alguns milisegundos.

Uma das causas de lentidão nos testes é a dependência de coisas externas  como bancos de dados, arquivos e aplicações externas. Eles levam muito tempo para entregar algum resultado. Para criar essas dependências você pode usar mock em seus testes.

Também é esperado que um teste seja rápido para criar e executar, se um desenvolvedor tiver que fazer muitas coisas que levem muito tempo para criar um teste, ele não fará o teste.

### ISOLATED OR INDEPENDENT
