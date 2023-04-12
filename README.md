# Bookmarklets úteis para a loja!

>Um bookmarklet é um pequeno programa em JavaScript que é armazenado como uma URL nos 'Favoritos' dos navegadores.
>
>Bookmarklets podem ser salvos e utilizados como se fossem 'Favoritos' comuns.
>
>Assim, são simples ferramentas de "um clique" que podem adicionar muitas funções para o navegador.

Fonte: [Wikipedia](https://pt.wikipedia.org/wiki/Bookmarklet)

Basicamente dá para agilizar tarefas repetitivas que fazemos no navegador.

## Propósito de usar no hit-gub:
- É mais fácil de modificar
- Modificações atualiza automaticamente para todo mundo
- Salva backup das versões anteriores

## Como usar:
Adicione a URL abaixo aos favoritos:

```js
javascript: {
  const s = document.createElement('script');
  document.body.appendChild(s);
  s.src = 'https://tsudizera.github.io/aConfianca/[nome_do_script_desejado].js';
  null;
}
```

Substitua `[nome_do_script_desejado]`.

Toda vez que desejar usar o script, basta clicar no favorito. ⭐
