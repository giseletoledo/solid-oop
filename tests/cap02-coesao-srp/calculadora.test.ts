// tests/cap02-coesao-srp/calculadora.test.ts
//
// Testa AMBAS as versões (problema e correção) com os mesmos casos.
// Isso prova que a refatoração não alterou o comportamento — apenas o design.

import { describe, it, expect } from "vitest";

// ---- Versão PROBLEMA ----
import {
  CalculadoraDeSalario as CalculadoraProblema,
  Cargo as CargoProblema,
  Funcionario as FuncionarioProblema,
} from "../../src/cap02-coesao-srp/problema/CalculadoraDeSalario";

// ---- Versão CORREÇÃO ----
import { CalculadoraDeSalario as CalculadoraCorrecao } from "../../src/cap02-coesao-srp/correcao/CalculadoraDeSalario";
import { Cargo as CargoCorrecao } from "../../src/cap02-coesao-srp/correcao/Cargo";
import { Funcionario as FuncionarioCorrecao } from "../../src/cap02-coesao-srp/correcao/Funcionario";
import {
  DezOuVintePorcento,
  QuinzeOuVinteCincoPorcento,
} from "../../src/cap02-coesao-srp/correcao/RegraDeCalculo";

// ─────────────────────────────────────────────────────────────
// TESTES DA VERSÃO PROBLEMA
// Existem para documentar o comportamento atual e garantir
// que a refatoração não quebrou nada.
// ─────────────────────────────────────────────────────────────
describe("PROBLEMA — CalculadoraDeSalario (não coesa)", () => {
  const calculadora = new CalculadoraProblema();

  describe("Cargo: DESENVOLVEDOR", () => {
    it("aplica 20% de desconto quando salário > R$3000", () => {
      const funcionario: FuncionarioProblema = {
        nome: "Ana",
        cargo: CargoProblema.DESENVOLVEDOR,
        salarioBase: 4000,
      };
      // 4000 * 0.8 = 3200
      expect(calculadora.calcula(funcionario)).toBe(3200);
    });

    it("aplica 10% de desconto quando salário <= R$3000", () => {
      const funcionario: FuncionarioProblema = {
        nome: "Leo",
        cargo: CargoProblema.DESENVOLVEDOR,
        salarioBase: 2500,
      };
      // 2500 * 0.9 = 2250
      expect(calculadora.calcula(funcionario)).toBe(2250);
    });

    it("testa o valor exato do limite (R$3000 usa desconto 10%)", () => {
      const funcionario: FuncionarioProblema = {
        nome: "Limite",
        cargo: CargoProblema.DESENVOLVEDOR,
        salarioBase: 3000,
      };
      // <= 3000, então 0.9
      expect(calculadora.calcula(funcionario)).toBe(2700);
    });
  });

  describe("Cargo: DBA", () => {
    it("aplica 25% de desconto quando salário > R$2000", () => {
      const funcionario: FuncionarioProblema = {
        nome: "Bruno",
        cargo: CargoProblema.DBA,
        salarioBase: 2500,
      };
      // 2500 * 0.75 = 1875
      expect(calculadora.calcula(funcionario)).toBe(1875);
    });

    it("aplica 15% de desconto quando salário <= R$2000", () => {
      const funcionario: FuncionarioProblema = {
        nome: "Bruno",
        cargo: CargoProblema.DBA,
        salarioBase: 1800,
      };
      // 1800 * 0.85 = 1530
      expect(calculadora.calcula(funcionario)).toBe(1530);
    });
  });

  describe("Cargo: TESTER", () => {
    it("usa a mesma regra do DBA", () => {
      const funcionario: FuncionarioProblema = {
        nome: "Carol",
        cargo: CargoProblema.TESTER,
        salarioBase: 2800,
      };
      // 2800 * 0.75 = 2100
      expect(calculadora.calcula(funcionario)).toBe(2100);
    });
  });

  describe("Cargo inválido", () => {
    it("lança erro para cargo desconhecido", () => {
      const funcionario = {
        nome: "Fantasma",
        cargo: "GERENTE" as CargoProblema, // simula cargo não mapeado
        salarioBase: 5000,
      };
      expect(() => calculadora.calcula(funcionario)).toThrow("Funcionário inválido");
    });
  });
});

// ─────────────────────────────────────────────────────────────
// TESTES DA VERSÃO CORREÇÃO
// Mesmos casos — prova que o comportamento é idêntico.
// ─────────────────────────────────────────────────────────────
describe("CORREÇÃO — CalculadoraDeSalario (SRP aplicado)", () => {
  const calculadora = new CalculadoraCorrecao();

  describe("Cargo: DESENVOLVEDOR", () => {
    it("aplica 20% de desconto quando salário > R$3000", () => {
      const funcionario: FuncionarioCorrecao = {
        nome: "Ana",
        cargo: CargoCorrecao.DESENVOLVEDOR,
        salarioBase: 4000,
      };
      expect(calculadora.calcula(funcionario)).toBe(3200);
    });

    it("aplica 10% de desconto quando salário <= R$3000", () => {
      const funcionario: FuncionarioCorrecao = {
        nome: "Leo",
        cargo: CargoCorrecao.DESENVOLVEDOR,
        salarioBase: 2500,
      };
      expect(calculadora.calcula(funcionario)).toBe(2250);
    });
  });

  describe("Cargo: DBA", () => {
    it("aplica 25% de desconto quando salário > R$2000", () => {
      const funcionario: FuncionarioCorrecao = {
        nome: "Bruno",
        cargo: CargoCorrecao.DBA,
        salarioBase: 2500,
      };
      expect(calculadora.calcula(funcionario)).toBe(1875);
    });

    it("aplica 15% de desconto quando salário <= R$2000", () => {
      const funcionario: FuncionarioCorrecao = {
        nome: "Bruno",
        cargo: CargoCorrecao.DBA,
        salarioBase: 1800,
      };
      expect(calculadora.calcula(funcionario)).toBe(1530);
    });
  });

  // DIFERENCIAL DA CORREÇÃO: testar as regras ISOLADAMENTE
  // Na versão problema isso é IMPOSSÍVEL — estão presas como métodos privados
  describe("Regras isoladas (só possível na versão corrigida)", () => {
    it("DezOuVintePorcento pode ser testada sem CalculadoraDeSalario", () => {
      const regra = new DezOuVintePorcento();
      const acima = { nome: "X", cargo: CargoCorrecao.DESENVOLVEDOR, salarioBase: 5000 };
      const abaixo = { nome: "Y", cargo: CargoCorrecao.DESENVOLVEDOR, salarioBase: 1000 };

      expect(regra.calcula(acima)).toBe(4000);   // 5000 * 0.8
      expect(regra.calcula(abaixo)).toBe(900);    // 1000 * 0.9
    });

    it("QuinzeOuVinteCincoPorcento pode ser testada sem CalculadoraDeSalario", () => {
      const regra = new QuinzeOuVinteCincoPorcento();
      const acima = { nome: "X", cargo: CargoCorrecao.DBA, salarioBase: 3000 };
      const abaixo = { nome: "Y", cargo: CargoCorrecao.DBA, salarioBase: 1500 };

      expect(regra.calcula(acima)).toBe(2250);    // 3000 * 0.75
      expect(regra.calcula(abaixo)).toBe(1275);   // 1500 * 0.85
    });
  });
});