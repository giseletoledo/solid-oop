// ============================================================
// SOLUÇÃO: Interface RegraDeCalculo + implementações isoladas
// ============================================================
//
// Cada regra agora vive em sua própria classe.
// Uma classe só muda se A SUA regra mudar.
// Isso é coesão: uma única razão para mudar.
//
// Benefícios:
//   - Fácil de reutilizar uma regra em outro ponto do sistema
//   - Impossível que uma regra afete a outra (estão separadas)
//   - Adicionar nova regra = criar nova classe, sem tocar nas existentes
//   - Testar cada regra isoladamente é trivial
// ============================================================

import { Funcionario } from "./Funcionario";

// Contrato estável: define o "esqueleto" que todas as regras seguem
export interface RegraDeCalculo {
  calcula(funcionario: Funcionario): number;
}

// Regra coesa: só muda se ESTA regra de negócio mudar
export class DezOuVintePorcento implements RegraDeCalculo {
  calcula(funcionario: Funcionario): number {
    if (funcionario.salarioBase > 3000) {
      return funcionario.salarioBase * 0.8; // desconto de 20%
    }
    return funcionario.salarioBase * 0.9; // desconto de 10%
  }
}

// Regra coesa: só muda se ESTA regra de negócio mudar
export class QuinzeOuVinteCincoPorcento implements RegraDeCalculo {
  calcula(funcionario: Funcionario): number {
    if (funcionario.salarioBase > 2000) {
      return funcionario.salarioBase * 0.75; // desconto de 25%
    }
    return funcionario.salarioBase * 0.85; // desconto de 15%
  }
}

// Adicionar novo cargo = criar nova classe aqui, sem tocar em nada mais
export class TrintaPorcento implements RegraDeCalculo {
  calcula(funcionario: Funcionario): number {
    return funcionario.salarioBase * 0.7; // desconto fixo de 30%
  }
}