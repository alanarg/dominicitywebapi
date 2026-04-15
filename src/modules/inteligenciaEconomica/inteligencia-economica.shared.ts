import { PrismaClient } from "@prisma/client";

type PrismaLike = Pick<
  PrismaClient,
  "secretaria" | "empenho" | "contrato" | "licitacao"
>;

type DecimalLike = {
  toNumber?: () => number;
};

type EconomicSignalLevel = "positivo" | "atencao" | "critico" | "neutro";

type EconomicSignal = {
  nivel: EconomicSignalLevel;
  titulo: string;
  descricao: string;
};

type EconomicContext = {
  secretaria: {
    secretaria_id: number;
    nome: string;
    sigla: string;
    orcamento_total: DecimalLike | number;
    total_empenhado: DecimalLike | number;
    total_pago: DecimalLike | number;
    risco_orcamentario: string;
    risco_divida: string;
    ultima_atualizacao: Date;
  };
  empenhos: Array<{
    empenho_id: number;
    descricao: string;
    valor: DecimalLike | number;
    valor_pago: DecimalLike | number;
    data: Date;
    data_vencimento: Date;
    status: string;
    fornecedor: string;
    fonte: string;
  }>;
  contratos: Array<{
    contrato_id: number;
    numero: string;
    objeto: string;
    fornecedor: string;
    valor_total: DecimalLike | number;
    data_vigencia: Date;
    status: string;
    data_hora_inclusao: Date;
    licitacao: {
      licitacao_id: number;
      numero: string;
      modalidade: string;
      status: string;
      data_abertura: Date;
    } | null;
  }>;
  licitacoes: Array<{
    licitacao_id: number;
    numero: string;
    objeto: string;
    modalidade: string;
    valor_estimado: DecimalLike | number;
    status: string;
    data_abertura: Date;
    data_hora_inclusao: Date;
  }>;
};

const DEFAULT_WINDOW_DAYS = 90;
const MAX_WINDOW_DAYS = 365;

export async function fetchEconomicIntelligenceContext(
  prisma: PrismaLike,
  secretariaId: number,
): Promise<EconomicContext | null> {
  const secretaria = await prisma.secretaria.findUnique({
    where: { secretaria_id: secretariaId },
    select: {
      secretaria_id: true,
      nome: true,
      sigla: true,
      orcamento_total: true,
      total_empenhado: true,
      total_pago: true,
      risco_orcamentario: true,
      risco_divida: true,
      ultima_atualizacao: true,
    },
  });

  if (!secretaria) {
    return null;
  }

  const [empenhos, contratos, licitacoes] = await Promise.all([
    prisma.empenho.findMany({
      where: {
        secretaria_id: secretariaId,
        ativo: true,
      },
      select: {
        empenho_id: true,
        descricao: true,
        valor: true,
        valor_pago: true,
        data: true,
        data_vencimento: true,
        status: true,
        fornecedor: true,
        fonte: true,
      },
      orderBy: {
        data: "desc",
      },
    }),
    prisma.contrato.findMany({
      where: {
        ativo: true,
        licitacao: {
          secretaria_id: secretariaId,
        },
      },
      select: {
        contrato_id: true,
        numero: true,
        objeto: true,
        fornecedor: true,
        valor_total: true,
        data_vigencia: true,
        status: true,
        data_hora_inclusao: true,
        licitacao: {
          select: {
            licitacao_id: true,
            numero: true,
            modalidade: true,
            status: true,
            data_abertura: true,
          },
        },
      },
      orderBy: {
        data_hora_inclusao: "desc",
      },
    }),
    prisma.licitacao.findMany({
      where: {
        secretaria_id: secretariaId,
        ativo: true,
      },
      select: {
        licitacao_id: true,
        numero: true,
        objeto: true,
        modalidade: true,
        valor_estimado: true,
        status: true,
        data_abertura: true,
        data_hora_inclusao: true,
      },
      orderBy: {
        data_abertura: "desc",
      },
    }),
  ]);

  return {
    secretaria,
    empenhos,
    contratos,
    licitacoes,
  };
}

export function normalizeWindowDays(windowDays?: number) {
  if (!windowDays || Number.isNaN(windowDays)) {
    return DEFAULT_WINDOW_DAYS;
  }

  return Math.min(Math.max(Math.trunc(windowDays), 1), MAX_WINDOW_DAYS);
}

