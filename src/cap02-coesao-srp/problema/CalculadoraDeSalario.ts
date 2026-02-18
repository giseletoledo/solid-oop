// ============================================================
// PROBLEMA: Classe não coesa — viola o SRP
// ============================================================
//
// Esta classe cresce por dois motivos diferentes:
//   1. Sempre que um CARGO novo surgir
//   2. Sempre que uma REGRA DE CÁLCULO nova surgir
//
// Isso viola o SRP (Single Responsibility Principle):
// a classe tem mais de uma razão para mudar.
//
// Problemas concretos:
//   - Difícil de reutilizar uma regra isolada
//   - Regras próximas podem se influenciar
//   - Cresce indefinidamente com novos cargos
//   - Testar uma regra sem executar as outras é complicado
// ============================================================

export enum Cargo {
  DESENVOLVEDOR = "DESENVOLVEDOR",
  DBA = "DBA",
  TESTER = "TESTER",
  // Imagine: GERENTE, ANALISTA, ARQUITETO, DEVOPS, QA...
  // Cada novo cargo exige alterar ESTA classe
}

export interface Funcionario {
  nome: string;
  cargo: Cargo;
  salarioBase: number;
}

export class CalculadoraDeSalario {
  calcula(funcionario: Funcionario): number {
    if (funcionario.cargo === Cargo.DESENVOLVEDOR) {
      return this.dezOuVintePorcento(funcionario);
    }

    if (
      funcionario.cargo === Cargo.DBA ||
      funcionario.cargo === Cargo.TESTER
    ) {
      return this.quinzeOuVinteCincoPorcento(funcionario);
    }

    throw new Error("Funcionário inválido");
  }

  // Regras misturadas na mesma classe
  // Se a regra do desenvolvedor mudar → altera esta classe
  // Se uma regra de DBA mudar → altera esta classe
  // Se um cargo novo surgir → altera esta classe
  // Três razões diferentes para mudar = viola SRP

  private dezOuVintePorcento(funcionario: Funcionario): number {
    if (funcionario.salarioBase > 3000) {
      return funcionario.salarioBase * 0.8; // desconto de 20%
    }
    return funcionario.salarioBase * 0.9; // desconto de 10%
  }

  private quinzeOuVinteCincoPorcento(funcionario: Funcionario): number {
    if (funcionario.salarioBase > 2000) {
      return funcionario.salarioBase * 0.75; // desconto de 25%
    }
    return funcionario.salarioBase * 0.85; // desconto de 15%
  }
}