---
path: 5-coisas-tdd
date: 2019-10-03T03:38:51.729Z
title: 05 coisas sobre o TDD que você pode estar pensando errado
---
Esses dias escrevi um post sobre [a importância da cultura de TDD para desenvolvedores e não desenvolvedores](#), para dar continuidade sobre esse tema que eu acho extremamente relevante, vamos desmistificar algumas coisas sobre TDD e a cultura de testes. 

Para contextualizar vocês, durante a minha carreira como desenvolvedor já tive a oportunidade de discutir sobre esse tema com vários desenvolvedores de diferentes experiências e gostos. Durante essas discussões era normal ver gente defendendo o TDD sem nunca ter práticado, com a desculpa que TDD é algo bom mad que não funcionava com ele, outros diziam que era utopia e impraticável na vida real. Eles geralmente chegavam a essas conclusões baseados nos  argumentos que serão listados neste texto, após alguns meses de estudo dedicado ao tema, pude perceber que não são tão verdade assim.

## Você não consegue escrever um teste para uma coisa antes que essa coisa exista

Esse é um clássico, talvez seja o argumento que eu mais ouvi em todas as vezes que estava conversando sobre o tema. 

É sempre complicado analisar questões culturais, quantas vezes não escutamos em uma conversa sobre outras culturas coisas como _"Nossa, mas eles se vestem assim? Eles comem isso mesmo? Como eles que conseguem viver dessa forma? Etc."_ Se você olhar direito pro tema, o TDD além de uma metodologia, é uma questão de mudança cultural, muda a ordem do método de desenvolvimento comum e por esse motivo causa todo esse alvoroço.

A príncipio é difícil mesmo inverter a natural do ciclo de desenvolvimento, mas se você tem uma feature bem especificada é possível entender o que testar antes mesmo de começar, além disso, escrever os testes antes de escrever o código de produção, te ajuda a planejar e desenhar melhor a estrutura do seu código.

## TDD é caro, consome muito tempo, vai atrasar o lançamento do meu produto e só serve para o time de desenvolvimento.

Como diria o ditado _"tempo é dinheiro"_, mas se você for parar para analisar, dinheiro bom, é dinheiro bem investido, com segurança e rentabilidade alta.

Se você fizer uma analise superfícial, talvez essa questão de escrever testes para os seus códigos pareça um tiro no pé, mas olhando mais profundamente e a longo prazo, o TDD vai te trazer como resultado muita economia de tempo no futuro. 

Vamos fazer um flashback rápido. 

Quantas vezes você ou seu time de desenvolvimento teve que parar de desenvolver coisas novas para investir um problema no código e no fim descobriu que isso estava ocorrendo por que publicaram uma alteração em outra parte do sistema?

Será que se esse código fosse coberto por testes esse problema não teria sido previnido?

Quanto esse bug custou para o seu produto?

Quanto tempo você gastou respondendo chamados, no telefone com o cliente, passando relatório de bugs ou criando estratégias para recuperar a confiança perdida?

Além desses benefícios, a cultura de TDD vai trazer mais produtividade para sua equipe, mudanças de regra de negócio em uma aplicação coberta por testes são mais simples e o número de interrupções na equipe para investigar erros diminui muito.

## O time de negócios não vai me deixar fazer testes

Cada profissão tem sua dose de responsabilidade, o engenheiro não usa menos material ou o médico não dá a receita de um medicamento diferente porque o time de negócios quer.

O grande problema é que quando o time de negocios vem pedir um prazo, nós mesmos nos sabotamos. Dizemos que levamos x dias para fazer algo e mais x dias escrevendo os testes, mas que se a gente não fizer os testes podemos entregar em menos x dias. 

O time de negócio que dar respostas rápidas ao mercado, faz parte do papel deles.

Como um bom profissional de desenvolvimento, não necessitamos de aprovação para promover a cultura de testes, faz parte do nosso papel, temos que nos responsabilizar pela qualidade do produto que entregamos. Eu posso te garantir que se seu trabalho for entregue com qualidade, o time de negócios vai confiar no seu prazo.

## Essa parada de testes e qualidade é coisa de QA

Quem é o responsável pela qualidade de seu trabalho? O único responsável pela qualidade do que você faz é você, não terceirize esse papel.

Já trabalhei com pessoas que nem se quer abriam a aplicação depois de uma alteração que considerava simples, acabavam de escrever o código e já mandavam para o QA testar.

O QA abria a aplicação e tava tudo quebrado por causa da falta de um ponto e virgula.

![](/assets/macaco.gif)

Vamos encarar o QA como o profissional que vai guiar o seu trabalho para o estado da arte e não como um testador do código que você faz.

## Eu tenho que escrever todos os testes possíveis e existentes na face da terra para a minha feature antes de começar a escrever ela

Acho que pensamos isso porque somos programadores, estamos acostumados a lidar com instruções exatas. 

![](/assets/tirinha25.png)

Quando alguém fala _"Hey, pra fazer TDD você precisa criar seus testes antes do código"_ nossa mente de programador já começa a pensar em todos os testes possíveis para uma feature e na medida que começamos a imaginar os cenários mais impróprios, encaramos como uma tarefa impossível.

O TDD não é assim, se você escreve um cenário de testes antes de escrever seu código, vocÊ já está fazendo TDD.

## TDD é só teste unitário

Muitas pessoas acham que TDD e teste unitário são a mesma coisa. 

![](/assets/no.gif)

Pra começar TDD é uma metodologia de desenvolvimento enquanto testes unitários são uma técnica de testes. É verdade que os testes unitários são muito úteis e é a técnica mais simples e barata de se implementar, mas não vamos desconsiderar as outras. São vários anos de estudos relacionados a disciplina de testes de software para elaboração, existem vários tipos de testes e cada um resolve um tipo de problema. Cabe a equipe de desenvolvimento entender quais a ou as técnicas que serão utilizadas em cada feature ou projeto.

Então é isso pessoal! Se vocês sabem de algum mito sobre TDD que não tá aqui, me chama pra trocar uma ideia.