export function buildEconomicIntelligenceReport(
  context: EconomicContext,
  windowDays = DEFAULT_WINDOW_DAYS,
) {
  const normalizedWindowDays = normalizeWindowDays(windowDays);
  const now = new Date();
  const windowStart = new Date(now);
  windowStart.setDate(windowStart.getDate() - normalizedWindowDays);

  const expiryLimit = new Date(now);
  expiryLimit.setDate(expiryLimit.getDate() + 30);

  const recentEmpenhos = context.empenhos.filter((item) => item.data >= windowStart);
  const recentContratos = context.contratos.filter(
    (item) => item.data_hora_inclusao >= windowStart,
  );
  const recentLicitacoes = context.licitacoes.filter(
    (item) => item.data_abertura >= windowStart,
  );

  const totalEmpenhadoRecente = sumBy(recentEmpenhos, "valor");
  const totalPagoRecente = sumBy(recentEmpenhos, "valor_pago");
  const coberturaPagamento =
    totalEmpenhadoRecente > 0 ? totalPagoRecente / totalEmpenhadoRecente : 0;

  const empenhosEmAtraso = context.empenhos.filter(
    (item) =>
      item.data_vencimento < now && toNumber(item.valor_pago) < toNumber(item.valor),
  );
  const valorEmAtraso = sumBy(empenhosEmAtraso, "valor");

  const contratosExpirando = context.contratos.filter(
    (item) => item.data_vigencia >= now && item.data_vigencia <= expiryLimit,
  );
  const valorContratos = sumBy(context.contratos, "valor_total");
  const valorLicitacoesRecentes = sumBy(recentLicitacoes, "valor_estimado");

  const licitacoesAbertas = context.licitacoes.filter((item) =>
    isOneOf(item.status, ["aberta", "aberto", "andamento", "em andamento", "publicada"]),
  );
  const licitacoesCriticas = context.licitacoes.filter((item) =>
    isOneOf(item.status, ["suspensa", "suspenso", "fracassada", "deserta", "anulada"]),
  );

  const fornecedorLider = getTopFornecedor(context.empenhos);
  const modalidadeLider = getTopModalidade(recentLicitacoes);

  const comprometimentoOrcamentario =
    toNumber(context.secretaria.orcamento_total) > 0
      ? toNumber(context.secretaria.total_empenhado) /
        toNumber(context.secretaria.orcamento_total)
      : 0;

  const sinais = buildSignals({
    recentEmpenhos: recentEmpenhos.length,
    recentContratos: recentContratos.length,
    recentLicitacoes: recentLicitacoes.length,
    coberturaPagamento,
    overdueCount: empenhosEmAtraso.length,
    contratosExpirando: contratosExpirando.length,
    licitacoesCriticas: licitacoesCriticas.length,
    comprometimentoOrcamentario,
    fornecedorLider,
    modalidadeLider,
  });

  const riscos = buildRisks({
    empenhosEmAtraso: empenhosEmAtraso.length,
    contratosExpirando: contratosExpirando.length,
    licitacoesCriticas: licitacoesCriticas.length,
    coberturaPagamento,
    riscoOrcamentario: context.secretaria.risco_orcamentario,
    riscoDivida: context.secretaria.risco_divida,
  });

  const oportunidades = buildOpportunities({
    recentLicitacoes: recentLicitacoes.length,
    licitacoesAbertas: licitacoesAbertas.length,
    modalidadeLider,
    coberturaPagamento,
    recentContratos: recentContratos.length,
  });

  return {
    geradoEm: now.toISOString(),
    secretaria: {
      id: context.secretaria.secretaria_id,
      nome: context.secretaria.nome,
      sigla: context.secretaria.sigla,
      ultimaAtualizacao: context.secretaria.ultima_atualizacao.toISOString(),
      riscoOrcamentario: context.secretaria.risco_orcamentario,
      riscoDivida: context.secretaria.risco_divida,
    },
    janelaAnalise: {
      dias: normalizedWindowDays,
      inicio: windowStart.toISOString(),
      fim: now.toISOString(),
    },
    indicadores: {
      orcamento: {
        total: toNumber(context.secretaria.orcamento_total),
        totalEmpenhadoAcumulado: toNumber(context.secretaria.total_empenhado),
        totalPagoAcumulado: toNumber(context.secretaria.total_pago),
        comprometimentoPct: round(comprometimentoOrcamentario * 100),
      },
      empenhos: {
        quantidadeRecentes: recentEmpenhos.length,
        totalEmpenhadoRecente,
        totalPagoRecente,
        coberturaPagamentoPct: round(coberturaPagamento * 100),
        emAtraso: {
          quantidade: empenhosEmAtraso.length,
          valor: valorEmAtraso,
        },
      },
      contratos: {
        quantidadeAtivos: context.contratos.length,
        quantidadeRecentes: recentContratos.length,
        valorTotalAtivo: valorContratos,
        expirandoEm30Dias: contratosExpirando.length,
      },
      licitacoes: {
        quantidadeAtivas: context.licitacoes.length,
        quantidadeRecentes: recentLicitacoes.length,
        valorEstimadoRecente: valorLicitacoesRecentes,
        abertasOuEmAndamento: licitacoesAbertas.length,
        criticas: licitacoesCriticas.length,
      },
      concentracaoFornecedor: fornecedorLider,
      modalidadePredominante: modalidadeLider,
    },
    analise: {
      resumoExecutivo: buildExecutiveSummary({
        secretaria: context.secretaria.nome,
        recentEmpenhos: recentEmpenhos.length,
        recentContratos: recentContratos.length,
        recentLicitacoes: recentLicitacoes.length,
        coberturaPagamento,
        contratosExpirando: contratosExpirando.length,
        fornecedorLider,
      }),
      sinais,
      riscos,
      oportunidades,
      perguntasSugeridas: buildQuestions({
        contratosExpirando: contratosExpirando.length,
        licitacoesCriticas: licitacoesCriticas.length,
        fornecedorLider,
      }),
    },
  };
}

