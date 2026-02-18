// index.ts — Capítulo 3 | PROBLEMA
// Demonstra o GeradorDeNotaFiscal acoplado a implementações concretas.
// Para rodar: npx ts-node src/cap03-acoplamento-dip/problema/index.ts

import { GeradorDeNotaFiscal, EnviadorDeEmail, NotaFiscalDao } from "./problema/GeradorDeNotaFiscal";

console.log("=== ❌ PROBLEMA: GeradorDeNotaFiscal acoplado ===\n");

const gerador = new GeradorDeNotaFiscal(
  new EnviadorDeEmail(),
  new NotaFiscalDao()
);

const nf = gerador.gera({ valorMensal: 1000 });
console.log(`\nNF gerada: valor=R$${nf.valor}, imposto=R$${nf.imposto}`);

console.log("\n Problemas desta abordagem:");
console.log("Adicionar SistemaSAP: precisa mudar o CONSTRUTOR do Gerador");
console.log("EnviadorDeEmail falha: erro propaga direto para o Gerador");
console.log("Testar Gerador em isolamento: impossível sem email e banco reais");
console.log("Reutilizar Gerador em outro contexto: arrastar Email + DAO junto");