---
path: hyperapp-mobile-php
date: 2025-04-01T19:16:32.171Z
title: "HyperApp: Crie Aplicativos Mobile com PHP 8.3 e Swoole"
---
Se você é desenvolvedor e achava que já tinha visto de tudo, apresentamos o **HyperApp**: o primeiro framework para criação de aplicativos mobile nativos usando **PHP 8.3** com **Swoole**. Isso mesmo. Mobile. Em PHP.

Cansou de Flutter? React Native parece complicado demais? Kotlin não tem "alma"? Então vem com a gente nessa nova jornada onde **a linguagem do backend se torna a linguagem da interface gráfica do seu celular**.

## Por que HyperApp?

* Porque PHP roda em qualquer lugar e qualquer sobrinho pode fazer.
* Porque Swoole é rápido. Tipo... MUITO rápido.
* Porque construir UI com `echo` é subestimado.
* Porque sim.

- - -

## Instalação

```shell
composer create-project hyperapp/hyperapp
```

Isso vai gerar a estrutura básica do seu app mobile com suporte a hot reload via `php -S`, e integração nativa com o seu simulador de Nokia 1100.

- - -

## Criando um componente

```phtml
class Button extends HyperComponent {
    public function render() {
        return <<<HTML
            <button onclick="{$this->props['onClick']}">
                {$this->props['label']}
            </button>
        HTML;
    }
}
```

Simples, direto e puramente declarativo. Literalmente.

- - -

## Estado global estilo Redux (mas em PHP!)

```php
use HyperApp\State;

State::set('counter', 0);

function increment() {
    State::update('counter', fn($value) => $value + 1);
}
```

Gerenciado 100% via array global. O que pode dar errado?

- - -

## Ciclo de Vida do App

```php
class App extends HyperApp {
    public function boot() {
        Log::info("🔥 Aplicativo iniciado com HyperApp");
    }
}
```

- - -

## Estilização moderna com arrays associativos

```php
Style::add('button', [
    'background' => 'linear-gradient(to right, #8e2de2, #4a00e0)',
    'color' => '#fff',
    'padding' => '12px',
]);
```

Quem precisa de CSS quando se tem `Style::add()`?

- - -

## Build e Publicação

```shell
php hyperapp:build --platform=android
```

Isso gera um APK 100% funcional com FFI embutido, Swoole otimizado e suporte a `var_dump` em tempo real.

- - -

## Conclusão

O HyperApp é a prova definitiva de que, com um pouco de coragem (e falta de noção), tudo é possível com PHP.

Se você chegou até aqui achando que isso é real... bom, **feliz 1º de abril**. 😄

Mas convenhamos: parte de você gostaria de testar isso, não é?

**\#PHP83 #Swoole #HyperApp #MobileEmPHP #1DeAbril**