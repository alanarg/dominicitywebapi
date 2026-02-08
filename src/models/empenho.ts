export class Empenho {
  constructor(
    public  empenho_id: number,
    public secretaria_id: number,

    public descricao: string,

    public valor: number,
    public valor_pago: number,

    public data: Date,
    public data_vencimento: Date,

    public status: 'pendente' | 'pago' | 'vencido' | 'parcial',

    public rubrica: string,
    public setor_contabil: string,
    public projeto: string,
    public fornecedor: string,
    public contrato_id: number,
    public fonte: string,

    public ativo: boolean = true,
    public data_hora_inclusao: Date = new Date(),
    public data_hora_alteracao: Date = new Date(),
  ) {}

  marcarComoPago(valorPago?: number) {
    this.valor_pago = valorPago ?? this.valor;
    this.status = 'pago';
    this.data_hora_alteracao = new Date();
  }

  marcarComoParcial(valorPago: number) {
    if (valorPago <= 0 || valorPago >= this.valor) {
      throw new Error('Valor pago inválido para pagamento parcial');
    }

    this.valor_pago = valorPago;
    this.status = 'parcial';
    this.data_hora_alteracao = new Date();
  }

  marcarComoVencido() {
    this.status = 'vencido';
    this.data_hora_alteracao = new Date();
  }

  atualizarDados(dados: Partial<Omit<Empenho, 'empenho_id'>>) {
    Object.assign(this, dados);
    this.data_hora_alteracao = new Date();
  }

  desativar() {
    this.ativo = false;
    this.data_hora_alteracao = new Date();
  }
}
