// tests/cap03-acoplamento-dip/gerador.test.ts
//
// Demonstra a diferença de testabilidade entre as duas versões.
// A versão PROBLEMA é difícil de testar em isolamento.
// A versão CORREÇÃO permite usar spies sem nenhuma dependência real.

import { describe, it, expect, vi } from "vitest";

// ---- Versão PROBLEMA ----
import {
  GeradorDeNotaFiscal as GeradorProblema,
  EnviadorDeEmail,
  NotaFiscalDao,
  NotaFiscal as NotaFiscalProblema,
} from "../../src/cap03-acoplamento-dip/problema/GeradorDeNotaFiscal";

// ---- Versão CORREÇÃO ----
import {
  GeradorDeNotaFiscal as GeradorCorrecao,
  AcaoAposGerarNota,
  NotaFiscal as NotaFiscalCorrecao,
} from "../../src/cap03-acoplamento-dip/correcao/GeradorDeNotaFiscal";

// ─────────────────────────────────────────────────────────────
// TESTES DA VERSÃO PROBLEMA
// ─────────────────────────────────────────────────────────────
describe("PROBLEMA — GeradorDeNotaFiscal (acoplado)", () => {
  it("gera nota fiscal com valor e imposto corretos", () => {
    // ⚠️ Para testar o Gerador, SOMOS OBRIGADOS a instanciar
    //    EnviadorDeEmail e NotaFiscalDao — não tem como evitar.
    //    Em um caso real, isso abriria conexão com banco e enviaria email de verdade.
    const gerador = new GeradorProblema(
      new EnviadorDeEmail(),
      new NotaFiscalDao()
    );

    const nf = gerador.gera({ valorMensal: 1000 });

    expect(nf.valor).toBe(1000);
    expect(nf.imposto).toBe(60); // 1000 * 0.06
  });

  it("calcula imposto de 6% sobre o valor mensal", () => {
    const gerador = new GeradorProblema(
      new EnviadorDeEmail(),
      new NotaFiscalDao()
    );

    const nf = gerador.gera({ valorMensal: 5000 });

    expect(nf.imposto).toBe(300); // 5000 * 0.06
  });

  it("não é possível verificar se email foi enviado sem spy em métodos concretos", () => {
    // Para checar se enviaEmail foi chamado, precisamos espionar a instância concreta.
    // Isso significa que o TESTE conhece o detalhe de implementação — alto acoplamento.
    const emailSpy = vi.spyOn(EnviadorDeEmail.prototype, "enviaEmail");
    const daoSpy = vi.spyOn(NotaFiscalDao.prototype, "persiste");

    const gerador = new GeradorProblema(new EnviadorDeEmail(), new NotaFiscalDao());
    gerador.gera({ valorMensal: 1000 });

    expect(emailSpy).toHaveBeenCalledTimes(1);
    expect(daoSpy).toHaveBeenCalledTimes(1);

    // Problema: se mudar EnviadorDeEmail → este teste quebra também
    //    O teste está acoplado à implementação concreta, assim como o Gerador
    emailSpy.mockRestore();
    daoSpy.mockRestore();
  });
});

// ─────────────────────────────────────────────────────────────
// TESTES DA VERSÃO CORREÇÃO
// ─────────────────────────────────────────────────────────────
describe("CORREÇÃO — GeradorDeNotaFiscal (DIP aplicado)", () => {

  // Spy simples que implementa a interface — nenhuma dependência real
  const criarAcaoSpy = () => {
    const nfsRecebidas: NotaFiscalCorrecao[] = [];
    const acao: AcaoAposGerarNota = {
      executa: (nf) => nfsRecebidas.push(nf),
    };
    return { acao, nfsRecebidas };
  };

  it("gera nota fiscal com valor e imposto corretos", () => {
    const { acao } = criarAcaoSpy();
    const gerador = new GeradorCorrecao([acao]);

    const nf = gerador.gera({ valorMensal: 1000 });

    expect(nf.valor).toBe(1000);
    expect(nf.imposto).toBe(60);
  });

  it("calcula imposto de 6% sobre o valor mensal", () => {
    const { acao } = criarAcaoSpy();
    const gerador = new GeradorCorrecao([acao]);

    const nf = gerador.gera({ valorMensal: 5000 });

    expect(nf.imposto).toBe(300);
  });

  it("executa TODAS as ações registradas ao gerar NF", () => {
    // Testamos o comportamento sem conhecer as implementações concretas
    const spy1 = criarAcaoSpy();
    const spy2 = criarAcaoSpy();
    const spy3 = criarAcaoSpy();

    const gerador = new GeradorCorrecao([spy1.acao, spy2.acao, spy3.acao]);
    gerador.gera({ valorMensal: 1000 });

    expect(spy1.nfsRecebidas).toHaveLength(1);
    expect(spy2.nfsRecebidas).toHaveLength(1);
    expect(spy3.nfsRecebidas).toHaveLength(1);
  });

  it("passa a NF correta para cada ação", () => {
    const { acao, nfsRecebidas } = criarAcaoSpy();
    const gerador = new GeradorCorrecao([acao]);

    gerador.gera({ valorMensal: 2000 });

    expect(nfsRecebidas[0].valor).toBe(2000);
    expect(nfsRecebidas[0].imposto).toBe(120); // 2000 * 0.06
  });

  it("funciona com zero ações (nenhuma ação registrada)", () => {
    // O Gerador não sabe quantas ações existem — pode ser zero
    const gerador = new GeradorCorrecao([]);
    expect(() => gerador.gera({ valorMensal: 1000 })).not.toThrow();
  });

  it("adicionar nova ação não requer alterar GeradorDeNotaFiscal", () => {
    // Nova ação criada em linha — Gerador nem sabe que existe
    const novaAcao: AcaoAposGerarNota = {
      executa: vi.fn(),
    };

    const gerador = new GeradorCorrecao([novaAcao]);
    gerador.gera({ valorMensal: 500 });

    expect(novaAcao.executa).toHaveBeenCalledOnce();
  });
});