export function formatEconomicIntelligenceReport(
  report: ReturnType<typeof buildEconomicIntelligenceReport>,
) {
  const sinalLines = report.analise.sinais.map(
    (item) => `- [${item.nivel}] ${item.titulo}: ${item.descricao}`,
  );
  const riscoLines = report.analise.riscos.map((item) => `- ${item}`);
  const oportunidadeLines = report.analise.oportunidades.map((item) => `- ${item}`);

  return [
    `Inteligencia economica da secretaria ${report.secretaria.nome} (${report.secretaria.sigla})`,
    `Janela analisada: ${report.janelaAnalise.dias} dias`,
    "",
    report.analise.resumoExecutivo,
    "",
    `Empenhos recentes: ${report.indicadores.empenhos.quantidadeRecentes} | total empenhado ${formatMoney(report.indicadores.empenhos.totalEmpenhadoRecente)} | cobertura de pagamento ${report.indicadores.empenhos.coberturaPagamentoPct}%`,
    `Contratos ativos: ${report.indicadores.contratos.quantidadeAtivos} | expirando em 30 dias: ${report.indicadores.contratos.expirandoEm30Dias}`,
    `Licitacoes recentes: ${report.indicadores.licitacoes.quantidadeRecentes} | abertas/em andamento: ${report.indicadores.licitacoes.abertasOuEmAndamento}`,
    "",
    "Sinais qualitativos:",
    ...sinalLines,
    "",
    "Riscos observados:",
    ...riscoLines,
    "",
    "Oportunidades:",
    ...oportunidadeLines,
  ].join("\n");
}

