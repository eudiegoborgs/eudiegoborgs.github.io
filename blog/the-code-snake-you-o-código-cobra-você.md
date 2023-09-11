---
path: the-code-snake
date: 2023-08-31T12:05:45.650Z
title: The code snake you (O código cobra você)
---
Bem pessoal, não sei em que momento do futuro vocês estão lendo isso, mas no momento temporal que estou escrevendo essa brincadeira (The code snake you) ainda tem graça (ou só eu que acho engraçado mesmo).

Hoje eu quero falar com vocês sobre algumas decisões, se tratando de codificação, que podem parecer assertivas no início, mas que podem cobrar de vocês no futuro.

## Ausência de testes

Eu não poderia começar diferente né? Inicialmente a decisão de renunciar a testes unitários ou de integração pode parecer uma boa escolha, afinal de contas, você vai escrever no mínimo a metade do código para alcançar o resultado esperado.

O problema da ausência de testes, é que seu projeto cresce todos os dias e por melhor que seja sua memória, daqui a 6 meses você provavelmente não vai se lembrar com clareza de detalhes como funciona uma determinada parte do seu software e passará a correr o risco de uma alteração quebrar uma parte esquecida do seu projeto.

Softwares crescem exponencialmente e quanto mais linhas de código criadas, mais difícil se torna manter a integridade funcional de tudo, isso sem falar que na maioria das vezes o software vai ser escrito por uma equipe e outros membros escreverão códigos, muitas vezes sem seguir um mesmo padrão.

A verdade é que qualidade não tem preço, o custo de marca + custo de reparo + prejuízo de um bug encontrado em produção é muito alto. O trabalho com testes pode parecer perda de tempo no início, mas é bem possível que no futuro você se agradeça por escrever testes para cada trecho de código escrito previamente. 

## Gestão de débitos técnicos

A gestão de débitos técnicos é uma prática essencial no desenvolvimento de software, que envolve identificar, avaliar e abordar as áreas onde compromissos de qualidade foram adiados em prol da entrega rápida de funcionalidades. Como um empréstimo no mundo da engenharia de software, débitos técnicos podem acumular juros ao longo do tempo, resultando em sistemas difíceis de manter e vulneráveis a problemas. Portanto, uma gestão eficaz de débitos técnicos implica em reconhecer a importância de manter o equilíbrio entre a entrega de recursos e a qualidade do código, priorizando tarefas de refatoração e correção de forma contínua. Isso contribui para a sustentabilidade e longevidade dos sistemas, evitando custos elevados e riscos no futuro.

Aqui estão algumas técnicas e práticas para a gestão eficaz de débitos técnicos:

* **Priorização:** Identifique e classifique os débitos técnicos com base em seu impacto e urgência. Use técnicas como a matriz de priorização para determinar quais débitos devem ser abordados primeiro.  
* **Análise de Impacto:** Avalie como os débitos técnicos afetam a qualidade, a estabilidade e a manutenibilidade do sistema. Considere o potencial de interrupções futuras e problemas de escalabilidade.
* **Orçamentação de Débitos:** Reserve tempo em cada iteração ou ciclo de desenvolvimento para abordar débitos técnicos. Isso pode ser uma porcentagem fixa de recursos alocados para a melhoria contínua.
* **Refatoração Contínua:** Promova uma cultura de refatoração constante, onde os desenvolvedores são encorajados a melhorar o código à medida que trabalham nele, em vez de adiar essa atividade para o futuro.
* **Automatização de Testes:** Invista em automação de testes para garantir que as alterações de código não introduzam novos problemas ou afetem negativamente o sistema.
* **Revisões de Código:** Implemente revisões de código regulares para identificar débitos técnicos e garantir que as melhores práticas de codificação sejam seguidas.
* **Padrões de Codificação:** Estabeleça e faça cumprir padrões de codificação para manter a consistência e reduzir a introdução de débitos técnicos.
* **Monitoramento de Métricas:** Use métricas de qualidade de código, como complexidade ciclomática e cobertura de teste, para acompanhar o progresso na redução de débitos técnicos.
* **Feedback Contínuo:** Mantenha um canal de feedback aberto entre desenvolvedores e equipes de operações para identificar e resolver problemas rapidamente.
* **Treinamento e Educação:** Forneça treinamento e recursos educacionais para equipes de desenvolvimento, para que possam adotar as melhores práticas e evitar a acumulação de débitos técnicos.
* **Criação de um Plano de Redução:** Desenvolva um plano estratégico para reduzir débitos técnicos ao longo do tempo, definindo metas claras e acompanhando o progresso regularmente.
* **Comunicação Transparente:** Garanta que a gestão e os stakeholders estejam cientes dos débitos técnicos, dos esforços para reduzi-los e dos benefícios a longo prazo desse investimento.

Ao implementar essas técnicas, as organizações podem gerenciar de forma mais eficaz os débitos técnicos, melhorar a qualidade do software e reduzir os riscos associados a sistemas complexos. A gestão proativa de débitos técnicos contribui para um desenvolvimento mais sustentável e eficiente.

## Escolha de stack madura

