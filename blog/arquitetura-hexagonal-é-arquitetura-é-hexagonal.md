---
path: hex-arch-is-arch
date: 2021-09-25T09:54:46.396Z
title: "Arquitetura Hexagonal... É arquitetura? É hexagonal? "
---
Fala galera! 

Estou meio sumido né? Sei que prometi para vocês uma série de artigos sobre o swoole (que está sendo desenvolvida), mas ainda não consegui dar continuidade. Sorry!\
*Ps: Se você ainda não leu o primeiro artigo da série. [Clica aqui.](https://diegoborgs.com.br/blog/mastering-swoole-php-parte-i-introdu%C3%A7%C3%A3o)*

Nas últimas semanas estou vendo algumas discussões relacionadas a confirmação da arquitetura hexagonal e outros modelos como DDD como arquitetura ou não. Acredito que a discussão é bem válida, e achei pertinente dar meus 2 centavos sobre o assunto. Diferente de alguns outros posts, acredito que o conteúdo desse é mais um ponto de vista do que uma resposta definitiva sobre o assunto, portanto cabe a você que lê, guardar aquilo que faz sentido.

Só para contextualizar, a arquitetura hexagonal consiste em dividir a aplicação em camadas separando o código em categorias diferentes (são geralmente usadas as camadas de infraestrutura, aplicação e domínio). Ela é baseada no famoso desenho da arquitetura de cebola ou arquitetura em camadas muito usado para representar a Clean Architecture" ou no bom português "Arquitetura Limpa", mas é chamada arquitetura hexagonal por causa dos primeiros desenhos usados em sua representação.

![Arquitetura Hexagonal](/assets/slide_37.jpeg "Arquitetura Hexagonal")

Hoje em dia você pode encontrar apresentações onde você verá octágonos e até decágonos, apesar do nome a forma e a quantidade de lados não é o ponto principal dessa "arquitetura". Ela também é conhecida como *Ports & Adapters"*, um nome que define um pouco melhor, mas não soa tão bonitinho quanto o outro. 

A ideia principal dessa arquitetura é separar códigos em camadas definidas por sua responsabilidade. Geralmente são:

* **Infraestrutura**: Camada responsável por comunicar com o mundo externo (HTTP, Bancos de Dados, gRPC, AMPQ, etc.), resumindo, ela é quem recebe as chamadas do mundo externo, responde e também é quem chama as dependências externas e recebe as respostas dela. 
* **Aplicação**: Camada responsável por controlar e transformar os dados para se adaptarem aos modelos que as regras de negócio precisam para resolver aquilo que deve ser resolvido.
* **Domínio ou Core:** Camada que contém as regras de negócio da sua aplicação.

Confesso que da primeira vez que vi a "Arquitetura Hexgonal" eu fiquei bem incrédulo quantos aos resultados que alcançaria com essa nova proposta, eu já me sentia muito seguro com o MVC do Laravel e essa mudança me tirou da minha zona de conforto.

Para que separar as coisas dessa forma? Para finalmente alcançar um código que tenha aquelas quatro palavrinhas que cansamos de ouvir na faculdade *baixo acoplamento e alta coesão*. Nossa... Mas eu vou fazer tudo isso só pra agradar professor? Não! A ideia de um código com baixo acoplamento e alta coesão é aumentar a reversibilidade e facilitar a manutenção e evolução no futuro.

Eu não vou me aprofundar na arquitetura hexagonal porque não é a ideia desse post, mas pretendo responder às perguntas do título.

### E aí? É ou não é hexagonal?

Não. Resolvi começar respondendo ela porque é mais fácil, apesar do nome, existem diversas representações geométricas que podem ser aplicadas a ela, acredito que *Ports & Adapters* é um nome que deixa mais claro o que ela propõe, mas convenhamos que hexagonal é mais legal.

### Então é uma arquitetura?

Para responder essa pergunta precisamos entender mais sobre o problema que a arquitetura hexagonal resolve. 

Ela tem a proposta de fazer os componentes se comunicarem de uma maneira linear e isso é muito mais do que só uma separação de pastas. É possível alcançar o objetivo dela tendo todos os arquivos na pasta raiz, mas é impossível ter esse mesmo resultado sem respeitar o fluxo de comunicação dela.

Vou tentar exemplificar isso... Suponhamos que temos uma feature em nossa API para criação de um novo usuário, o fluxo de comunicação do serviço ficaria assim:

![Desenho representando o fluxo de comunicação de um serviço.](/assets/hex-arch-2x-1-.png "Desenho representando o fluxo de comunicação de um serviço.")

Se vocês repararam bem, as setas estão sempre apontadas do azul para o verde e depois para o vermelho *(Exceto as que representam a implementação real da interface).*

Agora veja um desenho de arquitetura de um exemplo de sistema distribuído:

![Desenho representando o fluxo de comunicação de um sistema distribuido.](/assets/gamefik-architecture-2x.png "Desenho representando o fluxo de comunicação de um sistema distribuido.")

Ambos os desenhos falam de como eles se comunicam e não sobre o local onde seus componentes estão salvos. Eu percebo que as pessoas desenvolvedoras tem se confundido com a distribuição de pastas e estão começando a acreditar que para ter uma arquitetura diferente (DDD, Hex, Clean) é só criar as pastas e não é bem assim.

Para concluir... Como um bom desenvolvedor sênior, vou te dizer que depende *(não resisti a brincadeira).* Mas de fato, para dizer se é ou não é uma arquitetura depende do ponto de onde estamos observando. Se olharmos para um sistema distribuído na totalidade, a arquitetura hexagonal não é uma arquitetura, na verdade, é apenas parte da arquitetura, mas se olharmos para um serviço desse sistema, então teremos sim uma arquitetura.