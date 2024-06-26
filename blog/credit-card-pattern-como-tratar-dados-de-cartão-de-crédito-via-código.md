---
path: credit-card-pattern
date: 2024-05-29T12:40:04.082Z
title: Credit Card Pattern, como tratar dados de cartão de crédito via código
---
A internet está repleta de ecommerces, marketplaces e shoppings, e para cada um desses produtos existem diversas formas de pagamento, componentes, integrações, checkouts, etc. No entanto, recentemente vi um problema simples com o tratamento de dados de cartão se repetir, por isso resolvi trazer neste artigo algumas soluções para o tratamento desse tipo de dado.

Antes de começarmos a falar de código, preciso deixar algo claro. Dados de cartão são extremamente sensíveis e perigosos; manipulá-los é como manipular lixo radioativo: se não tiver cuidado, você pode se contaminar e contaminar toda a organização ao seu redor. Por isso, é importante se familiarizar com o termo [PCI](https://listings.pcisecuritystandards.org/documents/PCI_DSS-QRG-v3_2_1.pdf), que traz um padrão para manipular e armazenar dados de cartão.

Como já existe um padrão para segurança e manipulação dos dados, não vou ser repetitivo nesse tema. Coisas como salvar os dados com criptografia, controle do fluxo dos dados, etc., já estão documentadas no manual.

Neste artigo, vamos falar sobre como lidar com os valores no código.

## Tudo é string

Como não existe operação matemática, dados como bin (primeiros 6 dígitos), last four (últimos 4 dígitos), cvv e o próprio número do cartão devem ser manipulados como string. Até a data de expiração deve ser manipulada como string, para evitar situações como os exemplos a seguir:

### CVV, last four, bin ou número do cartão com zero no início

![](/assets/example-1.png)

Criar esses dados como inteiros vai te forçar a tratar casos onde o número de caracteres é menor que o esperado, forçando a inferir que existem zeros no início. Em computação, inferir nunca é bom.

### O terrível dia 29 para o valid thru

![](/assets/example-2.png)

O tratamento correto desses dados facilita a manutenção e evita bugs em produção.

## Conclusão

A manipulação correta de dados sensíveis como informações de cartão de crédito é essencial para garantir a segurança e integridade dos sistemas que lidam com esses dados. Seguir padrões como o PCI DSS é fundamental para minimizar riscos e evitar consequências negativas. Além disso, tratar esses dados como strings e estar atento a detalhes específicos de sua manipulação no código pode prevenir problemas comuns, garantindo uma implementação mais robusta e segura. Lembre-se de que a segurança dos dados é uma responsabilidade contínua e deve ser uma prioridade em todas as fases do desenvolvimento e manutenção dos sistemas.