export function answerEconomicQuestion(
  report: ReturnType<typeof buildEconomicIntelligenceReport>,
  question: string,
) {
  const normalizedQuestion = normalizeLabel(question);
  const topics = detectQuestionTopics(normalizedQuestion);

  const parts: string[] = [];

  parts.push(`Pergunta interpretada: ${buildIntentLabel(topics)}.`);

  if (topics.includes("empenhos")) {
    parts.push(
      `Nos ultimos ${report.janelaAnalise.dias} dias, a secretaria registrou ${report.indicadores.empenhos.quantidadeRecentes} empenhos relevantes, somando ${formatMoney(report.indicadores.empenhos.totalEmpenhadoRecente)}. O pagamento no periodo atingiu ${formatMoney(report.indicadores.empenhos.totalPagoRecente)}, com cobertura de ${report.indicadores.empenhos.coberturaPagamentoPct}%.`,
    );

    if (report.indicadores.empenhos.emAtraso.quantidade > 0) {
      parts.push(
        `Ha ${report.indicadores.empenhos.emAtraso.quantidade} empenhos em atraso, com impacto estimado de ${formatMoney(report.indicadores.empenhos.emAtraso.valor)}.`,
      );
    }
  }

  if (topics.includes("contratos")) {
    parts.push(
      `A carteira atual tem ${report.indicadores.contratos.quantidadeAtivos} contratos ativos, com valor total de ${formatMoney(report.indicadores.contratos.valorTotalAtivo)}. ${report.indicadores.contratos.expirandoEm30Dias} vencem nos proximos 30 dias.`,
    );
  }

  if (topics.includes("licitacoes")) {
    parts.push(
      `O pipeline licitatorio mostra ${report.indicadores.licitacoes.quantidadeRecentes} licitacoes recentes na janela analisada, ${report.indicadores.licitacoes.abertasOuEmAndamento} abertas ou em andamento e ${report.indicadores.licitacoes.criticas} em situacao critica.`,
    );
  }

  if (topics.includes("fornecedor")) {
    const fornecedor = report.indicadores.concentracaoFornecedor;
    if (fornecedor.fornecedor) {
      parts.push(
        `O fornecedor com maior peso no periodo foi ${fornecedor.fornecedor}, concentrando ${fornecedor.participacaoPct}% do valor empenhado, equivalente a ${formatMoney(fornecedor.valor)}.`,
      );
    } else {
      parts.push("Nao foi identificada concentracao relevante de fornecedor na base analisada.");
    }
  }

  if (topics.includes("orcamento")) {
    parts.push(
      `O orcamento total da secretaria e ${formatMoney(report.indicadores.orcamento.total)}. O comprometimento acumulado esta em ${report.indicadores.orcamento.comprometimentoPct}%, com ${formatMoney(report.indicadores.orcamento.totalEmpenhadoAcumulado)} empenhados e ${formatMoney(report.indicadores.orcamento.totalPagoAcumulado)} pagos.`,
    );
  }

  if (topics.includes("risco")) {
    const mainRisk = report.analise.riscos[0] ?? "Nao foram encontrados riscos relevantes na leitura atual.";
    parts.push(`O principal risco identificado agora e: ${mainRisk}`);
  }

  if (topics.includes("resumo")) {
    parts.push(report.analise.resumoExecutivo);
  }

  if (parts.length === 1) {
    parts.push(report.analise.resumoExecutivo);
    parts.push(
      `Hoje, os pontos mais sensiveis estao ligados a ${report.analise.sinais
        .slice(0, 2)
        .map((item) => item.titulo.toLowerCase())
        .join(" e ") || "movimentacao economica recente"}.`,
    );
  }

  return {
    pergunta: question,
    interpretacao: buildIntentLabel(topics),
    resposta: parts.join(" "),
    topicos: topics,
    sugestoes: report.analise.perguntasSugeridas.slice(0, 3),
  };
}

