---
path: a-importancia-do-tdd
date: 2019-10-01T16:44:25.020Z
title: >-
  A importância da cultura de TDD na vida dos desenvolvedores e dos não
  desenvolvedores​
---
> A maioria dos desenvolvedores são a favor dos testes, mas discordam completamente em como testar.

Era uma bela sexta-feira de outono, num clima ameno de fim de tarde de uns poucos anos atrás. O gerente de projeto entrou na sala informando que a incorreta formatação de um dado no sistema está causando alguns problemas, parece ser uma alteração simples e que vai causar um belo impacto positivo com o cliente. Neste momento a equipe engajada em agradar o cliente altera a formatação do dado, testa para ver se o dado está formatado corretamente e publica em produção.

​
O que ninguém sabia era que aquele valor era formatado daquela maneira para atender a um requisito de uma outra parte muito distante do sistema e sua alteração acabou causando um impacto enorme que só foi percebido uma semana depois. O resultado de tudo isso foi exatamente o contrario do esperado, _um enorme desconforto com o cliente_.
​
Quem nunca passou por algo parecido?
​

## O processo de automação com testes

​
Dentro da disciplina de engenharia de software, existe uma area chamada de **Automação em testes** (ou apenas **Testes** como eu prefiro chamar). Essa disciplina consiste em inúmeras técnicas (_Testes unitários, de interface, de contrato, de integração, e2e, etc_) utilizadas para tornar o processo de testes automático e mais produtivo. Mesmo com a existência de algo tão relevante ainda existem muitas discussões sobre quando e como inserir essas técnicas em seu projeto. Perguntas como _"Qual a melhor técnica de testes?"_, _"Quando devo testar?"_, _"Tenho que testar tudo?"_ ainda são muito recorrentes no dia a dia de uma equipe de desenvolvimento que está começando a trabalhar com testes.

​
Para te ajudar com tudo isso vou te apresentar o TDD, uma metodologia que tem como objetivo tornar a prática de testes essencial no desenvolvimento de um software.
​

## O que é TDD?

**TDD (Test-Driven Development ou Desenvolvimento Orientado a Testes)** tem se tornado sem dúvidas uma prática recorrente entre bons desenvolvedores. Ao contrário do que alguns pensam, o TDD não é uma técnica de testes, mas uma metodologia ou cultura para desenvolvimento de um software e tem um conceito bem simples: os testes são desenvolvidos antes de escrevermos o código final.
​
Para que o TDD dê certo é necessário trabalhar rigorosamente com um ciclo contínuo de ações sem pular nenhuma fase.
​

#### Calma ai que o palestrinha vai te explicar um pouco melhor como é esse ciclo…

![](/assets/1_k_1f_efrjqtnoft12mossa.gif)

O ciclo de desenvolvimento é chamado de Red, Green and Refactor, sendo composto das seguintes fases:
​

### 1. Novo teste

Nesta fase iremos escrever o código que irá testar o resultado da nossa nova funcionalidade, esta parte é muito importante pois é a base do nosso teste. É importante ressaltar que é necessário especificar muito bem qual o escopo de entrada e de saída do código a ser testado. Se você não consegue entender o que seu código vai fazer e retornar, você não poderá fazer um teste assertivo.
​

No começo não é muito intuitivo, mas com a prática aprendemos a escrever e a prever melhor os resultados de nossas funções.
​

#### Nesta etapa o teste falha

​
Por ainda não existir uma função o seu teste não vai funcionar (se funcionar tem algo de errado ai rsrs). Com o teste falhando temos um objetivo a alcançar, fazer o teste funcionar através da nossa funcionalidade.
​

### 2. Criar funcionalidade

Nessa fase iremos escrever o nosso código da maneira mais simples possível. O nosso objetivo é unicamente a aprovação nos testes. Neste momento não é necessário se preocupar com as boas práticas, design patterns ou coisas do tipo, o código só deve funcionar e passar pelo teste sem quebrar outros testes.
​

#### Nesta etapa o teste passa

Sinal verde! O código que você escreveu passou pelo teste e não quebrou os outros. É muito importante garantir que o seu código além de passar pelo teste desenvolvido, não está quebrando os testes que já existem.

![](/assets/1_f7h2h7xjhscdtfrujtiyqq.gif)

​
Agora vamos para a última fase.
​

### 3. Refatorar

