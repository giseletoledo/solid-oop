// CORREÇÃO — Capítulo 3: GeradorDeNotaFiscal com DIP
//
// O Gerador agora depende apenas da interface AcaoAposGerarNota.
// Adicionar SAP, SMS, webhook = criar nova classe + passar no construtor.
// O Gerador nunca precisa ser modificado. (Padrão Observer)

// --- Modelos ---
export interface NotaFiscal {
  valor: number;
  imposto: number;
}

export interface Fatura {
  valorMensal: number;
}

// ABSTRAÇÃO ESTÁVEL — contrato simples, difícil de mudar
// Múltiplas implementações = ninguém tem coragem de alterar esta interface
export interface AcaoAposGerarNota {
  executa(nf: NotaFiscal): void;
}

// Cada ação é independente — muda apenas se SUA regra mudar
export class EnviadorDeEmail implements AcaoAposGerarNota {
  executa(nf: NotaFiscal): void {
    console.log(`  [Email] NF de R$ ${nf.valor} enviada por e-mail`);
  }
}

export class NotaFiscalDao implements AcaoAposGerarNota {
  executa(nf: NotaFiscal): void {
    console.log(`  [Banco] NF de R$ ${nf.valor} persistida no banco`);
  }
}

export class EnviadorDeSMS implements AcaoAposGerarNota {
  executa(nf: NotaFiscal): void {
    console.log(`  [SMS]   NF de R$ ${nf.valor} notificada por SMS`);
  }
}

// Simula integração SAP — adicionada SEM tocar no GeradorDeNotaFiscal
export class SistemaSAP implements AcaoAposGerarNota {
  executa(nf: NotaFiscal): void {
    console.log(`  [SAP]   NF de R$ ${nf.valor} enviada ao ERP`);
  }
}

// CORREÇÃO: Gerador depende apenas da abstração
// Módulo de alto nível (Gerador) não conhece módulos de baixo nível (Email, DAO...)
export class GeradorDeNotaFiscal {
  // Recebe qualquer lista de ações — não importa quais são
  constructor(private acoes: AcaoAposGerarNota[]) {}

  gera(fatura: Fatura): NotaFiscal {
    const valor = fatura.valorMensal;
    const nf: NotaFiscal = {
      valor,
      imposto: valor * 0.06,
    };

    // Itera sobre a abstração — não conhece nenhuma implementação concreta
    for (const acao of this.acoes) {
      acao.executa(nf);
    }

    return nf;
  }
}

// --- Demonstração da correção ---
console.log("=== CORREÇÃO: DIP aplicado (padrão Observer) ===");
console.log();

// Composição feita FORA do Gerador — injeção de dependência manual
const gerador = new GeradorDeNotaFiscal([
  new EnviadorDeEmail(),
  new NotaFiscalDao(),
  new EnviadorDeSMS(),
  new SistemaSAP(), // ← adicionado sem tocar no GeradorDeNotaFiscal!
]);

const nf = gerador.gera({ valorMensal: 1000 });
console.log();
console.log(`NF gerada: valor=R$${nf.valor}, imposto=R$${nf.imposto}`);
console.log();
console.log("Vantagens desta abordagem:");
console.log("Adicionar WebhookExterno: criar classe + passar na lista (Gerador intocado!)");
console.log("Testar Gerador: passar um mock de AcaoAposGerarNota");
console.log("Cada ação tem uma única responsabilidade (SRP + DIP)");
console.log("Interface AcaoAposGerarNota é estável — difícil de mudar");