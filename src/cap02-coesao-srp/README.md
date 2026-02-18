# Capítulo 2 — A Coesão e o tal do SRP

## 🧠 Conceito

**Coesão** significa que uma classe deve ter **uma única responsabilidade** — uma única razão para mudar.

> *"Uma classe coesa é aquela que possui uma única responsabilidade. Ela não toma conta de mais de um conceito no sistema."*

---

## ❌ O Problema

A classe `CalculadoraDeSalario` cresce indefinidamente por **dois motivos distintos**:

1. Sempre que um **cargo novo** surgir
2. Sempre que uma **regra de cálculo nova** surgir

Isso viola o SRP porque a classe tem mais de uma razão para mudar. Além disso:

- É difícil **reutilizar** uma regra isolada sem arrastar a classe inteira
- Regras próximas podem **se influenciar mutuamente**, causando bugs
- **Testar** uma regra individualmente é complicado

```
❌ CalculadoraDeSalario
     ├── if DESENVOLVEDOR → dezOuVintePorcento()
     ├── if DBA           → quinzeOuVinteCincoPorcento()
     └── if TESTER        → quinzeOuVinteCincoPorcento()
         (e cresce para sempre...)
```

---

## ✅ A Solução

Separar cada regra em sua própria classe, todas implementando a mesma interface `RegraDeCalculo`.

```
✅ Interface: RegraDeCalculo
     ├── DezOuVintePorcento       (só muda se ESSA regra mudar)
     └── QuinzeOuVinteCincoPorcento (só muda se ESSA regra mudar)

✅ Enum: Cargo
     ├── DESENVOLVEDOR → new DezOuVintePorcento()
     ├── DBA           → new QuinzeOuVinteCincoPorcento()
     └── TESTER        → new QuinzeOuVinteCincoPorcento()

✅ CalculadoraDeSalario
     └── funcionario.cargo.regra.calcula(funcionario)
```

O enum `Cargo` **encapsula** a associação cargo→regra, evitando que o desenvolvedor precise lembrar de alterar a calculadora toda vez que um cargo novo surgir.

---

## 📁 Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `problema/CalculadoraDeSalario.ts` | Classe não coesa com ifs encadeados |
| `problema/index.ts` | Demonstração do problema |
| `solucao/RegraDeCalculo.ts` | Interface e implementações de regras |
| `solucao/Cargo.ts` | Enum com encapsulamento da regra |
| `solucao/CalculadoraDeSalario.ts` | Calculadora coesa e limpa |
| `solucao/index.ts` | Demonstração da solução |

---

##  Princípio (SRP)

 *"A classe deve ter uma, e apenas uma, razão para mudar."*

Como detectar violações do SRP? Procure por:
- Classes com **muitos métodos diferentes**
- Classes **modificadas com frequência**
- Classes que **nunca param de crescer**