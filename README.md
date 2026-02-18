# SOLID em TypeScript

Repositório baseado no livro **"ORIENTAÇÃO A OBJETOS E
SOLID PARA NINJAS"** (Casa do Código), adaptando os exemplos de Java para TypeScript. Estudos do Clube de Leitura Dev.

Cada capítulo mostra o **problema** (código ruim) e a **solução** (código refatorado), com explicações contextuais.

---

## Estrutura

```
solid-ts/
├── capitulo-2-srp/       # Single Responsibility Principle
│   ├── problema/         # Código não coeso (problemático)
│   └── solucao/          # Código refatorado (coeso)
├── capitulo-3-dip/       # Dependency Inversion Principle
│   ├── problema/         # Código acoplado (problemático)
│   └── solucao/          # Código desacoplado (com interfaces)
└── README.md
```

---

## Como rodar no GitHub Codespaces

### 1. Clone ou abra o repositório no Codespace

### 2. Instale as dependências
```
npm install
```

### 3. Execute um capítulo
```
# Rodar o problema do capítulo 2
npx ts-node capitulo-2-srp/problema/index.ts

# Rodar a solução do capítulo 2
npx ts-node capitulo-2-srp/solucao/index.ts

# Rodar o problema do capítulo 3
npx ts-node capitulo-3-dip/problema/index.ts

# Rodar a solução do capítulo 3
npx ts-node capitulo-3-dip/solucao/index.ts
```

---

## Capítulos

| Capítulo | Princípio | Conceito-chave |
|----------|-----------|----------------|
| [2 - SRP](./capitulo-2-srp/README.md) | Single Responsibility | Coesão: uma classe, uma razão para mudar |
| [3 - DIP](./capitulo-3-dip/README.md) | Dependency Inversion | Acoplar com abstrações estáveis, não implementações |

---

## Princípios SOLID

| Letra | Princípio | Capítulo |
|-------|-----------|----------|
| **S** | Single Responsibility Principle | Cap. 2 |
| **O** | Open/Closed Principle | — |
| **L** | Liskov Substitution Principle | — |
| **I** | Interface Segregation Principle | — |
| **D** | Dependency Inversion Principle | Cap. 3 |