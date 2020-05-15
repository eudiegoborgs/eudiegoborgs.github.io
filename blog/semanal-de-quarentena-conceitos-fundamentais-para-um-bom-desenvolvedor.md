---
path: semanal-de-quarentena-5
date: 2020-05-14T21:55:30.292Z
title: '[Semanal de quarentena] - 6 Conceitos fundamentais para um bom desenvolvedor'
---
E ai galera, tudo bem? Eu espero que sim!

Dando sequencia aos meus posts semanais de quarentena para vocês, hoje resolvi seguir o conselho de alguns amigos no twitter que me pediram pra falar um pouco sobre alguns conceitos de desenvolvimento, além disso faz um tempinho que eu quero escrever alguma coisa sobre carreira. Então, eu vou fazer uma abstração e reaproveitar esse código... ops, quero dizer post para fazer uma listinha com os conceitos que eu considero fundamentais para bons desenvolvedores.

Apesar de ter feito minhas primeiras linhas de HTML em 2011, e de lá pra cá já são 9 anos em que tive a oportunidade de trabalhar em muitos projetos com desafios diferentes e em times com muita gente boa, confesso que as vezes eu não acredito que minha carreira é tão longa assim para falar como outra pessoa deve lidar com a dela. O que eu vou deixar para vocês aqui são alguns conceitos que, depois que comecei a entender, me tornaram um desenvolvedor melhor, mas deixo com vocês a responsabilidade de decidir aplicar ou não eles em suas vidas profissionais.

_PS: Pra ser sincero, eu não vou me aprofundar em nenhum dos conceitos que vou citar nesse artigo, existem milhares de artigos técnicos sobre cada um dos assuntos na internet, a ideia é ser seja um roadmap para vocês complementarem seus estudos depois, mas vou dar uma boa pincelada em cada um deles e indicar algum artigo que complemente o que eu falar no fim de cada tópico._

## 1. Princípios S.O.L.I.D.

Eu resolvi dedicar um tempo de estudo para este conceito depois de ser cobrado sobre ele em uma entrevista de emprego. Eu já até conhecia e aplicava alguns dos princípios em parte mesmo sem saber depois de ouvir algumas recomendações de melhorias em uma code review. 

Até hoje consigo ouvir a voz do grão mestre [Danton](https://www.linkedin.com/in/danton-dietze/) fazendo um code review comigo e falando indiretamente sobre o princípio de responsabilidade única **(S - Single Responsability.** Coisas como... _Diego, essa função tá fazendo mais de uma coisa_ ou _Diego, isso que você colocou aqui, não deveria estar aqui porque não é responsabilidade dessa classe._

Os S.O.L.I.D. são princípios da programação orientada a objetos, é um acrônimo criado por Michael Feather, autor do _Working Effectively with Legacy Code,_ baseado em orientações encontradas no artigo e abordados no artigo [The Principles of OOD](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod) do Tio Bob. Sendo eles:

**S. Single Responsiblity Principle** (Princípio da responsabilidade única)\
**O. Open-Closed Principle** (Princípio Aberto-Fechado)\
**L. Liskov Substitution Principle** (Princípio da substituição de Liskov)\
**I. Interface Segregation Principle** (Princípio da Segregação da Interface)\
**D. Dependency Inversion Principle** (Princípio da inversão da dependência)

Para vocês aprofundarem seus estudos deixo com vocês o excelente artigo do João Roberto, [O que é SOLID: O guia completo para você entender os 5 princípios da POO.](https://medium.com/joaorobertopb/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530)

## 2. Design Patterns

Os design patterns ou padrões de projeto foram apresentados para mim ainda nos primeiros períodos da faculdade e eu confesso que eu não dei nenhuma bola, alguns anos mais tarde tive um reencontro com eles na minha vida profissional. Acredite, apesar de ter trabalhado em vários projetos diferentes, muitos problemas que enfrentei eram exatamente iguais.

Eu considero os Design Patterns um estudo essencial para um programador e também um manual para ser consultado com soluções generalistas para problemas recorrentes de durante o desenvolvimento de um software. Os padrões de projeto são divididos em Criacionais, Estruturais e Comportamentais, mas não tente decorar todos de uma vez, acredito que isso seja impossível, com o tempo alguns padrões que você usar mais vão ficar mais familiares para você.

Geralmente eu uso o [refactoring.guru](https://refactoring.guru/pt-br/design-patterns) para consulta sempre que necessário. Ele tem um material completo e em português sobre Design Patterns.

## 3. O protocolo HTTP

Talvez esse conceito se aplique apenas aos desenvolvedores que trabalham com aplicações web, seja na sua implementação ou consumo _(se você é um desenvolvedor mobile que consome uma API você se encaixa aqui)_. 

Com o surgimento e popularização dos frameworks, nós desenvolvedores, acabamos deixando um pouco de lado a obrigação de conhecer como funcionam os nossos protocolos de comunicação. Muito disso se deve ao fato de termos todo o funcionamento abstraído dentro dos frameworks que utilizamos.

A grande questão é que com isso começamos a ter algumas aplicações que esperavam parâmetros em lugares inesperados e/ou davam respostas HTTP erradas e acabavam por deixar as aplicações que consumiam elas loucas e cheias de gambiarras para contornar isso. Quer ver um exemplo? O clássico 404 quando na verdade é um 200 de uma lista vazia, o 401 no lugar de 403 ou a aplicação que espera um token de autorização no body ao invés do header da requisição.

Eu fiz essa [apresentação](https://eudiegoborgs.github.io/introducao-web-dev) em 2018 para dar uma introdução para alguns colegas de trabalho não desenvolvedores sobre o desenvolvimento para web, nela eu falo um pouquinho sobre o protocolo HTTP. Acho que é uma boa base para começar a entender sobre o assunto.

## 4. Testes

## 5. Arquitetura de Software

## 6. Code Review
