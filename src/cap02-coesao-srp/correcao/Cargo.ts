// ============================================================
// SOLUÇÃO: Enum Cargo encapsula a associação cargo → regra
// ============================================================
//
// Em Java, enums podem ter comportamento.
// Em TypeScript, simulamos isso com um mapa de constantes.
//
// O ponto essencial: ao criar um NOVO cargo, o desenvolvedor
// é OBRIGADO a fornecer uma regra de cálculo.
// Não há como esquecer. O compilador garante.
//
// Sem esse encapsulamento, o dev precisaria usar CTRL+F para
// descobrir todos os lugares que precisam ser alterados.
// Com ele, a mudança acontece em UM único ponto.
// ============================================================

import { RegraDeCalculo, DezOuVintePorcento, QuinzeOuVinteCincoPorcento, TrintaPorcento } from "./RegraDeCalculo";

// Encapsulamento: cargo e regra vivem juntos
// Impossível criar um cargo sem definir sua regra
export class Cargo {
  static readonly DESENVOLVEDOR = new Cargo("DESENVOLVEDOR", new DezOuVintePorcento());
  static readonly DBA           = new Cargo("DBA",           new QuinzeOuVinteCincoPorcento());
  static readonly TESTER        = new Cargo("TESTER",        new QuinzeOuVinteCincoPorcento());
  static readonly GERENTE       = new Cargo("GERENTE",       new TrintaPorcento());
  // Para adicionar novo cargo: só adicionar linha aqui
  // A CalculadoraDeSalario NÃO precisa ser alterada

  private constructor(
    public readonly nome: string,
    public readonly regra: RegraDeCalculo
  ) {}

  toString(): string {
    return this.nome;
  }
}