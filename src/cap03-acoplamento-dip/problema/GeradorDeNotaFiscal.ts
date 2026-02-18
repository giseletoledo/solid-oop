// PROBLEMA — Capítulo 3: GeradorDeNotaFiscal acoplado
//
// O Gerador conhece diretamente EnviadorDeEmail e NotaFiscalDao.
// Qualquer mudança nessas classes se propaga para o Gerador.
// Adicionar SAP, SMS, webhook = modificar o Gerador (viola SRP também).

export interface NotaFiscal {
  valor: number;
  imposto: number;
}

export interface Fatura {
  valorMensal: number;
}

// Implementação concreta — instável, pode mudar a qualquer hora
export class EnviadorDeEmail {
  enviaEmail(nf: NotaFiscal): void {
    console.log(`  [Email] Enviando NF de R$ ${nf.valor}...`);
  }
}

// Implementação concreta — instável, pode mudar a qualquer hora
export class NotaFiscalDao {
  persiste(nf: NotaFiscal): void {
    console.log(`  [Banco] Persistindo NF de R$ ${nf.valor}...`);
  }
}

// PROBLEMA: acoplado diretamente às implementações concretas
export class GeradorDeNotaFiscal {
  // Para adicionar SAP → precisa mudar o construtor
  // Para adicionar SMS → precisa mudar o construtor de novo
  constructor(
    private email: EnviadorDeEmail,    //  depende da implementação
    private dao: NotaFiscalDao         //  depende da implementação
  ) {}

  gera(fatura: Fatura): NotaFiscal {
    const valor = fatura.valorMensal;
    const nf: NotaFiscal = {
      valor,
      imposto: valor * 0.06,
    };

    // Se email mudar de interface → quebra aqui
    this.email.enviaEmail(nf);
    // Se dao mudar de interface → quebra aqui
    this.dao.persiste(nf);

    return nf;
  }
}