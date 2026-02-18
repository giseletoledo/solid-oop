// ============================================================
// SOLUÇÃO: CalculadoraDeSalario coesa
// ============================================================
//
// Agora esta classe tem UMA única razão para mudar:
// se a lógica de "como delegar o cálculo" mudar.
//
// Ela NÃO muda quando:
//   - Um cargo novo é criado  → muda só em Cargo.ts
//   - Uma regra muda          → muda só na classe da regra
//
// Isso é o SRP: uma razão para mudar.
// ============================================================

import { Funcionario } from "./Cargo";

export class CalculadoraDeSalario {
  // ✅ Método limpo e coeso: delega para a regra encapsulada no cargo
  calcula(funcionario: Funcionario): number {
    return funcionario.cargo.regra.calcula(funcionario);
  }
}