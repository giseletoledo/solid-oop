# Capítulo 3 — Acoplamento e o tal do DIP

##  Conceito

**Acoplamento** é a dependência entre classes. O problema não é o acoplamento em si — ele é inevitável — mas o tipo de classe com a qual você se acopla.

> *"Não é deixar de acoplar. É começar a acoplar-se com módulos estáveis, que tendem a mudar menos."*

---

## Por que acoplamento é problemático?

Quando `GeradorDeNotaFiscal` depende diretamente de `EnviadorDeEmail`, `NFDao` e `SAP`:

- Uma mudança em qualquer dependência **propaga problemas** para o gerador
- **Reutilizar** o gerador exige levar junto todas as suas dependências
- Adicionar uma nova ação (SMS, webhook...) **exige alterar** a classe principal

```
GeradorDeNotaFiscal
     ├──→ EnviadorDeEmail   (instável)
     ├──→ SAP               (instável)
     └──→ NFDao             (instável)
```

---

## Estabilidade de classes

Por que acoplar com `List` (Java) ou `Array` (TypeScript) não é problema?

Porque são **estáveis**: muitas classes dependem delas, então raramente mudam. Se não mudam, não propagam problemas.

**A chave: acoplar-se com abstrações estáveis, não com implementações instáveis.**

---

## A Solução

Criar uma interface `AcaoAposGerarNota` que todas as ações implementam. O gerador passa a depender apenas da interface.

```
GeradorDeNotaFiscal
     └──→ AcaoAposGerarNota[]   (interface estável)
               ├── EnviadorDeEmail
               ├── NFDao
               ├── EnviadorDeSMS
               └── QualquerNovaAcao (sem alterar o gerador!)
```

---

## 📋 DIP — Dependency Inversion Principle

> - Módulos de alto nível não devem depender de módulos de baixo nível. **Ambos devem depender de abstrações.**
> - Abstrações não devem depender de detalhes. **Detalhes devem depender de abstrações.**

---

## 📁 Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `problema/GeradorDeNotaFiscal.ts` | Gerador acoplado diretamente às implementações |
| `problema/index.ts` | Demonstração do problema |
| `solucao/AcaoAposGerarNota.ts` | Interface + implementações desacopladas |
| `solucao/GeradorDeNotaFiscal.ts` | Gerador que depende apenas da abstração |
| `solucao/index.ts` | Demonstração da solução |

---

## Padrão relacionado

A solução é uma implementação do padrão **Observer**. Outros padrões que ajudam a desacoplar: **Visitor**, **Factory**.