# Implementação do Context API para Gerenciamento de Hábitos

## Objetivo

Nesta etapa do projeto foi implementado o gerenciamento global de hábitos utilizando a **Context API** do React.

A ideia é permitir que qualquer componente da aplicação possa acessar e manipular a lista de hábitos sem a necessidade de passar propriedades (`props`) entre vários componentes.

---

## Estrutura criada

```
src/
├── context/
│   ├── HabitContext.tsx
│   └── useHabits.ts
├── types/
│   └── HabitTypes.ts
```

---

## HabitProvider

O arquivo `HabitContext.tsx` é responsável por criar o componente `HabitProvider`, que centraliza o estado da aplicação.

Foi utilizado o `useState` para armazenar todos os hábitos cadastrados.

Também foram implementadas três funções responsáveis por manipular esse estado:

* **addHabit**: adiciona um novo hábito à lista.
* **removeHabit**: remove um hábito utilizando seu `id`.
* **toggleHabit**: altera o estado da propriedade `check`, marcando ou desmarcando um hábito como concluído.

Esses valores são disponibilizados para toda a aplicação através do `HabitContext.Provider`.

---

## Separação do Context e do Hook

Inicialmente o contexto e o hook personalizado estavam no mesmo arquivo.

Durante o desenvolvimento surgiu o seguinte aviso do Vite/React:

> Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.

Esse aviso aconteceu porque o **Fast Refresh** funciona melhor quando um arquivo exporta apenas componentes React.

Como o arquivo também exportava:

* o `HabitContext`;
* o hook `useHabit`;

o React não conseguia atualizar corretamente o componente durante o desenvolvimento.

Para resolver esse problema, foi criada uma separação de responsabilidades:

### HabitContext.tsx

Responsável apenas por:

* criar o componente `HabitProvider`;
* armazenar o estado global;
* fornecer os dados através do Provider.

### useHabits.ts

Responsável por:

* criar o `HabitContext`;
* definir a interface do contexto;
* disponibilizar o hook `useHabit`.

Essa organização segue uma prática comum em projetos React, tornando o código mais organizado, reutilizável e compatível com o Fast Refresh.

---

## Hook personalizado

Foi criado o hook `useHabit` para facilitar o consumo do contexto.

Ao invés de importar `useContext` e `HabitContext` em todos os componentes, basta utilizar:

```tsx
const { habits, addHabit } = useHabit();
```

Além disso, foi adicionada uma verificação para garantir que o hook seja utilizado apenas dentro do `HabitProvider`.

Caso contrário, será lançada uma exceção informando o erro.

---

## Utilização no App

No componente principal (`App`), toda a aplicação é envolvida pelo `HabitProvider`.

```tsx
<HabitProvider>
  <LayoutApp />
</HabitProvider>
```

Dentro do componente `LayoutApp`, os dados do contexto podem ser acessados através do hook personalizado.

Como teste inicial, foi criado um botão responsável por adicionar um hábito e exibir a lista de hábitos na tela utilizando `JSON.stringify`.

Esse teste confirma que:

* o Provider está funcionando corretamente;
* o estado é atualizado;
* os componentes consumidores receberam automaticamente as alterações.

---

## Aprendizados

Durante essa implementação foram praticados conceitos importantes como:

* gerenciamento de estado global com Context API;
* criação de hooks personalizados;
* tipagem de contexto utilizando TypeScript;
* separação de responsabilidades entre Provider e Hook;
* funcionamento do Fast Refresh do React;
* organização de código para facilitar manutenção e escalabilidade.