function buildSignals(input: {
  recentEmpenhos: number;
  recentContratos: number;
  recentLicitacoes: number;
  coberturaPagamento: number;
  overdueCount: number;
  contratosExpirando: number;
  licitacoesCriticas: number;
  comprometimentoOrcamentario: number;
  fornecedorLider: { fornecedor: string | null; participacaoPct: number; valor: number };
  modalidadeLider: { modalidade: string | null; quantidade: number };
}): EconomicSignal[] {
  const sinais: EconomicSignal[] = [];

  if (input.recentEmpenhos + input.recentContratos + input.recentLicitacoes === 0) {
    sinais.push({
      nivel: "atencao",
      titulo: "Baixa movimentacao recente",
      descricao:
        "A janela analisada mostra pouca atividade nova, o que pode indicar desaceleracao operacional ou atraso na alimentacao da base.",
    });
  }

  if (input.coberturaPagamento >= 0.8) {
    sinais.push({
      nivel: "positivo",
      titulo: "Boa conversao de empenho em pagamento",
      descricao:
        "A cobertura de pagamento recente esta alta, sugerindo melhor execucao financeira no curto prazo.",
    });
  } else if (input.coberturaPagamento < 0.45) {
    sinais.push({
      nivel: "critico",
      titulo: "Baixa cobertura de pagamento",
      descricao:
        "O volume pago ficou muito abaixo do empenhado na janela, sinalizando pressao de caixa ou aculo operacional.",
    });
  }

  if (input.overdueCount > 0) {
    sinais.push({
      nivel: input.overdueCount >= 5 ? "critico" : "atencao",
      titulo: "Passivo financeiro em aberto",
      descricao:
        "Existem empenhos vencidos sem quitacao integral, o que merece revisao priorizada da fila de pagamentos.",
    });
  }

  if (input.contratosExpirando > 0) {
    sinais.push({
      nivel: "atencao",
      titulo: "Contratos proximos do vencimento",
      descricao:
        "Ha contratos relevantes perto do fim da vigencia, o que pode gerar descontinuidade se a renovacao ou substituicao nao avancar.",
    });
  }

  if (input.licitacoesCriticas > 0) {
    sinais.push({
      nivel: "atencao",
      titulo: "Gargalos no pipeline licitatorio",
      descricao:
        "Licitacoes suspensas, fracassadas ou desertas reduzem a capacidade de reposicao contratual e atrasam entregas.",
    });
  }

  if (input.comprometimentoOrcamentario >= 0.85) {
    sinais.push({
      nivel: "critico",
      titulo: "Orcamento fortemente comprometido",
      descricao:
        "A secretaria ja consumiu parcela muito alta do orcamento, reduzindo flexibilidade para novas despesas.",
    });
  }

  if (
    input.fornecedorLider.fornecedor &&
    input.fornecedorLider.participacaoPct >= 40
  ) {
    sinais.push({
      nivel: "atencao",
      titulo: "Concentracao em fornecedor",
      descricao: `O fornecedor ${input.fornecedorLider.fornecedor} concentra ${input.fornecedorLider.participacaoPct}% do valor empenhado, o que sugere dependencia acima do ideal.`,
    });
  }

  if (input.modalidadeLider.modalidade && input.modalidadeLider.quantidade > 0) {
    sinais.push({
      nivel: "neutro",
      titulo: "Modalidade predominante",
      descricao: `A modalidade ${input.modalidadeLider.modalidade} lidera as licitacoes recentes e ajuda a caracterizar o perfil atual das aquisicoes.`,
    });
  }

  return sinais.slice(0, 6);
}

function buildRisks(input: {
  empenhosEmAtraso: number;
  contratosExpirando: number;
  licitacoesCriticas: number;
  coberturaPagamento: number;
  riscoOrcamentario: string;
  riscoDivida: string;
}) {
  const riscos: string[] = [];

  if (input.empenhosEmAtraso > 0) {
    riscos.push(
      "Empenhos vencidos podem virar pressao reputacional, passivo com fornecedores e demanda de reprogramacao financeira.",
    );
  }

  if (input.coberturaPagamento < 0.5) {
    riscos.push(
      "A distancia entre empenho e pagamento sugere risco de acumulacao de obrigacoes no curto prazo.",
    );
  }

  if (input.contratosExpirando > 0) {
    riscos.push(
      "Contratos proximos do termino podem afetar a continuidade de servicos se a renovacao nao estiver em curso.",
    );
  }

  if (input.licitacoesCriticas > 0) {
    riscos.push(
      "Eventos licitatorios criticos podem atrasar reposicao de contratos e comprometer planejamento operacional.",
    );
  }

  riscos.push(`Risco orcamentario informado pela base: ${input.riscoOrcamentario}.`);
  riscos.push(`Risco de divida informado pela base: ${input.riscoDivida}.`);

  return riscos;
}

