---
path: documentacao-by-google
date: 2025-10-22T10:45:44.059Z
title: Documentação no Google (Tradução)
---

Escrito por Tom Manshreck
Editado por Riona MacNamara
Traduzido por Diego Borges

Entre as principais reclamações que engenheiros têm sobre escrever, usar e manter código, uma das mais comuns é a falta de documentação de qualidade.

- “Quais são os efeitos colaterais desse método?”

- “Recebi um erro após o passo 3.”

- “O que significa essa sigla?”

- “Esse documento está atualizado?”

Todo engenheiro de software já reclamou da qualidade, quantidade ou simples ausência de documentação ao longo da carreira — e os engenheiros do Google não são diferentes.

Redatores técnicos e gerentes de projeto podem ajudar, mas os engenheiros sempre precisarão escrever a maior parte da documentação por conta própria. Portanto, eles precisam das ferramentas e incentivos adequados para fazer isso de forma eficaz. A chave para facilitar a produção de documentação de qualidade é introduzir processos e ferramentas que cresçam junto com a organização e que se integrem ao fluxo de trabalho já existente.

De modo geral, o estado da documentação de engenharia no fim da década de 2010 é semelhante ao estado dos testes de software no fim dos anos 1980. Todos reconhecem que é preciso investir mais esforço para melhorá-la, mas ainda não há um reconhecimento organizacional claro dos seus benefícios críticos. Isso está mudando — ainda que lentamente. No Google, nossos esforços mais bem-sucedidos aconteceram quando tratamos a documentação como código, incorporando-a ao fluxo tradicional de engenharia, o que torna mais fácil para os engenheiros escrever e manter documentos simples.

## O que é considerado documentação?

Quando falamos em “documentação”, estamos nos referindo a todo texto suplementar que um engenheiro precisa escrever para realizar seu trabalho — não apenas documentos isolados, mas também comentários no código. (De fato, a maior parte da documentação produzida por engenheiros no Google está em forma de comentários.) Vamos discutir os diversos tipos de documentos de engenharia mais adiante neste capítulo.

## Por que a documentação é necessária?

Documentação de qualidade traz enormes benefícios para uma organização de engenharia.
O código e as APIs se tornam mais compreensíveis, reduzindo erros.
As equipes ficam mais focadas quando seus objetivos e metas estão claramente definidos.
Processos manuais são mais fáceis de seguir quando as etapas estão bem descritas.
E integrar novos membros à equipe ou ao código exige muito menos esforço quando o processo está claramente documentado.

Mas, como os benefícios da documentação aparecem apenas a longo prazo, normalmente o autor não sente ganhos imediatos. Diferente dos testes, que trazem retorno rápido ao programador, a documentação exige mais esforço inicial e raramente oferece vantagens claras no curto prazo. Ainda assim, assim como os investimentos em testes, o investimento em documentação se paga com o tempo. Afinal, um documento pode ser escrito uma única vez, mas será lido centenas — talvez milhares — de vezes depois. Seu custo inicial se dilui entre todos os leitores futuros.

A documentação não apenas escala com o tempo, como também é essencial para que o restante da organização possa escalar. Ela ajuda a responder perguntas como:

- Por que essas decisões de design foram tomadas?

- Por que implementamos esse código dessa forma?

- Por que eu implementei esse código dessa forma (quando você mesmo o revisa dois anos depois)?

Se a documentação traz tantos benefícios, por que os engenheiros geralmente a consideram “ruim”?
Uma razão, como já mencionado, é que os benefícios não são imediatos, especialmente para quem escreve. Mas há outros motivos:

- Engenheiros costumam ver a escrita como uma habilidade separada da programação. (Vamos tentar mostrar que não é bem assim — e mesmo onde é, ainda faz parte da engenharia de software.)

- Alguns engenheiros acham que não são bons escritores. Mas não é preciso domínio avançado do inglês para produzir documentação funcional; basta se colocar no lugar do leitor.

- Escrever documentação é mais difícil quando há poucas ferramentas de suporte ou integração com o fluxo de trabalho do desenvolvedor.

- Documentar é visto como um fardo extra — algo a mais para manter — em vez de algo que facilita a manutenção do próprio código.

Nem toda equipe de engenharia precisa de um redator técnico (e, mesmo que precisasse, não há profissionais suficientes para isso). Isso significa que, na maioria das vezes, os próprios engenheiros escreverão a documentação. Portanto, em vez de tentar transformar engenheiros em redatores técnicos, devemos tornar o ato de escrever documentação mais simples para eles.

Cada organização precisa decidir quanto esforço quer dedicar à documentação.

Mesmo para o autor, a documentação traz vantagens importantes:

- **Ajuda a formular uma API**. Escrever documentação é uma das formas mais seguras de descobrir se sua API faz sentido. Muitas vezes, o simples ato de documentar leva o engenheiro a repensar decisões de design que, de outro modo, passariam despercebidas. Se você não consegue explicar algo claramente, talvez não o tenha projetado bem o suficiente.

- **Fornece um guia de manutenção e um registro histórico**. Truques em código devem ser evitados, mas bons comentários ajudam bastante quando você olha para um código antigo tentando entender o que há de errado.

- **Faz seu código parecer mais profissional e confiável**. Desenvolvedores tendem a assumir que uma API bem documentada é uma API bem projetada — e, embora isso nem sempre seja verdade, há uma forte correlação. A qualidade da documentação geralmente é um bom indicador da qualidade da manutenção do produto.

- **Reduz o número de perguntas dos usuários**. Esse é provavelmente o maior benefício de longo prazo: se você precisa explicar algo mais de uma vez, provavelmente vale a pena documentar.