É﻿ bem comum no dia a dia de um desenvolvedor que novas formas de fazer algo ou ferramentas surjam e acredito que um bom desenvolvedor deve buscar maneiras efetivas de testar novidades e se manter atualizado. Porém, não se testa novas formações em uma final de campeonato, da mesma forma, não se usa uma nova ferramenta em grandes projetos. O ideal é usar side projects, POC's ou projetos menores para testar alguma stack nova de forma que seu uso não atrapalhe os objetivos de sua organização.

A﻿ escolha de uma stack sem plena maturidade pode surtir o efeito contrário ao desejado. Quando escolhemos uma nova ferramenta, geralmente queremos trazer inovação e modernidade, mas a escolhe por uma stack não madura pode resultar em tantas dificuldades que por fim acabe criando resistência cultural a novidades.

## Acoplamento

O acoplamento de software é um conceito fundamental na engenharia de software que se refere à medida que as partes de um sistema estão interconectadas ou dependentes umas das outras. Um baixo acoplamento indica que os módulos ou componentes do software têm poucas dependências entre si, o que geralmente é desejável. Isso significa que as mudanças em um componente têm menos probabilidade de afetar outros, tornando o sistema mais flexível e fácil de manter. Por outro lado, um alto acoplamento implica que os componentes estão fortemente interligados, o que pode tornar o software mais difícil de modificar e testar, além de aumentar o risco de impactos indesejados em outras partes do sistema.

Para alcançar um acoplamento adequado, os princípios de design como a coesão, que indica o grau em que as responsabilidades de um módulo estão relacionadas, e a modularização, que envolve a divisão de um sistema em módulos independentes e reutilizáveis, são fundamentais. Um projeto de software bem-sucedido busca minimizar o acoplamento entre módulos, promovendo a independência e a reutilização de componentes, o que não só facilita o desenvolvimento e a manutenção, mas também contribui para sistemas mais robustos e escaláveis.

A indireção no código é uma prática que envolve a utilização de abstrações ou interfaces para ocultar detalhes de implementação, promovendo a flexibilidade e a modularidade. Isso permite que os desenvolvedores interajam com partes do sistema sem precisar conhecer todos os detalhes internos, reduzindo o acoplamento e tornando o código mais legível e fácil de manter. É uma estratégia fundamental para o design de software eficaz, tornando-o mais adaptável a mudanças futuras e promovendo a reutilização de componentes.

Suponha que você esteja construindo um sistema de pagamento com várias opções de processadores de pagamento. Você deseja implementar a capacidade de processar pagamentos de forma flexível, mas sem que o código cliente precise conhecer os detalhes de implementação de cada processador. Você pode usar interfaces para criar essa indireção:

```php
<?php
// Interface para processadores de pagamento
interface PaymentProcessor {
    public function processPayment($amount);
}

// Implementação para o A
class PaymentProcessorA implements PaymentProcessor {
    public function processPayment($amount) {
        // Lógica de processamento para o A
        echo "Pagamento de $amount via A.\n";
    }
}

// Implementação para o B
class PaymentProcessorB implements PaymentProcessor {
    public function processPayment($amount) {
        // Lógica de processamento para o B
        echo "Pagamento de $amount via B.\n";
    }
}

// Cliente
// Usando injeção de dependencias [https://en.wikipedia.org/wiki/Dependency_injection]
function checkout(PaymentProcessor $processor, $amount) {
    $processor->processPayment($amount);
}

// Uso do código cliente
$processorA = new PaymentProcessorA();
$processorB = new PaymentProcessorB();

checkout($processorA, 100);
checkout($processorB, 50);
```

﻿Nesse exemplo, a indireção é alcançada por meio da interface `PaymentProcessor`. Os métodos `processPayment` são implementados de forma específica para o A e o B, mas o código cliente que chama a função `checkout` não precisa saber como cada processador de pagamento funciona internamente. Isso torna o sistema mais flexível, pois você pode adicionar novos processadores de pagamento sem afetar o código cliente existente.

# Conclusão

Neste artigo, exploramos algumas decisões críticas relacionadas à codificação e ao desenvolvimento de software que podem impactar profundamente a qualidade, a manutenibilidade e a escalabilidade de um projeto. Primeiramente, destacamos a importância de implementar testes, salientando como a ausência de testes pode resultar em dificuldades significativas no futuro e enfatizando que a qualidade do código é um investimento que vale a pena. Em seguida, abordamos a gestão de débitos técnicos, enfatizando que compromissos de qualidade adiados podem acumular juros ao longo do tempo, tornando os sistemas difíceis de manter e vulneráveis a problemas. Apresentamos uma série de técnicas e práticas para uma gestão eficaz de débitos técnicos. Por fim, discutimos a escolha de uma stack madura e a importância do desacoplamento no código, demonstrando como a indireção pode promover a flexibilidade e a modularidade em sistemas de software. Em suma, ao tomar decisões conscientes e adotar práticas sólidas de desenvolvimento, os desenvolvedores e equipes podem construir sistemas mais robustos e sustentáveis, preparados para enfrentar os desafios do futuro.