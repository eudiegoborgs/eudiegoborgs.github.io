---
path: the-code-snake
date: 2023-08-31T12:05:45.650Z
title: The code snake you (O código cobra você)
---
Bem pessoal, não sei em que momento do futuro vocês estão lendo isso, mas no momento temporal que estou escrevendo essa brincadeira (The code snake you) ainda tem graça (ou só eu que acho engraçado mesmo).

Hoje eu quero falar com vocês sobre algumas decisões, se tratando de codificação, que podem parecer assertivas no inicio, mas que podem cobrar de vocês no futuro.

## Ausência de testes

Eu não poderia começar diferente né? Inicialmente a decisão de abrir mão de testes unitários ou de integração pode parecer uma boa escolha, afinal de contas, você vai escrever no minimo a metade do código para alcançar o resultado esperado.

O problema da ausência de testes, é que seu projeto cresce todos os dias e por melhor que seja sua mémoria, daqui a 6 meses você provavelmente não vai se lembrar com clareza de detalhes como funciona uma determinada parte do seu software e passará a correr o risco de uma alteração quebrar uma parte que foi esquecida do seu projeto.

Softwares crescem exponencialmente e quanto mais linhas de código criadas, mais dificil se torna manter a integridade funcional de tudo, isso sem falar que na maioria das vezes o software vai ser escrito por uma equipe e outros membros escreverão códigos, muitas vezes sem seguir um mesmo padrão.

O trabalho com testes pode parecer perda de tempo no inicio, mas é bem possivel que no futuro você se agradeça por ter escrito testes para cadá trecho de código escrito previamente.