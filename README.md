# Melhorias no Cadastro e Gerenciamento de Hábitos

## Objetivo

Nesta etapa do projeto foram implementadas melhorias voltadas para:

* experiência do usuário;
* validação dos dados cadastrados;
* comunicação entre componentes;
* organização da interface.

Além disso, foi adicionada a lógica responsável por abrir e fechar o formulário de cadastro de hábitos automaticamente após a criação de um novo hábito.

---

## Comunicação entre componentes

Foi criada a interface `AddHabitProps` para permitir que o componente `AddHabit` receba uma função do componente pai.

```tsx
interface AddHabitProps {
  onHabitAdded: () => void;
}
```

O componente passou a receber essa propriedade da seguinte maneira:

```tsx
export default function AddHabit({ onHabitAdded }: AddHabitProps)
```

### Por que isso foi feito?

O componente `AddHabit` é responsável apenas pelo cadastro dos hábitos. Entretanto, quem controla a exibição do formulário é o componente pai (`Habits`).

Ao utilizar uma função passada por props, o componente filho consegue avisar ao componente pai que um novo hábito foi cadastrado com sucesso.

Essa abordagem possui algumas vantagens:

* reduz o acoplamento entre os componentes;
* mantém a responsabilidade de abrir e fechar o formulário no componente pai;
* melhora a reutilização do componente.

---

## Fechamento automático do formulário

Após adicionar um novo hábito, a função recebida pelo componente é executada.

```tsx
onHabitAdded();
```

No componente pai foi criada a função responsável por alterar o estado do formulário.

```tsx
const toggleForm = () => setIsFormOpen(!isFormOpen);
```

E ela é passada para o componente:

```tsx
<AddHabit onHabitAdded={toggleForm} />
```

### Resultado

Antes:

```txt
Adicionar hábito
↓
Formulário continua aberto
```

Agora:

```txt
Adicionar hábito
↓
Hábito cadastrado
↓
Formulário é fechado automaticamente
```

Essa pequena melhoria torna a interação mais intuitiva para o usuário.

---

## Padronização do nome do hábito

Foi realizada uma melhoria na função responsável por tratar o valor digitado no campo de texto.

```tsx
function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
  const cleaned = e.target.value.trimStart();
  const capitalized =
    cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

  setName(capitalized);
}
```

### Por que isso foi feito?

Essa implementação possui dois objetivos:

#### Remover espaços em branco no início do texto

Antes:

```txt
"     estudar react"
```

Depois:

```txt
"estudar react"
```

---

#### Padronizar a primeira letra

Antes:

```txt
estudar react
```

Depois:

```txt
Estudar react
```

Essa abordagem melhora:

* a consistência dos dados cadastrados;
* a apresentação visual dos hábitos;
* futuras comparações entre os nomes dos hábitos.

---

## Validação de hábitos duplicados

Foi adicionada uma validação para impedir o cadastro de hábitos repetidos.

```tsx
habits.some(
  (hb) =>
    hb.name === name &&
    hb.category === category
)
```

Caso o hábito já exista, a aplicação exibe a seguinte mensagem:

```txt
Hábito já cadastrado.
```

### Por que isso foi feito?

Sem essa validação, seria possível cadastrar várias vezes o mesmo hábito. A validação evita registros desnecessários e mantém a lista de hábitos mais organizada.

---

## Componente Habits

O componente `Habits` passou a ser responsável pelo gerenciamento da interface do Dashboard.

Ele possui as seguintes responsabilidades:

* abrir e fechar o formulário de cadastro;
* listar todos os hábitos cadastrados;
* marcar hábitos como concluídos;
* remover hábitos;
* exibir mensagens quando não houver hábitos cadastrados.

---

## Controle do formulário

Foi criado um estado responsável por controlar a exibição do componente de cadastro.

```tsx
const [isFormOpen, setIsFormOpen] =
  useState(false);
```

Quando o usuário clicar no botão:

```txt
+ Novo Hábito
```

o formulário será exibido.

---

## Renderização condicional

O formulário é renderizado apenas quando necessário.

```tsx
{
  isFormOpen &&
  <AddHabit onHabitAdded={toggleForm} />
}
```

### Por que isso foi feito?

Essa abordagem permite:

* reduzir elementos desnecessários na tela;
* melhorar a organização visual da aplicação;
* deixar a interface mais limpa.

---

## Lista de hábitos

Foi implementada a renderização dinâmica dos hábitos utilizando o método `map()`.

```tsx
habits.map(...)
```

Cada item da lista apresenta:

* nome do hábito;
* categoria;
* sequência de dias;
* status de conclusão;
* botão para exclusão.

---

## Marcar hábitos como concluídos

Cada hábito possui um botão responsável por alterar seu estado de conclusão.

```tsx
onClick={() => toggleHabit(habit.id)}
```

Quando marcado como concluído:

* sua aparência é alterada visualmente;
* o botão de exclusão é habilitado.

---

## Exclusão de hábitos

O botão de exclusão somente é exibido quando o hábito estiver concluído.

```tsx
habit.check === true
```

### Por que isso foi feito?

Essa decisão foi tomada para:

* evitar exclusões acidentais;
* incentivar o usuário a concluir o hábito antes de removê-lo;
* melhorar a experiência de uso da aplicação.

---

## Estado vazio

Quando nenhum hábito estiver cadastrado, uma mensagem amigável é exibida para o usuário.

```txt
Você ainda não tem hábitos cadastrados.
Adicione um acima!
```

Essa abordagem melhora a usabilidade e deixa mais claro qual ação deve ser realizada.

---

## Conceitos praticados

Durante essa implementação foram praticados conceitos importantes do desenvolvimento Front-end:

* Comunicação entre componentes utilizando Props.
* Gerenciamento de estado com React Hooks.
* Validação de formulários.
* Manipulação de Strings.
* Renderização condicional.
* Listagem dinâmica com map().
* Boas práticas de componentização.
* Context API.
* Experiência do usuário (UX).
* Organização da interface.
* Tipagem com TypeScript.

---

## Aprendizados

Essas melhorias permitiram deixar o componente de cadastro mais robusto e a interface mais intuitiva. Além disso, foi possível praticar a comunicação entre componentes no React, aplicar validações importantes para o formulário e organizar melhor as responsabilidades de cada componente da aplicação.
