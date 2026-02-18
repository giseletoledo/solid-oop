// index.ts — Capítulo 2 | PROBLEMA
// Demonstra os sintomas da classe não coesa em execução.
// Para rodar: npx ts-node src/cap02-coesao-srp/problema/index.ts

import { CalculadoraDeSalario, Cargo, Funcionario } from "./CalculadoraDeSalario";

const calculadora = new CalculadoraDeSalario();

const dev: Funcionario    = { nome: "Ana",   cargo: Cargo.DESENVOLVEDOR, salarioBase: 4000 };
const devJunior: Funcionario = { nome: "Leonardo", cargo: Cargo.DESENVOLVEDOR, salarioBase: 2500 };
const dba: Funcionario    = { nome: "Bruno", cargo: Cargo.DBA, salarioBase: 1800 };
const tester: Funcionario = { nome: "Carolina", cargo: Cargo.TESTER, salarioBase: 2800 };

console.log("=== PROBLEMA: CalculadoraDeSalario não coesa ===\n");
console.log(`${dev.nome} (Desenvolvedor R$${dev.salarioBase}): R$ ${calculadora.calcula(dev)}`);
console.log(`${devJunior.nome} (Desenvolvedor R$${devJunior.salarioBase}): R$ ${calculadora.calcula(devJunior)}`);
console.log(`${dba.nome} (DBA R$${dba.salarioBase}): R$ ${calculadora.calcula(dba)}`);
console.log(`${tester.nome} (Tester R$${tester.salarioBase}): R$ ${calculadora.calcula(tester)}`);

console.log("\n Problemas desta abordagem:");
console.log("Adicionar Cargo.GERENTE = 2 pontos de mudança obrigatórios nesta classe");
console.log("Regras privadas são inacessíveis e impossíveis de reutilizar");
console.log("Qualquer if esquecido gera bug silencioso em produção");
console.log("Quanto mais cargos, mais ifs e métodos privados empilhados");