function buildOpportunities(input: {
  recentLicitacoes: number;
  licitacoesAbertas: number;
  modalidadeLider: { modalidade: string | null; quantidade: number };
  coberturaPagamento: number;
  recentContratos: number;
}) {
  const oportunidades: string[] = [];

  if (input.licitacoesAbertas > 0) {
    oportunidades.push(
      "Existe pipeline licitatorio em andamento que pode renovar oferta, aumentar competicao e reduzir dependencia contratual.",
    );
  }

  if (input.recentContratos > 0) {
    oportunidades.push(
      "Os contratos recentes podem ser usados como base para revisar mix de fornecedores e SLA de entrega.",
    );
  }

  if (input.coberturaPagamento >= 0.7) {
    oportunidades.push(
      "O ritmo de pagamento recente favorece negociacoes com fornecedores e melhora previsibilidade de execucao.",
    );
  }

  if (input.modalidadeLider.modalidade) {
    oportunidades.push(
      `A predominancia de ${input.modalidadeLider.modalidade} permite avaliar padronizacao do processo e comparacao de desempenho por modalidade.`,
    );
  }

  if (input.recentLicitacoes === 0) {
    oportunidades.push(
      "Uma agenda proativa de novas licitacoes pode reduzir risco de ruptura e distribuir melhor a carteira de compras.",
    );
  }

  return oportunidades;
}

function buildQuestions(input: {
  contratosExpirando: number;
  licitacoesCriticas: number;
  fornecedorLider: { fornecedor: string | null; participacaoPct: number; valor: number };
}) {
  const perguntas = [
    "Quais centros de custo estao puxando a maior parte dos empenhos recentes?",
    "Quais itens ou objetos aparecem com maior recorrencia e poderiam ser tratados com planejamento agregado?",
  ];

  if (input.contratosExpirando > 0) {
    perguntas.push(
      "Quais contratos com vencimento proximo ja possuem processo de renovacao ou substituicao aberto?",
    );
  }

  if (input.licitacoesCriticas > 0) {
    perguntas.push(
      "As licitacoes criticas estao travadas por especificacao, mercado ou fluxo interno de aprovacao?",
    );
  }

  if (input.fornecedorLider.fornecedor) {
    perguntas.push(
      `A concentracao em ${input.fornecedorLider.fornecedor} decorre de especializacao tecnica ou de baixa concorrencia no mercado?`,
    );
  }

  return perguntas;
}

function buildExecutiveSummary(input: {
  secretaria: string;
  recentEmpenhos: number;
  recentContratos: number;
  recentLicitacoes: number;
  coberturaPagamento: number;
  contratosExpirando: number;
  fornecedorLider: { fornecedor: string | null; participacaoPct: number; valor: number };
}) {
  const intensidade =
    input.recentEmpenhos + input.recentContratos + input.recentLicitacoes >= 15
      ? "intensa"
      : input.recentEmpenhos + input.recentContratos + input.recentLicitacoes >= 6
        ? "moderada"
        : "baixa";

  const cobrancaPagamento =
    input.coberturaPagamento >= 0.75
      ? "com boa traducao em pagamento"
      : input.coberturaPagamento >= 0.45
        ? "com conversao parcial em pagamento"
        : "com folga relevante entre empenho e pagamento";

  const contratosTexto =
    input.contratosExpirando > 0
      ? `Ha ${input.contratosExpirando} contratos que vencem nos proximos 30 dias.`
      : "Nao ha contratos vencendo nos proximos 30 dias.";

  const concentracaoTexto =
    input.fornecedorLider.fornecedor
      ? `O principal fornecedor no periodo foi ${input.fornecedorLider.fornecedor}, com ${input.fornecedorLider.participacaoPct}% do valor empenhado.`
      : "Nao houve concentracao relevante de fornecedor na amostra analisada.";

  return `A secretaria ${input.secretaria} apresenta movimentacao ${intensidade} na janela analisada, ${cobrancaPagamento}. ${contratosTexto} ${concentracaoTexto}`;
}