Por maiores que sejam os benefícios para quem escreve, a maior parte deles vai, naturalmente, para quem lê.
O Google C++ Style Guide traz o princípio “[otimize para o leitor](https://google.github.io/styleguide/cppguide.html#Goals)” — e ele se aplica não só ao código, mas também aos comentários e à documentação associada. Assim como acontece com testes, o esforço investido em escrever bons documentos gera benefícios múltiplos ao longo do tempo.

Documentação é essencial à medida que o tempo passa — e traz ganhos enormes, especialmente para o código crítico, conforme a organização cresce.

## Documentação é como código

Engenheiros de software que programam em uma linguagem principal costumam recorrer a outras linguagens para resolver problemas específicos. Um engenheiro pode escrever shell scripts ou código em Python para tarefas de linha de comando, ou desenvolver a maior parte do backend em C++, mas escrever parte do middleware em Java, e assim por diante. Cada linguagem é uma ferramenta na caixa de ferramentas.

A documentação não deve ser diferente: ela é uma ferramenta, escrita em outra linguagem (geralmente o inglês), usada para cumprir uma tarefa específica. Escrever documentação não é muito diferente de escrever código. Assim como uma linguagem de programação, ela possui regras, uma sintaxe própria e decisões de estilo — geralmente com o mesmo propósito que no código: reforçar consistência, melhorar a clareza e evitar erros de compreensão.

Na documentação técnica, a gramática é importante não por uma questão de rigidez, mas para padronizar o tom e evitar confundir ou distrair o leitor. O Google, por exemplo, exige um estilo de comentário específico para muitas de suas linguagens justamente por esse motivo.

Assim como o código, os documentos também devem ter responsáveis. Documentos sem responsáveis se tornam obsoletos e difíceis de manter. Ter uma pessoa ou equipe claramente responsável facilita o tratamento da documentação dentro dos fluxos já existentes dos desenvolvedores — como sistemas de rastreamento de bugs, ferramentas de revisão de código, etc.

Naturalmente, documentos com responsáveis diferentes podem entrar em conflito. Nesses casos, é importante designar uma documentação canônica: determinar qual é a fonte principal e consolidar nela as demais versões associadas (ou descontinuar as duplicadas).

A documentação costuma estar tão fortemente ligada ao código que, sempre que possível, [deve ser tratada como código](https://oreil.ly/G0LBo). Ou seja, sua documentação deve:

- Ter políticas ou regras internas a serem seguidas;

- Estar sob controle de versão;

- Ter responsáveis claros pela manutenção;

- Passar por revisões quando sofrer alterações (e mudar junto com o código que descreve);

- Ter problemas rastreados, como se fossem bugs de código;

- Ser periodicamente avaliada (testada, de certo modo);

- E, se possível, ser medida em aspectos como precisão e atualização (embora as ferramentas ainda não estejam totalmente maduras para isso).

Quanto mais os engenheiros tratarem a documentação como parte essencial do desenvolvimento de software, menos resistência terão aos custos iniciais de escrevê-la — e mais colherão seus benefícios no longo prazo. Além disso, quanto mais simples for o processo de documentar, menores serão esses custos iniciais.

> ### Estudo de Caso: O Wiki do Google
> 
> Quando o Google era muito menor e mais enxuto, havia poucos redatores técnicos. A maneira mais fácil de compartilhar informações era por meio de nosso próprio wiki interno (GooWiki). No início, isso parecia uma abordagem razoável; todos os engenheiros compartilhavam um único conjunto de documentações e podiam atualizá-las conforme necessário.
> 
> Mas, à medida que o Google crescia, os problemas de uma abordagem baseada em wiki tornaram-se evidentes. Como não havia verdadeiros responsáveis pelos documentos, muitos se tornaram obsoletos.³ Como não existia um processo estabelecido para adicionar novos documentos, começaram a surgir duplicações de documentos e de conjuntos inteiros. O GooWiki possuía um espaço de nomes plano, e as pessoas não eram boas em aplicar hierarquia aos conjuntos de documentação. Em determinado momento, havia entre 7 e 10 documentos (dependendo de como se contava) sobre a configuração do Borg, nosso ambiente de computação em produção — apenas alguns eram realmente mantidos, e a maioria era específica de certas equipes com permissões e suposições próprias.
> 
> Outro problema com o GooWiki ficou evidente com o tempo: as pessoas que podiam corrigir os documentos não eram as mesmas que os utilizavam. Novos usuários que encontravam documentos ruins não conseguiam confirmar se eles estavam errados ou não tinham uma forma fácil de relatar erros. Eles sabiam que algo estava errado (porque o documento não funcionava), mas não podiam “corrigi-lo”. Por outro lado, aqueles mais aptos a corrigir os documentos geralmente não precisavam mais consultá-los após escrevê-los. A documentação ficou tão deficiente conforme o Google crescia que a qualidade da documentação se tornou a principal reclamação dos desenvolvedores nas pesquisas anuais internas.
> 
> A maneira de melhorar essa situação foi mover as documentações importantes para o mesmo tipo de controle de versão usado para rastrear mudanças no código. Os documentos passaram a ter responsáveis próprios, locais canônicos dentro da árvore de código-fonte e processos para identificar e corrigir erros — e a documentação começou a melhorar significativamente. Além disso, a forma como a documentação era escrita e mantida passou a se parecer muito com a forma como o código era desenvolvido. Erros nos documentos podiam ser relatados no nosso sistema de bug tracking. Alterações nos documentos podiam ser tratadas pelo processo existente de revisão de código. Com o tempo, os próprios engenheiros começaram a corrigir os documentos ou enviar alterações aos redatores técnicos (que muitas vezes eram os responsáveis).
> 
> A migração da documentação para o controle de versão foi inicialmente recebida com muita controvérsia. Muitos engenheiros acreditavam que eliminar o GooWiki — aquele bastião da liberdade de informação — resultaria em queda na qualidade, já que a nova forma exigia revisões, responsáveis e outros requisitos. Mas não foi o que aconteceu. Os documentos ficaram melhores.
> 
> A introdução do Markdown como uma linguagem comum de formatação de documentação também ajudou, pois facilitou para os engenheiros a edição dos documentos sem precisar de conhecimento especializado em HTML ou CSS. O Google acabou criando seu próprio framework para incorporar documentação dentro do código: o g3doc. Com esse framework, a documentação melhorou ainda mais, pois passou a existir lado a lado com o código-fonte dentro do ambiente de desenvolvimento do engenheiro. Agora, os engenheiros podiam atualizar o código e a documentação associada na mesma alteração (uma prática que ainda está em processo de ampla adoção).
> 
> A principal diferença foi que manter documentação passou a ser uma experiência semelhante a manter código: engenheiros registravam bugs, faziam alterações em changelists, enviavam revisões para especialistas e assim por diante. Aproveitar os fluxos de trabalho já existentes dos desenvolvedores, em vez de criar novos, foi o grande benefício.

## Conheça seu público

Um dos erros mais comuns que engenheiros cometem ao escrever documentação é escrever apenas para si mesmos. Isso é natural — e não é totalmente ruim: afinal, você pode precisar revisitar esse código no futuro e tentar lembrar o que quis dizer. Além disso, seu nível técnico pode ser parecido com o de quem vai ler o documento.

Mas, se você escreve apenas para si, acaba fazendo suposições que podem não valer para outras pessoas. Como sua documentação pode ser lida por um público amplo (toda a engenharia, desenvolvedores externos, etc.), perder até alguns leitores já representa um grande custo. À medida que a organização cresce, os erros de documentação se tornam mais evidentes, e suas suposições deixam de se aplicar.

Por isso, antes de começar a escrever, identifique formal ou informalmente quem é o público que seu documento precisa atender. Um documento de design pode precisar convencer tomadores de decisão. Um tutorial pode precisar de instruções detalhadas para alguém completamente novo no código. Uma documentação de API deve conter informações completas e precisas, tanto para especialistas quanto para iniciantes.

Sempre tente identificar o público principal e escreva para ele.

Boa documentação não precisa ser perfeita.
Um erro comum é achar que é preciso ser um “ótimo escritor”. Se fosse assim, poucos engenheiros escreveriam.
Encare a escrita como encara os testes: parte do trabalho de engenharia.
Escreva pensando no seu público, com o tom e o estilo que ele espera.
Se você consegue ler, consegue escrever.
Lembre-se: seu leitor está onde você já esteve, mas sem o seu conhecimento atual do domínio.
Você não precisa ser um escritor excepcional — só precisa ajudar alguém como você a chegar ao mesmo nível de entendimento que você tem hoje.
(E depois, é claro, pode ir aprimorando o documento com o tempo.)

### Tipos de público

Você deve escrever considerando o nível de habilidade e o conhecimento do domínio do seu público. Mas afinal, quem é esse público?
Provavelmente, você tem múltiplos públicos, que podem variar segundo:

- Nível de experiência: desde programadores experientes até engenheiros júniores que talvez nem conheçam a linguagem usada.

- Conhecimento do domínio: colegas da equipe ou outros engenheiros da empresa que só conhecem os endpoints da API.

- Propósito: usuários finais que precisam realizar uma tarefa específica rapidamente, ou especialistas responsáveis por partes complexas do sistema que você espera que ninguém mais precise manter.

Em alguns casos, públicos diferentes exigem estilos de escrita diferentes; mas, na maioria, o desafio é escrever de forma que atenda a todos.
Muitas vezes, será necessário explicar um tema complexo tanto para um iniciante quanto para um especialista.
Se escrever apenas para o especialista, o novato se perderá; se detalhar demais para o iniciante, o especialista se irritará.

Não há fórmula mágica — é um equilíbrio.
Mas há uma prática útil: mantenha os documentos curtos.
Escreva o suficiente para explicar assuntos complexos a quem não conhece o tema, mas sem cansar os mais experientes.
Frequentemente, isso significa escrever um texto longo primeiro e depois reduzi-lo, removendo repetições e excessos.
Pode parecer trabalhoso, mas lembre-se: esse esforço se divide entre todos os leitores futuros. Como disse Blaise Pascal, “Se eu tivesse mais tempo, teria escrito uma carta mais curta.” Um documento curto e claro tende a satisfazer tanto especialistas quanto novatos.

Outro fator importante é como o leitor chega até o documento:

- **Buscadores (seekers)**: engenheiros que sabem o que querem e procuram confirmar se o documento atende à sua necessidade.
Para eles, a chave é a consistência.
Se estiver escrevendo documentação de referência — por exemplo, dentro de um arquivo de código — mantenha um formato uniforme nos comentários, para que seja fácil escanear e localizar rapidamente o que buscam.

- **Exploradores (stumblers)**: engenheiros que ainda não sabem exatamente o que procuram.
Eles têm apenas uma ideia vaga de como implementar algo.
Para esse público, a chave é a clareza.
Forneça visões gerais e introduções (por exemplo, no topo de um arquivo) que expliquem o propósito do código. Também é útil indicar quando um documento não é relevante para alguém.
Muitos documentos no Google começam com uma frase de “TL;DR”, como: “TL;DR: se você não se interessa por compiladores C++ do Google, pode parar de ler agora.”

Outro tipo importante de distinção é entre o público cliente (usuário da API) e o público provedor (membro da equipe do projeto). Sempre que possível, mantenha separados os documentos voltados a cada um.
Detalhes de implementação são importantes para quem mantém o sistema, mas desnecessários (e confusos) para o usuário final. Muitos engenheiros acabam incluindo justificativas de design na documentação de referência da API.
Essas explicações pertencem a documentos específicos (como documentos de design) — ou, no máximo, dentro do código, escondidas atrás da interface.

## Tipos de Documentação

Engenheiros escrevem vários tipos diferentes de documentação como parte de seu trabalho: documentos de design, comentários de código, guias de instruções (how-to), páginas de projeto e mais. Todos esses contam como “documentação”. Mas é importante conhecer os diferentes tipos — e não misturá-los.  

Um documento deve ter, em geral, um propósito único e mantê-lo. Assim como uma API deve fazer uma única coisa e fazê-la bem, evite tentar realizar várias funções em um único documento. Em vez disso, divida essas partes de forma mais lógica.

Há vários tipos principais de documentos que engenheiros de software frequentemente precisam escrever:

- Documentação de referência, incluindo comentários de código  
- Documentos de design  
- Tutoriais  
- Documentação conceitual  
- Páginas de entrada (landing pages)  

Nos primeiros dias do Google, era comum que as equipes tivessem páginas wiki monolíticas com vários links (muitos quebrados ou obsoletos), algumas informações conceituais sobre como o sistema funcionava, uma referência de API e assim por diante — tudo misturado.  

Esses documentos falham porque não servem a um único propósito (e também acabam ficando tão longos que ninguém os lê; algumas páginas notórias rolavam por várias dezenas de telas).  

Em vez disso, certifique-se de que seu documento tenha um propósito único e, se adicionar algo a essa página não fizer sentido, provavelmente é melhor encontrar — ou até criar — outro documento para esse propósito.

### Documentação de Referência

A documentação de referência é o tipo mais comum que engenheiros precisam escrever; de fato, eles frequentemente precisam criar algum tipo de documento de referência todos os dias. Por documentação de referência, entendemos qualquer coisa que documente o uso de código dentro da base de código.  

Comentários de código são a forma mais comum de documentação de referência que um engenheiro deve manter. Esses comentários podem ser divididos em dois grupos básicos: **comentários de API** e **comentários de implementação**.  

Lembre-se da diferença de público entre esses dois: comentários de API não precisam discutir detalhes de implementação ou decisões de design e não podem presumir que o usuário conheça a API tão bem quanto o autor. Comentários de implementação, por outro lado, podem assumir muito mais conhecimento de domínio por parte do leitor — embora seja importante não assumir demais: pessoas deixam projetos, e às vezes é mais seguro ser metódico quanto ao motivo de o código ter sido escrito de determinada maneira.

A maior parte da documentação de referência, mesmo quando fornecida separadamente do código, é gerada a partir dos comentários dentro da própria base de código (como deve ser; a documentação de referência deve ter **fonte única** sempre que possível).  

Algumas linguagens, como Java ou Python, possuem frameworks específicos de comentários (Javadoc, PyDoc, GoDoc) projetados para facilitar a geração dessa documentação de referência. Outras linguagens, como C++, não possuem uma implementação padrão de “documentação de referência”, mas, como o C++ separa a interface da implementação (em arquivos `.h` e `.cc`), os arquivos de cabeçalho costumam ser o local natural para documentar uma API em C++.

O Google adota essa abordagem: uma API em C++ deve ter sua documentação de referência localizada dentro do arquivo de cabeçalho. Outras documentações de referência também são incorporadas diretamente ao código-fonte em Java, Python e Go.  

Como o **Code Search** do Google é tão robusto, descobrimos que há pouco benefício em fornecer documentação de referência gerada separadamente. Usuários do Code Search não apenas encontram código facilmente, mas normalmente veem a definição original como o principal resultado. Ter a documentação ao lado das definições do código também facilita sua descoberta e manutenção.

Todos sabemos que comentários de código são essenciais para uma API bem documentada. Mas o que exatamente é um “bom” comentário?  

Mais cedo neste capítulo, identificamos dois públicos principais para a documentação de referência: **buscadores** e **exploradores**. Buscadores sabem o que querem; exploradores não.  

O benefício principal para os buscadores é uma base de código com comentários consistentes, permitindo que eles analisem rapidamente uma API e encontrem o que procuram. Já para os exploradores, o benefício é identificar claramente o propósito de uma API, muitas vezes no topo do arquivo de cabeçalho.  

A seguir, veremos alguns exemplos de comentários de código. As diretrizes de comentários que seguem se aplicam a C++, mas regras semelhantes existem no Google para outras linguagens.

---

#### Comentários de Arquivo

Quase todos os arquivos de código no Google devem conter um comentário de arquivo. (Alguns arquivos de cabeçalho que contêm apenas uma função utilitária, por exemplo, podem fugir desse padrão.)  

Os comentários de arquivo devem começar com um cabeçalho no seguinte formato:

```cpp
// -----------------------------------------------------------------------------
// str_cat.h
// -----------------------------------------------------------------------------
//
// Este arquivo de cabeçalho contém funções para concatenar e anexar
// strings de forma eficiente: StrCat() e StrAppend(). A maior parte do
// trabalho nessas rotinas é realizada por meio do uso de um tipo especial,
// AlphaNum, projetado para ser usado como tipo de parâmetro que gerencia
// eficientemente a conversão para strings e evita cópias nas operações acima.
```

De modo geral, um comentário de arquivo deve começar com um esboço do que está contido no código que você está lendo.  
Ele deve identificar os principais casos de uso e o público-alvo do código (no exemplo anterior, desenvolvedores que desejam concatenar strings).  

Qualquer API que não possa ser descrita de forma concisa no primeiro ou segundo parágrafo geralmente é um sinal de que a API não foi bem planejada.  
Nesses casos, considere dividir a API em componentes separados.

---

#### Comentários de Classe

A maioria das linguagens modernas de programação é orientada a objetos.  
Por isso, os **comentários de classe** são importantes para definir os “objetos” de API em uso dentro de uma base de código.  

Todas as classes públicas (e structs) no Google devem conter um comentário descrevendo a classe/struct, os métodos importantes dessa classe e o propósito da classe.  

De modo geral, os comentários de classe devem ser escritos com foco em substantivos, enfatizando o aspecto de objeto.  
Ou seja, algo como:  
> “A classe Foo contém x, y, z, permite que você faça Bar e possui os seguintes aspectos Baz.”

Os comentários de classe devem geralmente começar com um comentário no seguinte formato:

```cpp
// -----------------------------------------------------------------------------
// AlphaNum
// -----------------------------------------------------------------------------
//
// A classe AlphaNum atua como o principal tipo de parâmetro para StrCat()
// e StrAppend(), fornecendo conversão eficiente de valores numéricos,
// booleanos e hexadecimais (por meio do tipo Hex) em strings.
```

#### Function comments

All free functions, or public methods of a class, at Google must also contain a function comment describing what the function does. Function comments should stress the active nature of their use, beginning with an indicative verb describing what the function does and what is returned.

Function comments should generally begin with a comment of the following form:

```cpp
// StrCat()
//
// Merges the given strings or numbers, using no delimiter(s),
// returning the merged result as a string.
````

Observe que iniciar um comentário de função com um verbo declarativo introduz consistência em todo o arquivo de cabeçalho.  
Um buscador pode rapidamente percorrer uma API e ler apenas o verbo para ter uma ideia se a função é apropriada: “Une, Deleta, Cria”, e assim por diante.

Alguns estilos de documentação (e alguns geradores de documentação) exigem várias formas de boilerplate em comentários de função, como "Retorna:", "Lança:", etc., mas no Google não consideramos isso necessário.  
Frequentemente, é mais claro apresentar essas informações em um único comentário em prosa, sem seções artificiais:

```cpp
// Cria um novo registro para um cliente com o nome e endereço fornecidos,
// e retorna o ID do registro, ou lança `DuplicateEntryError` se um
// registro com esse nome já existir.
int AddCustomer(string name, string address);
````

Observe como a pós-condição, os parâmetros, o valor de retorno e os casos excepcionais são naturalmente documentados juntos (neste caso, em uma única frase), porque eles não são independentes uns dos outros. Adicionar seções explícitas de boilerplate tornaria o comentário mais verboso e repetitivo, mas não mais claro (e possivelmente menos claro).

---

### Design Docs

A maioria das equipes no Google exige um **documento de design aprovado** antes de iniciar qualquer projeto importante.  
Um engenheiro de software geralmente escreve o documento de design proposto usando um **modelo de design doc** específico aprovado pela equipe.  

Esses documentos são projetados para serem colaborativos, portanto, frequentemente são compartilhados no Google Docs, que possui boas ferramentas de colaboração.  
Algumas equipes exigem que esses documentos de design sejam discutidos e debatidos em reuniões específicas, onde os detalhes do design podem ser analisados ou criticados por especialistas.  
Sob certos aspectos, essas discussões de design atuam como uma forma de revisão de código antes que qualquer código seja escrito.

Como o desenvolvimento de um documento de design é um dos primeiros processos que um engenheiro realiza antes de implantar um novo sistema, ele também é um local conveniente para garantir que várias preocupações sejam abordadas.  
Os **modelos de design doc canônicos** no Google exigem que os engenheiros considerem aspectos do design, como implicações de segurança, internacionalização, requisitos de armazenamento e preocupações de privacidade, entre outros.  
Na maioria dos casos, essas partes do design doc são revisadas por especialistas nesses domínios.

Um bom documento de design deve cobrir os objetivos do design, a estratégia de implementação e propor decisões-chave de design com ênfase em seus trade-offs individuais.  
Os melhores documentos de design sugerem objetivos de design e apresentam designs alternativos, destacando seus pontos fortes e fracos.

Um bom documento de design, uma vez aprovado, atua não apenas como registro histórico, mas também como medida de sucesso do projeto em atingir seus objetivos.  
A maioria das equipes arquiva seus documentos de design em local apropriado dentro dos documentos da equipe para revisão futura.  
Frequentemente, é útil revisar um documento de design antes do lançamento de um produto para garantir que os objetivos declarados quando o documento foi escrito ainda correspondam aos objetivos no lançamento (e, se não corresponderem, ajustar o documento ou o produto conforme necessário).

---

### Tutorials

Todo engenheiro de software, ao ingressar em uma nova equipe, quer se atualizar o mais rápido possível.  
Ter um **tutorial** que guie alguém na configuração de um novo projeto é inestimável; o “Hello World” se estabeleceu como uma das melhores formas de garantir que todos os membros da equipe comecem bem.  
Isso se aplica tanto a documentos quanto a código. A maioria dos projetos merece um documento “Hello World” que não presume nada e faz o engenheiro criar algo “real”.

Frequentemente, o melhor momento para escrever um tutorial, caso ainda não exista, é quando você entra em uma equipe.  
(E também é o melhor momento para encontrar bugs em qualquer tutorial existente que você esteja seguindo.)  
Pegue um bloco de notas ou outro meio para anotações e escreva tudo o que precisa ser feito ao longo do caminho, assumindo nenhum conhecimento prévio ou restrições especiais de configuração; depois de terminar, você provavelmente saberá quais erros cometeu durante o processo — e por quê — e poderá editar os passos para criar um tutorial mais enxuto.  

É importante: escreva tudo o que precisa ser feito ao longo do caminho; tente não assumir nenhuma configuração, permissão ou conhecimento do domínio específico.  
Se for necessário assumir alguma configuração, declare isso claramente no início do tutorial como pré-requisito.

A maioria dos tutoriais exige a execução de vários passos em ordem.  
Nesses casos, numere os passos explicitamente.  
Se o foco do tutorial for o usuário (por exemplo, documentação para desenvolvedores externos), numere cada ação que o usuário precisa realizar.  
Não numere ações que o sistema possa executar em resposta às ações do usuário.  
É **crítico e importante** numerar explicitamente cada passo ao fazer isso.  
Nada é mais frustrante do que um erro no passo 4 porque você esqueceu de instruir alguém a autorizar corretamente seu nome de usuário, por exemplo.

---

#### Exemplo: Um tutorial ruim

1. Baixe o pacote do nosso servidor em <http://example.com>  
2. Copie o script shell para seu diretório home  
3. Execute o script shell  
4. O sistema foobar comunicará com o sistema de autenticação  
5. Uma vez autenticado, o foobar iniciará um novo banco de dados chamado “baz”  
6. Teste “baz” executando um comando SQL no terminal  
7. Digite: CREATE DATABASE my_foobar_db;

Nos passos acima, 4 e 5 acontecem no servidor. Não está claro se o usuário precisa fazer algo, mas ele não precisa, então esses efeitos podem ser mencionados como parte do passo 3.  
Além disso, não está claro se o passo 6 e 7 são diferentes. (Não são.)  
Combine todas as operações atômicas do usuário em passos únicos para que o usuário saiba que precisa agir em cada passo.  
Além disso, se o tutorial tiver entrada ou saída visível para o usuário, denote isso em linhas separadas (geralmente usando fonte monoespaçada em negrito).

---

#### Exemplo: Um tutorial ruim melhorado

1. Baixe o pacote do nosso servidor em <http://example.com>:

```bash
curl -I http://example.com
```

2. Copie o script shell para seu diretório home:

```bash
$ cp foobar.sh ~
```

3. Execute o script shell no seu diretório home:

```bash
$ cd ~; foobar.sh
```

O sistema foobar se comunicará primeiro com o sistema de autenticação.
Uma vez autenticado, o foobar iniciará um novo banco de dados chamado “baz” e abrirá um shell de entrada.

4. Teste “baz” executando um comando SQL no terminal:

```bash
baz:$ CREATE DATABASE my_foobar_db;
```

Observe como cada passo requer intervenção específica do usuário.
Se, em vez disso, o tutorial tivesse foco em outro aspecto (por exemplo, um documento sobre a “vida de um servidor”), numere os passos do ponto de vista desse foco (o que o servidor faz).

### Documentação conceitual

Algum código requer explicações ou insights mais profundos do que podem ser obtidos apenas lendo a documentação de referência.  
Nesses casos, precisamos de **documentação conceitual** para fornecer visões gerais das APIs ou sistemas.  
Alguns exemplos de documentação conceitual podem ser uma visão geral de uma biblioteca para uma API popular, um documento descrevendo o ciclo de vida de dados dentro de um servidor, e assim por diante.  

Em quase todos os casos, um documento conceitual serve para **complementar**, não substituir, um conjunto de documentação de referência.  
Frequentemente, isso leva à duplicação de algumas informações, mas com um propósito: promover clareza.  
Nesses casos, não é necessário que um documento conceitual cubra todos os casos extremos (embora uma referência deva cobrir esses casos religiosamente).  
Neste caso, sacrificar um pouco de precisão é aceitável para garantir clareza. O objetivo principal de um documento conceitual é transmitir compreensão.

Documentos de “conceito” são as formas mais difíceis de documentação para escrever.  
Como resultado, eles frequentemente são os tipos mais negligenciados dentro da caixa de ferramentas de um engenheiro de software.  

Um problema que os engenheiros enfrentam ao escrever documentação conceitual é que ela muitas vezes não pode ser incorporada diretamente no código-fonte porque não existe um local canônico para colocá-la.  
Algumas APIs têm uma superfície de API relativamente ampla, nesse caso, um **comentário de arquivo** pode ser um lugar apropriado para uma explicação “conceitual” da API.  
Mas frequentemente, uma API funciona em conjunto com outras APIs e/ou módulos.  
O único local lógico para documentar tal comportamento complexo é por meio de um documento conceitual separado.  
Se comentários são os testes unitários da documentação, os documentos conceituais são os testes de integração.

Mesmo quando uma API é adequadamente delimitada, muitas vezes faz sentido fornecer um documento conceitual separado.  
Por exemplo, a biblioteca StrFormat da Abseil cobre uma variedade de conceitos que usuários experientes da API devem compreender.  
Nesses casos, tanto interna quanto externamente, fornecemos um documento de conceitos de formatação.

Um documento conceitual precisa ser útil para um público amplo: tanto especialistas quanto iniciantes.  
Além disso, precisa enfatizar clareza, portanto, frequentemente precisa sacrificar **completude** (algo melhor reservado para referência) e (às vezes) precisão estrita.  
Isso não significa que um documento conceitual deve ser intencionalmente impreciso; apenas que deve focar no uso comum e deixar usos raros ou efeitos colaterais para a documentação de referência.

---

### Landing Pages

A maioria dos engenheiros faz parte de uma equipe, e a maioria das equipes possui uma **“página da equipe”** em algum lugar da intranet da empresa.  
Frequentemente, esses sites são um pouco desorganizados: uma página de entrada típica pode conter links interessantes, às vezes vários documentos intitulados “leia isto primeiro!”, e algumas informações tanto para a equipe quanto para seus clientes.  

Esses documentos começam úteis, mas rapidamente se tornam desastres; como se tornam difíceis de manter, eventualmente se tornam tão obsoletos que só serão atualizados pelos corajosos ou desesperados.

Felizmente, tais documentos parecem intimidantes, mas na verdade são simples de corrigir: **garanta que a página de entrada identifique claramente seu propósito** e inclua apenas links para outras páginas com mais informações.  
Se algo em uma landing page estiver fazendo mais do que direcionar o tráfego, não está cumprindo sua função.  
Se você tiver um documento de configuração separado, linke para ele a partir da landing page como um documento separado.  
Se houver links demais na página de entrada (sua página não deve rolar por várias telas), considere dividir as páginas por taxonomia, em diferentes seções.

A maioria das landing pages mal configuradas serve a dois propósitos diferentes:  

1. São a página “goto” para alguém que é usuário do seu produto ou API.  
2. São a página inicial de uma equipe.  

Não faça a página servir a ambos os propósitos — ficará confusa.  
Crie uma página de equipe separada como uma página interna, distinta da landing page principal.  
O que a equipe precisa saber frequentemente difere do que um cliente da sua API precisa saber.

---

### Documentation Reviews

No Google, todo código precisa ser revisado, e nosso processo de revisão de código é bem entendido e aceito.  
Em geral, a documentação também precisa de revisão (embora isso seja menos universalmente aceito).  
Se você quiser “testar” se sua documentação funciona, deve geralmente ter outra pessoa para revisá-la.

Um documento técnico se beneficia de três tipos diferentes de revisão, cada um enfatizando aspectos diferentes:

1. **Revisão técnica**, para precisão.  
   Normalmente feita por um especialista no assunto, muitas vezes outro membro da equipe.  
   Frequentemente, isso é parte da própria revisão de código.

2. **Revisão de audiência**, para clareza.  
   Geralmente feita por alguém não familiarizado com o domínio.  
   Pode ser alguém novo na equipe ou um cliente da API.

3. **Revisão de escrita**, para consistência.  
   Geralmente feita por um redator técnico ou voluntário.

Claro, algumas dessas linhas às vezes se confundem, mas se o seu documento for de alto perfil ou possa ser publicado externamente, você provavelmente quer garantir que ele receba mais tipos de revisão.  
Qualquer documento tende a se beneficiar das revisões mencionadas, mesmo que algumas delas sejam ad hoc.  
Dito isso, mesmo conseguir que apenas um revisor revise seu texto é preferível a não ter ninguém revisando.

Importante: se a documentação estiver integrada ao fluxo de trabalho de engenharia, frequentemente melhorará ao longo do tempo.  
A maioria dos documentos no Google agora passa implicitamente por uma revisão de audiência porque, em algum momento, seu público os usará e, esperamos, informará quando não estiverem funcionando (via bugs ou outras formas de feedback).

> ### Case Study: The Developer Guide Library
>
> Como mencionado anteriormente, havia problemas associados a ter a maior parte (quase toda) da documentação de engenharia contida em um wiki compartilhado: pouca propriedade da documentação importante, documentação concorrente, informações obsoletas e dificuldade em registrar bugs ou problemas na documentação.  
> Mas esse problema não era observado em alguns documentos: o guia de estilo C++ do Google era mantido por um grupo seleto de engenheiros seniores (árbitros de estilo) que o gerenciavam.  
> O documento era mantido em bom estado porque certas pessoas se importavam com ele. Elas implicitamente possuíam aquele documento.  
> O documento também era canônico: havia apenas um guia de estilo C++.
>
> Como mencionado anteriormente, a documentação que fica diretamente no código-fonte é uma forma de promover o estabelecimento de documentos canônicos; se a documentação estiver ao lado do código-fonte, geralmente deve ser a mais aplicável (esperançosamente).  
> No Google, cada API geralmente possui um diretório g3doc separado onde esses documentos residem (escritos como arquivos Markdown e legíveis em nosso navegador Code Search).  
> Ter a documentação junto ao código-fonte não apenas estabelece propriedade de fato, mas faz com que a documentação pareça mais “parte” do código.
>
> Alguns conjuntos de documentação, no entanto, não podem existir de forma lógica dentro do código-fonte.  
> Um “guia do desenvolvedor C++” para Googlers, por exemplo, não possui um local óbvio no código-fonte.  
> Não há um diretório mestre “C++” onde as pessoas procurariam essas informações.  
> Nesse caso (e em outros que cruzam limites de API), tornou-se útil criar conjuntos de documentação independentes em seu próprio depósito.  
> Muitos desses conjuntos reuniam documentos existentes associados em um conjunto comum, com navegação e aparência unificadas.  
> Tais documentos eram identificados como “Developer Guides” e, como o código no repositório, estavam sob controle de versão em um depósito de documentação específico, organizado por tópico em vez de API.  
> Frequentemente, redatores técnicos gerenciavam esses guias de desenvolvedores, pois eram melhores em explicar tópicos que cruzavam limites de API.
>
> Com o tempo, esses guias de desenvolvedores se tornaram canônicos.  
> Usuários que escreviam documentos concorrentes ou suplementares passaram a aceitar adicionar seus documentos ao conjunto canônico após ele ser estabelecido, e então descontinuar seus documentos concorrentes.  
> Eventualmente, o guia de estilo C++ tornou-se parte de um “Guia do Desenvolvedor C++” maior.  
> À medida que o conjunto de documentação se tornava mais abrangente e autoritativo, sua qualidade também melhorava.  
> Engenheiros começaram a registrar bugs porque sabiam que alguém estava mantendo esses documentos.  
> Como os documentos estavam bloqueados sob controle de versão, com proprietários adequados, os engenheiros também começaram a enviar changelists diretamente para os redatores técnicos.
>
> A introdução de links go/ (ver Knowledge Sharing) permitiu que a maioria dos documentos, de fato, se estabelecesse mais facilmente como canônicos sobre qualquer tópico.  
> Nosso Guia do Desenvolvedor C++ foi estabelecido em “go/cpp”, por exemplo.  
> Com melhor busca interna, links go/ e integração de múltiplos documentos em um conjunto comum de documentação, tais conjuntos de documentação canônicos se tornaram mais autoritativos e robustos ao longo do tempo.

### Documentation Philosophy

Aviso: a seção a seguir é mais um tratado sobre melhores práticas de escrita técnica (e opinião pessoal) do que “como o Google faz”.  
Considere-a opcional para que engenheiros de software compreendam totalmente, embora entender esses conceitos provavelmente permita escrever informações técnicas com mais facilidade.

#### WHO, WHAT, WHEN, WHERE, and WHY

A maior parte da documentação técnica responde à pergunta “HOW”.  
Como isso funciona? Como programar para esta API? Como configurar este servidor?  
Como resultado, há uma tendência de os engenheiros de software pularem direto para o “HOW” em qualquer documento e ignorarem as outras questões associadas: WHO, WHAT, WHEN, WHERE e WHY.  

É verdade que nenhuma dessas perguntas é geralmente tão importante quanto o HOW — um documento de design é exceção porque um aspecto equivalente é frequentemente o WHY — mas sem uma estrutura adequada, a documentação acaba confusa.  
Tente abordar as outras perguntas nos dois primeiros parágrafos de qualquer documento:

- **WHO** já foi discutido anteriormente: é o público-alvo. Mas às vezes também é necessário explicitar e direcionar o público em um documento.  
Exemplo: “Este documento é para novos engenheiros no projeto Secret Wizard.”

- **WHAT** identifica o propósito do documento: “Este documento é um tutorial para iniciar um servidor Frobber em um ambiente de teste.”  
Às vezes, apenas escrever o WHAT ajuda a estruturar o documento corretamente.  
Se você começar a adicionar informações que não se aplicam ao WHAT, talvez queira mover essas informações para outro documento.

- **WHEN** identifica quando o documento foi criado, revisado ou atualizado.  
Documentos no código-fonte têm essa data registrada implicitamente, e alguns outros esquemas de publicação automatizam isso.  
Caso contrário, certifique-se de anotar a data em que o documento foi escrito (ou revisado) no próprio documento.

- **WHERE** é frequentemente implícito, mas decida onde o documento deve residir.  
Normalmente, a preferência deve ser algum tipo de controle de versão, idealmente com o código-fonte que ele documenta.  
Outros formatos funcionam para diferentes propósitos também.  
No Google, frequentemente usamos Google Docs para colaboração fácil, particularmente em questões de design.  
Em algum momento, qualquer documento compartilhado se torna menos uma discussão e mais um registro histórico estável.  
Nesse ponto, mova-o para um local mais permanente, com propriedade clara, controle de versão e responsabilidade.

- **WHY** estabelece o propósito do documento.  
Resuma o que você espera que alguém absorva após lê-lo.  
Uma boa regra prática é estabelecer o WHY na introdução do documento.  
Ao escrever o resumo, verifique se você atingiu suas expectativas originais (e revise conforme necessário).

#### The Beginning, Middle, and End

Todos os documentos — de fato, todas as partes dos documentos — têm começo, meio e fim.  
Embora pareça óbvio, a maioria dos documentos deve ter, no mínimo, essas três seções.  
Um documento com apenas uma seção tem apenas uma coisa a dizer, e muito poucos documentos têm apenas uma coisa a dizer.  
Não tenha medo de adicionar seções ao seu documento; elas dividem o fluxo em partes lógicas e fornecem ao leitor um roteiro do que o documento cobre.

Mesmo o documento mais simples geralmente tem mais de uma coisa a dizer.  
Nossos populares “C++ Tips of the Week” tradicionalmente eram muito curtos, focando em um pequeno conselho.  
Mesmo assim, ter seções ajuda.  
Tradicionalmente, a primeira seção descreve o problema, a seção do meio aborda as soluções recomendadas e a conclusão resume os pontos principais.  
Se o documento tivesse apenas uma seção, alguns leitores teriam dificuldade em extrair os pontos importantes.

A maioria dos engenheiros detesta redundância, e com razão.  
Mas na documentação, a redundância é frequentemente útil.  
Um ponto importante escondido em um bloco de texto pode ser difícil de lembrar ou identificar.  
Por outro lado, colocar esse ponto em um local mais proeminente cedo pode fazer perder o contexto fornecido depois.  
Geralmente, a solução é introduzir e resumir o ponto em um parágrafo introdutório, e então usar o restante da seção para detalhar melhor.  
Nesse caso, a redundância ajuda o leitor a compreender a importância do que está sendo declarado.

#### The Parameters of Good Documentation

Normalmente, existem três aspectos de uma boa documentação: **completude, precisão e clareza**.  
Raramente se obtém os três em um mesmo documento; ao tentar tornar um documento mais “completo”, por exemplo, a clareza pode sofrer.  
Se você tentar documentar todos os possíveis casos de uso de uma API, pode acabar com um conteúdo incompreensível.  
Para linguagens de programação, ser totalmente preciso em todos os casos (e documentar todos os possíveis efeitos colaterais) também pode afetar a clareza.  
Para outros documentos, tentar ser claro sobre um tópico complicado pode afetar sutilmente a precisão; você pode decidir ignorar alguns efeitos colaterais raros em um documento conceitual, por exemplo, porque o objetivo é familiarizar alguém com o uso da API, não fornecer uma visão dogmática de todo comportamento previsto.

Em cada caso, um “bom documento” é definido como aquele que está cumprindo seu propósito.  
Portanto, raramente você quer que um documento desempenhe mais de uma função.  
Para cada documento (e tipo de documento), defina seu foco e ajuste a escrita adequadamente.  
Escrevendo um documento conceitual? Provavelmente não precisa cobrir toda a API.  
Escrevendo uma referência? Provavelmente deseja ser completo, mas talvez precise sacrificar alguma clareza.  
Escrevendo uma landing page? Foque na organização e mantenha a discussão mínima.  
Tudo isso contribui para a **qualidade**, que é notoriamente difícil de medir com precisão.

Como melhorar rapidamente a qualidade de um documento?  
Foque nas necessidades do público. Frequentemente, menos é mais.  
Por exemplo, um erro comum é adicionar decisões de design ou detalhes de implementação a um documento de API.  
Assim como você deveria separar idealmente a interface da implementação em uma API bem projetada, evite discutir decisões de design em um documento de API.  
Os usuários não precisam dessa informação.  
Coloque essas decisões em um documento especializado para esse propósito (geralmente um design doc).

#### Deprecating Documents

Assim como código antigo pode causar problemas, documentos antigos também.  
Com o tempo, documentos ficam obsoletos, desatualizados ou (frequentemente) abandonados.  
Evite ao máximo documentos abandonados, mas quando um documento não tiver mais utilidade, remova-o ou identifique-o como obsoleto (e, se possível, indique onde encontrar novas informações).  
Mesmo para documentos sem proprietário, adicionar uma nota como “Isso não funciona mais!” é mais útil do que não dizer nada e deixar algo que parece autoritativo, mas não funciona mais.

No Google, frequentemente anexamos “datas de atualização” à documentação.  
Esses documentos registram a última vez que foram revisados, e os metadados do conjunto de documentação enviam lembretes por e-mail quando o documento não é tocado, por exemplo, em três meses.  
Tais datas de atualização — e o acompanhamento dos documentos como bugs — ajudam a tornar o conjunto de documentação mais fácil de manter ao longo do tempo, que é a principal preocupação de um documento:
```html
<!--*
# Document freshness: For more information, see go/fresh-source.
freshness: { owner: `username` reviewed: '2019-02-27' }
*-->
```

Usuários que possuem tal documento têm um incentivo para manter a data de atualização em dia (e, se o documento estiver sob controle de versão, isso exige uma revisão de código).  
Como resultado, é um meio de baixo custo para garantir que um documento seja revisado de tempos em tempos.  
No Google, descobrimos que incluir o proprietário de um documento nessa data de atualização dentro do próprio documento, com uma linha “Última revisão por...”, aumentava também a adoção.

### Quando você precisa de redatores técnicos?

Quando o Google era jovem e estava em crescimento, não havia redatores técnicos suficientes na engenharia de software. (Isso ainda é verdade.)  
Projetos considerados importantes tendiam a receber um redator técnico, independentemente de a equipe realmente precisar de um.  
A ideia era que o redator pudesse aliviar a equipe do fardo de escrever e manter documentos e (teoricamente) permitir que o projeto importante atingisse maior velocidade.  
Isso se mostrou uma suposição equivocada.

Aprendemos que a maioria das equipes de engenharia pode escrever documentação para si mesmas (sua própria equipe) perfeitamente; é apenas quando escrevem para outro público que tendem a precisar de ajuda, porque é difícil escrever para outro público.  
O ciclo de feedback dentro da sua equipe sobre documentos é mais imediato, o conhecimento do domínio e as suposições são mais claros, e as necessidades percebidas são mais óbvias.  
Claro, um redator técnico pode muitas vezes fazer um trabalho melhor com gramática e organização, mas apoiar uma única equipe não é o melhor uso de um recurso limitado e especializado; isso não escala.  
Isso introduziu um incentivo perverso: torne-se um projeto importante e seus engenheiros de software não precisarão escrever documentos.  
Desencorajar engenheiros a escrever documentos é o oposto do que se deseja.

Como são um recurso limitado, os redatores técnicos devem geralmente focar em tarefas que os engenheiros de software não precisam fazer como parte de suas funções normais.  
Normalmente, isso envolve escrever documentos que cruzem fronteiras de API.  
O Projeto Foo pode saber claramente qual documentação o Projeto Foo precisa, mas provavelmente tem uma ideia menos clara do que o Projeto Bar precisa.  
Um redator técnico é mais capaz de se colocar como alguém não familiarizado com o domínio.  
De fato, esse é um dos papéis críticos: desafiar as suposições que sua equipe faz sobre a utilidade do projeto.  
Essa é uma das razões pelas quais muitos, senão a maioria, dos redatores técnicos em engenharia de software tendem a focar nesse tipo específico de documentação de API.

### Conclusão

O Google avançou significativamente na qualidade da documentação na última década, mas, para ser franco, a documentação no Google ainda não é tratada como um cidadão de primeira classe.  
Para comparação, os engenheiros gradualmente aceitaram que testes são necessários para qualquer mudança de código, não importa o quão pequena.  
Além disso, as ferramentas de teste são robustas, variadas e integradas ao fluxo de trabalho de engenharia em vários pontos.  
A documentação não está enraizada no mesmo nível.

Para ser justo, não há necessariamente a mesma necessidade de abordar documentação como nos testes.  
Os testes podem ser atômicos (testes unitários) e seguir forma e função prescritas.  
Os documentos, em sua maior parte, não podem.  
Os testes podem ser automatizados, e esquemas para automatizar documentação geralmente são escassos.  
Os documentos são necessariamente subjetivos; a qualidade é medida não pelo escritor, mas pelo leitor, muitas vezes de forma assíncrona.  
Dito isso, há reconhecimento de que a documentação é importante, e os processos em torno do desenvolvimento de documentos estão melhorando.  
Na opinião deste autor, a qualidade da documentação no Google é melhor do que na maioria das empresas de engenharia de software.

Para mudar a qualidade da documentação de engenharia, os engenheiros — e toda a organização de engenharia — precisam aceitar que são tanto o problema quanto a solução.  
Em vez de se desesperarem com o estado da documentação, precisam perceber que produzir documentação de qualidade faz parte do trabalho e economiza tempo e esforço a longo prazo.  
Para qualquer código que se espera que viva mais de alguns meses, os ciclos extras investidos em documentar esse código não apenas ajudarão outros, mas também ajudarão você a mantê-lo.

### TL;DRs

- A documentação é extremamente importante ao longo do tempo e da escala.  
- Alterações na documentação devem aproveitar o fluxo de trabalho existente do desenvolvedor.  
- Mantenha os documentos focados em um único propósito.  
- Escreva para seu público, não para você.  
---
1. Você precisará mantê-lo e revisá-lo ocasionalmente.  
2. O inglês ainda é a língua principal para a maioria dos programadores, e a maior parte da documentação técnica para programadores depende do entendimento do inglês.  
3. Quando descontinuamos o GooWiki, descobrimos que cerca de 90% dos documentos não tinham visualizações ou atualizações nos últimos meses.

Artigo original em: https://abseil.io/resources/swe-book/html/ch10.html