Achou que não ia precisar mais se preocupar com padrões e boas práticas né? Achou errado!

![](/assets/1_o91cqy7focctxlaojj3uzw.gif)

​
Não é porque o código já está escrito e funcionando que o trabalho acabou, agora é a hora de refatorar com a tranquilidade por já ter um teste que pode nos indicar qualquer problema na hora de refatorar.
​

> O TDD nos obriga a escrever códigos menos acoplados e mais coesos para que se tornem mais “testáveis”.
> ​

* Como conseguimos um código simples? **Fazendo um Teste passar**
* Como conseguimos um código claro? **Refatorando o código após ele passar**
* Como conseguimos um código seguro? **Com Testes**

​

## Vantagens de usar TDD​

### Qualidade mais proativa e menos reativa

Na maioria dos projetos só pensamos na qualidade do resultado de suas funcionalidades em sua fase final, onde o projeto está sendo homologado. Para o desenvolvimento do produto isso é muito ruim, comunicação é um problema grande na maior parte das equipes e é muito difícil garantir que as coisas são interpretadas da mesma forma por todo mundo.
​

Imagine agora que no momento de homologar um projeto descobre-se que a equipe de desenvolvimento, por uma falha de comunicação tomou alguma decisão errada na base do projeto (sim, isso acontece). Não seria muito mais fácil evitar isso se tivessemos desde o princípio o profissional de qualidade envolvido, desenhando cenários de testes e analisando os processos e os resultados de cada feature? 
​

### Código mais legivel

​
Como vamos testar uma função de 1.000.000 de linhas que faz 547 coisas ao mesmo tempo? É impossível. Por este motivo escrever testes nos obriga a escrever códigos limpos que façam somente uma coisa. 
​

### Documentação do código

Uma das vantagens que acho mais legal é essa, a suite de testes (local onde seus códigos de testes ficam dentro do projeto para os menos familiarizados) serve como uma documentação, facilitando o onboarding de novas pessoas no projeto e sem aquele efeito colateral que é atualizar o código e não atualizar a documentação por que com o TDD o teste é atualizado antes da mudança no código em si e só funciona se ambos estiverem atualizados.
​

### Prevenção de bugs em partes desconhecidas do projeto em alterações simples

Quem nunca passou por uma situação parecida com a historinha do começo deste artigo? Pois é, situação complicada. A ampla cobertura de testes que é um resultado claro do TDD nos ajuda a previnir esse tipo de situação. 
​

Além disso, a alteração do comportamento de um código em um projeto que usa TDD é muito mais simples, você altera primeiro o teste que valida o cenario que você quer alterar para o novo resultado esperado e roda a suite, ela vai te apontar os lugares que estão diferentes do esperado, você corrige e roda a suite novamente para ver se não houve nenhum efeito colateral, se não houver, acabou e você tá livre para o seu próximo desafio.
​

### Deploy a qualquer hora, momento ou lugar

Imagine um mundo onde você pode fazer um deploy na sexta, às 17:59, ir para o meio da amazonia conhecer as belezas da nossa floresta sem sinal de internet ou celular e voltar na segunda feira para trabalhar sem se preocupar? A existência da suite de testes é uma garantia que as coisas que funcionavam antes vão continuar funcionando e isso nos ajuda a alcançar este estado de utopia.
​

> Código sem testes é código ruim. Não importa o quão bem escrito, nem se ele é bonito, orientado a objetos ou se foi bem encapsulado. Com testes, podemos alterar o comportamento de nosso código de maneira rápida e verificável. Sem eles, não temos como saber se nosso código está melhorando ou piorando. - Michael Feathers (Working Effectively with Legacy Code \[2004]).





> Os testes são tão importantes para a saúde de um projeto quanto o código de produção. Talvez até mais, pois eles preservam e aumentam a flexibilidade, capacidade de manutenção e reutilização do código de produção. - Uncle Bob (Clean Code \[2008])

## Conclusão

Por muito tempo eu ouvi falar no TDD como uma utopia, que era algo lindo no papel mas impossível de ser alvançado. Só que não! Depois de algum tempo trabalhando com o TDD aprendi que realmente não é uma bala de prata, não resolve todos os problemas da humanidade, mas também não é uma lenda, cabe ao profissional de desenvolvimento analisar o seu uso, e pra ser sincero, encontrei poucos casos onde não fazia sentido o uso do TDD.