function detectQuestionTopics(question: string) {
  const topics = new Set<string>();

  if (
    containsAny(question, [
      "empenho",
      "empenhos",
      "pagamento",
      "pagamentos",
      "despesa",
      "despesas",
      "gasto",
      "gastos",
    ])
  ) {
    topics.add("empenhos");
  }

  if (
    containsAny(question, [
      "contrato",
      "contratos",
      "vigencia",
      "vencimento",
      "fornecedor contratado",
    ])
  ) {
    topics.add("contratos");
  }

  if (
    containsAny(question, [
      "licitacao",
      "licitacoes",
      "pregao",
      "concorrencia",
      "modalidade",
      "edital",
    ])
  ) {
    topics.add("licitacoes");
  }

  if (
    containsAny(question, [
      "fornecedor",
      "fornecedores",
      "concentracao",
      "dependencia",
    ])
  ) {
    topics.add("fornecedor");
  }

  if (
    containsAny(question, [
      "orcamento",
      "orcamentario",
      "saldo",
      "comprometimento",
      "financeiro",
    ])
  ) {
    topics.add("orcamento");
  }

  if (
    containsAny(question, [
      "risco",
      "riscos",
      "problema",
      "problemas",
      "alerta",
      "gargalo",
      "critico",
    ])
  ) {
    topics.add("risco");
  }

  if (
    containsAny(question, [
      "resumo",
      "panorama",
      "situacao",
      "cenario",
      "como esta",
      "visao geral",
    ])
  ) {
    topics.add("resumo");
  }

  if (topics.size === 0) {
    topics.add("resumo");
  }

  return [...topics];
}

function buildIntentLabel(topics: string[]) {
  const labels: Record<string, string> = {
    empenhos: "consulta sobre execucao de empenhos e pagamentos",
    contratos: "consulta sobre carteira contratual",
    licitacoes: "consulta sobre pipeline licitatorio",
    fornecedor: "consulta sobre concentracao de fornecedores",
    orcamento: "consulta sobre situacao orcamentaria",
    risco: "consulta sobre riscos atuais",
    resumo: "pedido de panorama geral",
  };

  return topics.map((topic) => labels[topic] ?? topic).join(", ");
}

function containsAny(text: string, values: string[]) {
  return values.some((value) => text.includes(normalizeLabel(value)));
}

function getTopFornecedor(
  empenhos: EconomicContext["empenhos"],
): { fornecedor: string | null; participacaoPct: number; valor: number } {
  const totals = new Map<string, number>();

  for (const empenho of empenhos) {
    const fornecedor = cleanLabel(empenho.fornecedor);
    if (!fornecedor) {
      continue;
    }

    totals.set(fornecedor, (totals.get(fornecedor) ?? 0) + toNumber(empenho.valor));
  }

  if (totals.size === 0) {
    return { fornecedor: null, participacaoPct: 0, valor: 0 };
  }

  const totalGeral = [...totals.values()].reduce((sum, value) => sum + value, 0);
  const [fornecedor, valor] = [...totals.entries()].sort((a, b) => b[1] - a[1])[0];

  return {
    fornecedor,
    valor: round(valor),
    participacaoPct: totalGeral > 0 ? round((valor / totalGeral) * 100) : 0,
  };
}

function getTopModalidade(
  licitacoes: EconomicContext["licitacoes"],
): { modalidade: string | null; quantidade: number } {
  const totals = new Map<string, number>();

  for (const licitacao of licitacoes) {
    const modalidade = cleanLabel(licitacao.modalidade);
    if (!modalidade) {
      continue;
    }

    totals.set(modalidade, (totals.get(modalidade) ?? 0) + 1);
  }

  if (totals.size === 0) {
    return { modalidade: null, quantidade: 0 };
  }

  const [modalidade, quantidade] = [...totals.entries()].sort((a, b) => b[1] - a[1])[0];

  return { modalidade, quantidade };
}

function isOneOf(value: string, accepted: string[]) {
  const normalized = normalizeLabel(value);
  return accepted.some((item) => normalized.includes(normalizeLabel(item)));
}

function normalizeLabel(value: string | null | undefined) {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function cleanLabel(value: string | null | undefined) {
  const normalized = (value ?? "").trim();
  return normalized.length > 0 ? normalized : null;
}

function sumBy<T extends Record<string, unknown>>(items: T[], key: keyof T) {
  return round(
    items.reduce((sum, item) => sum + toNumber(item[key] as DecimalLike | number), 0),
  );
}

function toNumber(value: DecimalLike | number | null | undefined) {
  if (typeof value === "number") {
    return value;
  }

  if (value && typeof value.toNumber === "function") {
    return value.toNumber();
  }

  return Number(value ?? 0);
}

function round(value: number) {
  return Number(value.toFixed(2));
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value);
}
