---
path: principios-first
date: 2019-10-14T19:45:44.059Z
title: Utilizando o princípio First para escrever testes unitários melhores
---
Já não é novidade que sou fã da prática de TDD para desenvolvimento de softwares, acredito realmente que um bom código só é um bom código se tiver bem coberto por testes, afinal de contas, são os testes que terão a capacidade de medir a qualidade de um código.

Recentemente estive lendo o _"Clean Code"_ do Tio Bob, um livro excelente pra quem busca uma maior sensibilidade à qualidade de um código. Neste livro existe um capítulo inteiro dedicado às boas práticas na escrita e execução de testes. Tio Bob afirma que um teste deve ser bem escrito para que assim os desenvolvedores possam evoluir tanto o teste quanto o código de maneira simples e que não deixem de praticar a escrita de testes por ser um fardo no projeto.

Para ajudar nessa tarefa ele apresenta o principio **F.I.R.S.T**, uma boa prática que tem como objetivo melhorar a qualidade dos nossos códigos de testes.

Antes de falar desta técnica, gostaria de explicar a vocês que quando falamos qualidade no código de testes, falamos muito mais sobre legibilidade e mantenibilidade do que qualquer outra caracteristca exigida em códigos de produção.

Então vamos lá.

## O que é princípio F.I.R.S.T?

A sigla **F.I.R.S.T** significa, **F**ast (Rápido), **I**solated (Isolado), **R**epeatable (Repetivel), **S**elf-Validating (Auto Validavel) and **T**horough and **T**imely (Minuncioso e Objetivo). A ideia é que comecemos a pensar nessas características ao criar um teste.

Vamos esclarecer um pouco mais sobre o que é esperado em cada uma das características:

### FAST

Os testes unitários devem ser rápidos, caso contrário serão um enorme gargalo no desenvolvimento da sua aplicação.

![](/assets/giphy.gif)

Espera-se que em aplicações maiores, tenhamos milhares de testes. Agora imagine uma aplicação que contém 3000 testes e que cada teste leva 1 segundo para completar sua execução, serão necessários 50 minutos para finalizar a suite de testes. Por esse motivo, o ideal é que um teste seja executado em apenas alguns milisegundos.

Uma das causas de lentidão nos testes é a dependência de coisas externas como bancos de dados, arquivos e aplicações externas. Eles levam muito tempo para entregar algum resultado. Para criar essas dependências você pode usar mock em seus testes.

Também é esperado que um teste seja rápido para criar e executar, se um desenvolvedor tiver que fazer muitas coisas que levem muito tempo para criar um teste, ele não o fará.

### ISOLATED OR INDEPENDENT

Seus testes devem ser capazes de se validar sozinhos, sem depender do resultado ou estado de um teste anterior. Isso garante que cada teste seja executado individualmente e que o seu resultado só interfira no cenário esperado.

Se seu teste depende de algum pre processamento de algum dado, estes dados devem ser processados na configuração do teste e restaurados após a sua execução para não afetar os testes que serão executados depois.

### REPEATABLE

Os testes devem ser capazes de ser executados repetidas vezes em qualquer ambiente sem variação dos seus resultados. Por esse motivo, devemos remover as dependências externas como acesso a banco de dados, ambiente ou rede, seu teste unitário deve depender apenas do código para se resolver. Esse cuidado garante que o teste só falhe por causa de algum erro no código ou na configuração do teste e não por algum problema externo.

### SELF-VALIDATING

Os testes unitários devem ser capazes de validar a si mesmos, interpretando os resultados para ver se é o esperado ou não sem uma intervenção manual.

### THOROUGH AND TIMELY

O principal objetivo ao escrever testes não é ter 100% de cobertura de código. O objetivo é ter testes em que possamos confiar. Mas o que realmente significa confiança? Significa que ao passar, seus testes garantem que o seu código realmente funciona e retorna os valores esperados.

Ao escrever testes primeiros sou obrigado a fazer com que minha implementação se adapte aos casos de testes que garantem o bom comportamento e não o contrário. Se eu decidir mudar alguma coisa na implementação sem alterar o comportamento, tudo o que preciso é escrever o código de maneira que os testes continuem a passar.
