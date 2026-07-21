# Implementação do Sistema de Streak (Sequência de Hábitos)

## Objetivo

Nesta etapa do projeto foi implementado o sistema de sequência de hábitos (streak), permitindo que a aplicação acompanhe em quais dias um hábito foi concluído e mantenha a contagem de dias consecutivos em que o usuário realizou determinada atividade.

Além disso, foi adicionada a lógica responsável por:

* Persistir a sequência dos hábitos no Local Storage.
* Reiniciar automaticamente a sequência quando o usuário quebrar a consistência do hábito.
* Desmarcar automaticamente os hábitos no início de um novo dia.
* Impedir inconsistências na contagem dos dias concluídos.

---

## Atualização da Interface Habit

Para suportar a nova funcionalidade, foi adicionada uma nova propriedade à interface `Habit`.

```ts
export interface Habit {
  id: number;
  name: string;
  category: string;
  check: boolean;
  streak: number;
  lastCompleted: string | null;
}
```

### Por que isso foi feito?

Anteriormente, a aplicação armazenava apenas:

* nome do hábito;
* categoria;
* status de conclusão;
* sequência atual.

Porém, não existia nenhuma informação indicando em qual dia o hábito havia sido concluído.

A propriedade `lastCompleted` foi criada justamente para armazenar a última data em que o hábito foi marcado como concluído.

Exemplo:

```txt
25/05/2026 -> Estudar React

lastCompleted = "2026-05-25"
```

Essa informação é fundamental para saber se:

* o usuário completou o hábito hoje;
* completou ontem;
* perdeu um ou mais dias;
* deve receber um incremento no streak;
* deve perder a sequência.

---

## Atualização do Cadastro de Hábitos

A função responsável por criar um novo hábito também foi atualizada.

Antes:

```ts
addHabit({
  id,
  name,
  category,
  check,
  streak
});
```

Agora:

```ts
addHabit({
  id: Date.now(),
  name,
  category,
  check: false,
  streak: 0,
  lastCompleted: null
});
```

### Por que isso foi feito?

Quando um hábito é criado pela primeira vez:

* ele ainda não foi concluído;
* não possui sequência;
* não possui uma data de conclusão.

Por esse motivo, o valor inicial da propriedade `lastCompleted` é definido como `null`.

---

## Processamento dos hábitos ao iniciar a aplicação

Uma das principais melhorias dessa implementação foi a utilização do `useState` com Lazy Initialization.

```ts
useState<Habit[]>(() => {
   ...
})
```

Ao iniciar a aplicação, todos os hábitos armazenados no LocalStorage são processados automaticamente.

O sistema verifica:

* se o hábito foi concluído hoje;
* se foi concluído ontem;
* se a sequência ainda está válida;
* se o hábito deve continuar marcado como concluído.

---

## Tratamento das datas

Para realizar essas verificações foram criadas duas datas de referência:

```ts
const todayStr = ...
const yesterdayStr = ...
```

### Por que utilizar duas datas?

O sistema de streak precisa considerar três cenários:

### Cenário 1 - Hábito concluído hoje

```txt
Hoje: 26/05

lastCompleted = 26/05
```

Resultado:

```txt
check = true
streak permanece igual
```

---

### Cenário 2 - Hábito concluído ontem

```txt
Hoje: 26/05

lastCompleted = 25/05
```

Resultado:

```txt
check = false
streak permanece ativo
```

Nesse caso, o usuário ainda não perdeu sua sequência. Basta concluir o hábito novamente para incrementá-la.

---

### Cenário 3 - Sequência quebrada

```txt
Hoje: 26/05

lastCompleted = 23/05
```

Resultado:

```txt
check = false
streak = 0
lastCompleted = null
```

Como o hábito ficou mais de um dia sem ser concluído, a sequência é perdida automaticamente.

---

## Reinicialização automática do checkbox

Outra melhoria implementada foi o comportamento do checkbox do hábito.

Antes:

```txt
Marcou hoje

↓

Atualizou a página amanhã

↓

O hábito continuava marcado
```

Agora:

```txt
Marcou hoje

↓

Abriu a aplicação no dia seguinte

↓

O hábito é automaticamente desmarcado
```

### Por que isso foi feito?

Cada hábito representa uma tarefa diária.

Se ele permanecer marcado permanentemente, não faz sentido para o acompanhamento da rotina do usuário.

A lógica atual garante que:

* o hábito seja concluído apenas uma vez por dia;
* esteja disponível novamente no dia seguinte.

---

## Atualização do Streak

A função `toggleHabit` foi completamente atualizada para suportar a nova regra de negócio.

Ao marcar um hábito como concluído, o sistema verifica:

### Se já foi concluído hoje

```txt
Não incrementa o streak.
```

---

### Se foi concluído ontem

```txt
Incrementa o streak.

2 dias -> 3 dias
```

---

### Se a sequência foi quebrada

```txt
Inicia uma nova sequência.

0 dias -> 1 dia
```

---

## Desmarcando um hábito

Também foi implementada uma regra para o caso do usuário desmarcar um hábito no mesmo dia.

Antes:

```txt
Estudar React

Streak: 3 dias
```

Após desmarcar:

```txt
Streak: 2 dias
```

Caso o hábito possua apenas um dia de sequência:

```txt
Streak: 1 dia

↓

Desmarcou

↓

Streak: 0
lastCompleted = null
```

### Por que isso foi feito?

Essa abordagem evita inconsistências nos dados.

Se o usuário marcou um hábito por engano, ele pode desfazer a ação sem precisar aguardar até o próximo dia.

---

## Persistência dos dados

A sincronização com o LocalStorage continua sendo realizada automaticamente através do `useEffect`.

```ts
useEffect(() => {
  localStorage.setItem(
    "habits",
    JSON.stringify(habit)
  );
}, [habit]);
```

Sempre que houver alguma alteração:

* adicionar hábito;
* remover hábito;
* concluir hábito;
* desmarcar hábito;
* atualizar streak;

os dados serão salvos automaticamente.

---

## Fluxo atual da aplicação

```txt
Aplicação inicia

↓

Carrega os hábitos salvos

↓

Verifica as datas de conclusão

↓

Atualiza o estado dos hábitos

↓

Usuário interage com a aplicação

↓

O streak é calculado

↓

Os dados são atualizados

↓

As alterações são salvas no LocalStorage
```

---

## Conceitos praticados

Durante essa implementação foram praticados diversos conceitos importantes do desenvolvimento Front-end:

* React Hooks (useState e useEffect);
* LocalStorage API;
* Manipulação de datas em JavaScript;
* Gerenciamento de estado global;
* Persistência de dados;
* Regras de negócio para streaks;
* Imutabilidade de estados;
* Tipagem com TypeScript;
* Lazy Initialization do useState;
* Boas práticas na organização do código.

---

## Aprendizados

A implementação do sistema de streak tornou a aplicação significativamente mais próxima de um produto real. Além da persistência dos dados, foi necessário pensar em regras de negócio relacionadas ao tempo, consistência das informações e experiência do usuário.

Essa funcionalidade permitiu praticar conceitos bastante utilizados no mercado, como sincronização de estado com armazenamento local, manipulação de datas e modelagem de comportamentos complexos dentro de uma aplicação React.
