# Implementação da Persistência de Dados com LocalStorage

## Objetivo

Nesta etapa do projeto foi implementada a persistência dos hábitos cadastrados utilizando o LocalStorage API do navegador.

Anteriormente, todos os hábitos eram armazenados apenas no estado da aplicação utilizando o `useState`. Fazendo com que, ao atualizar a página ou fechar o navegador, todas as informações eram perdidas.

Com a implementação da persistência, os hábitos passam a ser armazenados localmente no navegador do usuário, permitindo que os dados continuem disponíveis mesmo após recarregar a aplicação.

---

## Como era antes

Inicialmente, o estado era criado da seguinte forma:

```tsx
const [habit, setHabit] = useState<Habit[]>([]);
```

Nessa abordagem:

* Os hábitos existiam apenas durante a execução da aplicação.
* Atualizar a página fazia com que todos os dados fossem perdidos.
* O usuário precisava cadastrar novamente todos os hábitos.

Exemplo:

```txt
Adicionar hábito
↓

Atualizar a página
↓

Todos os hábitos desaparecem
```

---

## Carregando os dados salvos

Para resolver esse problema, foi utilizada a inicialização (Lazy Initialization) do `useState`.

```tsx
const [habit, setHabit] = useState<Habit[]>(() => {
  const storedHabits = localStorage.getItem("habits");

  return storedHabits
    ? JSON.parse(storedHabits)
    : [];
});
```

### Por que isso foi feito?

Ao utilizar uma função dentro do `useState`, o React executa essa lógica apenas na primeira renderização do componente.

O objetivo dessa abordagem é:

* verificar se existem hábitos salvos no navegador;
* converter os dados armazenados em formato JSON para um array JavaScript;
* utilizar os dados existentes como estado inicial da aplicação.

Caso não exista nenhuma informação armazenada, um array vazio será retornado.

---

## Utilizando o LocalStorage

Foi utilizado o método:

```tsx
localStorage.getItem("habits");
```

Esse método é responsável por buscar os dados armazenados utilizando a chave:

```txt
habits
```

Como o LocalStorage armazena apenas strings, foi necessário utilizar:

```tsx
JSON.parse()
```

para transformar os dados novamente em um array de objetos.

---

## Salvando automaticamente os hábitos

Além de carregar os dados, foi implementado um efeito responsável por salvar automaticamente qualquer alteração realizada no estado.

```tsx
useEffect(() => {
  localStorage.setItem(
    "habits",
    JSON.stringify(habit)
  );
}, [habit]);
```

### Por que isso foi feito?

Sempre que a lista de hábitos for alterada, o React executará o `useEffect`.

Isso significa que as seguintes ações serão salvas automaticamente:

* adicionar um hábito;
* remover um hábito;
* marcar um hábito como concluído;
* desmarcar um hábito.

Não é necessário chamar o LocalStorage manualmente dentro de cada função.

---

## Vantagens dessa abordagem

Ao utilizar o `useEffect`, foi possível centralizar toda a lógica de persistência dos dados em um único lugar.

Em vez de fazer algo como:

```tsx
addHabit()

↓

localStorage.setItem(...)
```

em todas as funções responsáveis por modificar o estado, basta atualizar o estado normalmente.

O React fica responsável por observar qualquer alteração no array de hábitos e salvar automaticamente as mudanças.

Essa abordagem oferece algumas vantagens:

* código mais limpo;
* menor repetição de lógica;
* melhor manutenção;
* maior escalabilidade.

---

## Fluxo da aplicação

O funcionamento atual do componente pode ser resumido da seguinte maneira:

```txt
Aplicação inicia
↓

Verifica se existem hábitos salvos

↓

Sim -> Carrega os hábitos

↓

Não -> Cria um array vazio

↓

Usuário interage com a aplicação

↓

O estado é atualizado

↓

O useEffect salva automaticamente as alterações no LocalStorage
```

---

## Conceitos praticados

Durante essa implementação foram praticados conceitos importantes do React e do JavaScript:

* LocalStorage API;
* Persistência de dados no navegador;
* React Hooks;
* useState com Lazy Initialization;
* useEffect;
* Manipulação de JSON;
* Gerenciamento de estado global;
* Boas práticas na organização do código.

---

## Aprendizados

A implementação da persistência de dados foi um passo importante para tornar a aplicação mais próxima de um produto real. Além de melhorar significativamente a experiência do usuário, essa abordagem permitiu praticar conceitos amplamente utilizados em aplicações Front-end, como sincronização entre estado e armazenamento local, utilização do `useEffect` para efeitos colaterais e carregamento inicial de dados utilizando o `useState`.
