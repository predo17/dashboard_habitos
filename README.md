# Implementação do Formulário de Cadastro de Hábitos

## Objetivo

Nesta etapa do projeto foi desenvolvido o formulário responsável por cadastrar novos hábitos na aplicação.

Além de permitir o cadastro, foram adicionadas validações para evitar dados inválidos e criado um estilo responsivo utilizando SCSS.

---

# Estrutura do componente

O componente `AddHabit` é responsável por:

* Capturar o nome do hábito;
* Permitir selecionar uma categoria;
* Validar os dados informados;
* Adicionar um novo hábito ao estado global utilizando a Context API.

Para acessar a função responsável por adicionar um hábito foi utilizado o hook personalizado `useHabit`.

```tsx
const { addHabit } = useHabit();
```

Dessa forma o componente não precisa conhecer como o estado é armazenado, apenas solicitar a criação de um novo hábito.

---

# Gerenciamento do formulário

Foram utilizados dois estados locais através do `useState`.

```tsx
const [name, setName] = useState("");
const [category, setCategory] = useState("");
```

Esses estados armazenam temporariamente os valores digitados pelo usuário antes de serem enviados para o contexto.

---

# Tratamento do nome do hábito

Foi criada uma função específica para tratar o campo de texto.

```tsx
function handleNameChange(...)
```

Ao atualizar o valor do input foi utilizado o método:

```ts
trimStart()
```

O objetivo é impedir que o usuário inicie o nome do hábito com espaços em branco.

Por exemplo:

```
"   Estudar React"
```

passa automaticamente para

```
"Estudar React"
```

Essa pequena validação melhora a qualidade dos dados armazenados.

---

# Cadastro de um novo hábito

Ao enviar o formulário, a função `addNewHabit` é executada.

Antes de criar o hábito são feitas algumas validações.

## Verificação de campos obrigatórios

Caso o usuário deixe algum campo vazio, o cadastro é interrompido.

```tsx
if (!name || !category) {
    return alert("Preencha todos os campos");
}
```

Isso evita que hábitos incompletos sejam adicionados.

---

## Criação do objeto

Quando a validação é concluída, um novo objeto é enviado para o contexto.

```tsx
addHabit({
    id: Date.now(),
    name,
    category,
    check: false,
    streak: 0
});
```

Foi utilizado `Date.now()` para gerar um identificador único durante o desenvolvimento.

Os demais campos são inicializados com seus respectivos valores padrão.

Após o cadastro, os campos do formulário são limpos para facilitar o registro de um novo hábito.

---

# Categorias

As categorias disponíveis foram armazenadas em uma constante.

```tsx
const CATEGORY_OPTIONS = [
    "Saúde",
    "Estudo",
    "Exercicio",
    "Outro"
];
```

Essa abordagem possui algumas vantagens:

* evita repetição de código;
* facilita adicionar ou remover categorias;
* permite gerar automaticamente os elementos `<option>` utilizando `map()`.

```tsx
CATEGORY_OPTIONS.map(...)
```

Essa solução deixa o código mais organizado e escalável.

---

# Estilização com SCSS

A interface foi construída utilizando SCSS.

Ao invés de repetir valores ao longo do arquivo, foram criadas variáveis para representar:

* cores principais;
* cores de hover;
* bordas;
* raio dos elementos;
* animações;
* transições.

Exemplo:

```scss
$primary-color
$border-color
$radius
```

Essa abordagem facilita futuras alterações no tema da aplicação.

---

# Organização dos estilos

O formulário foi estruturado utilizando Flexbox.

No layout padrão (mobile), os elementos ficam organizados em coluna.

```
Input

Select

Botão
```

Em telas maiores é aplicada uma Media Query.

```scss
@media (min-width: 640px)
```

Nesse momento o formulário passa a utilizar uma disposição horizontal.

```
Input | Select | Botão
```

Essa estratégia melhora a experiência do usuário em diferentes tamanhos de tela.

---

# Melhorias de experiência do usuário

Durante a implementação também foram adicionados alguns detalhes para melhorar a usabilidade:

* efeito de foco nos campos;
* animação no botão ao clicar;
* transições suaves;
* ícone personalizado no componente `<select>`;
* cursor apropriado para seleção;
* limpeza automática do formulário após o cadastro.

---

# Aprendizados

Com essa implementação foram praticados diversos conceitos importantes do desenvolvimento Front-end, entre eles:

* gerenciamento de formulários com React;
* utilização de estados locais;
* consumo de dados através da Context API;
* criação de validações simples;
* renderização dinâmica utilizando `map()`;
* componentização;
* organização de estilos com SCSS;
* criação de layouts responsivos utilizando Flexbox e Media Queries.
