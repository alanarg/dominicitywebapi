import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ==========================
// FUNÇÕES AUXILIARES
// ==========================
const gerarDadosMensais = (
    orcamentoBase: number,
    multiplicador: number
) => {
    return Array.from({ length: 12 }, (_, idx) => {
        const orcamento = (orcamentoBase / 12) * multiplicador
        const empenhado = orcamento * (0.7 + Math.random() * 0.25)
        const pago = empenhado * (0.6 + Math.random() * 0.35)

        return {
            mes: idx + 1,
            orcamento_total: Math.round(orcamento),
            total_empenhado: Math.round(empenhado),
            total_pago: Math.round(pago)
        }
    })
}

const calcularRiscoOrcamentario = (
    empenhado: number,
    orcamento: number
): string => {
    const percentual = (empenhado / orcamento) * 100

    if (percentual < 70) return 'baixo'
    if (percentual < 85) return 'medio'
    if (percentual < 95) return 'alto'
    return 'critico'
}

const calcularRiscoDivida = (
    empenhado: number,
    pago: number
): string => {
    const percentual = (pago / empenhado) * 100

    if (percentual > 85) return 'baixo'
    if (percentual > 70) return 'medio'
    if (percentual > 55) return 'alto'
    return 'critico'
}

// ==========================
// DADOS BASE
// ==========================
const secretarias = [
    {
        nome: 'Saúde',
        sigla: 'SAUDE',
        descricao: 'Gestão da saúde municipal',
        cor: 'hsl(var(--destructive))',
        icone: 'Heart',
        href: '/saude',
        orcamentoTotal: 18500000,
        totalEmpenhado: 12580000,
        totalPago: 9200000,
        sistema: 'e-SUS / DATASUS'
    },
    {
        nome: 'Educação',
        sigla: 'EDUC',
        descricao: 'Gestão educacional',
        cor: 'hsl(var(--primary))',
        icone: 'GraduationCap',
        href: '/educacao',
        orcamentoTotal: 22100000,
        totalEmpenhado: 15700000,
        totalPago: 12800000,
        sistema: 'SIGEDUC'
    },
    {
        nome: 'Infraestrutura',
        sigla: 'INFRA',
        descricao: 'Obras e manutenção',
        cor: 'hsl(var(--warning))',
        icone: 'Building2',
        href: '/infraestrutura',
        orcamentoTotal: 15800000,
        totalEmpenhado: 14200000,
        totalPago: 8500000,
        sistema: 'SISOBRAS'
    },
    {
        nome: 'Adm & Finanças',
        sigla: 'ADMFIN',
        descricao: 'Administração e finanças',
        cor: 'hsl(var(--success))',
        icone: 'Landmark',
        href: '/adm-financas',
        orcamentoTotal: 8500000,
        totalEmpenhado: 6800000,
        totalPago: 5900000,
        sistema: 'SIAFEM'
    },
    {
        nome: 'Recursos Humanos',
        sigla: 'RH',
        descricao: 'Gestão de pessoal e folha',
        cor: 'hsl(var(--primary))',
        icone: 'Users',
        href: '/rh',
        orcamentoTotal: 45000000,
        totalEmpenhado: 42000000,
        totalPago: 41500000,
        sistema: 'SIGRH / Folha de Pagamento'
    },
    {
        nome: 'Autarquias (SAAE)',
        sigla: 'SAAE',
        descricao: 'Água, esgoto e lixo',
        cor: 'hsl(var(--primary))',
        icone: 'Droplets',
        href: '/autarquias',
        orcamentoTotal: 12000000,
        totalEmpenhado: 9800000,
        totalPago: 8200000,
        sistema: 'GSAN'
    },
    {
        nome: 'Assistência Social',
        sigla: 'ASSIST',
        descricao: 'Programas sociais',
        cor: 'hsl(var(--warning))',
        icone: 'HandHeart',
        href: '/assistencia',
        orcamentoTotal: 5600000,
        totalEmpenhado: 4600000,
        totalPago: 4100000,
        sistema: 'SUAS / CadÚnico'
    },
    {
        nome: 'Meio Ambiente',
        sigla: 'MEIOAMB',
        descricao: 'Gestão ambiental',
        cor: 'hsl(var(--success))',
        icone: 'Leaf',
        href: '/meio-ambiente',
        orcamentoTotal: 3200000,
        totalEmpenhado: 2400000,
        totalPago: 2100000,
        sistema: 'SIAM'
    },
    {
        nome: 'Cultura',
        sigla: 'CULT',
        descricao: 'Eventos e projetos culturais',
        cor: 'hsl(var(--primary))',
        icone: 'Palette',
        href: '/cultura',
        orcamentoTotal: 2800000,
        totalEmpenhado: 2200000,
        totalPago: 1800000,
        sistema: 'SIC'
    },
    {
        nome: 'Desenvolvimento Econômico',
        sigla: 'DE',
        descricao: 'Tributário e econômico',
        cor: 'hsl(var(--success))',
        icone: 'TrendingUp',
        href: '/desenvolvimento-economico',
        orcamentoTotal: 4500000,
        totalEmpenhado: 3200000,
        totalPago: 2800000,
        sistema: 'SIAFI'
    },
    {
        nome: 'Gestor de Frotas',
        sigla: 'FROTAS',
        descricao: 'Gestão de veículos',
        cor: 'hsl(var(--warning))',
        icone: 'Truck',
        href: '/gestor-frotas',
        orcamentoTotal: 3800000,
        totalEmpenhado: 3200000,
        totalPago: 2900000,
        sistema: 'SGF'
    },
    {
        nome: 'Contabilidade',
        sigla: 'CONT',
        descricao: 'Gestão contábil',
        cor: 'hsl(var(--primary))',
        icone: 'Calculator',
        href: '/contabilidade',
        orcamentoTotal: 1200000,
        totalEmpenhado: 980000,
        totalPago: 920000,
        sistema: 'SIAFEM'
    }
]

// ==========================
// SEED
// ==========================
async function main() {

    const prefeitura = await prisma.prefeitura.upsert({
        where: { prefeitura_id: 1 },
        update: {},
        create: {
            prefeitura_id: 1,
            nome: 'Prefeitura Municipal (Seed)',
            ativo: true
        }
    })

    const prefeituraId = prefeitura.prefeitura_id

    for (const sec of secretarias) {
        const riscoOrc = calcularRiscoOrcamentario(
            sec.totalEmpenhado,
            sec.orcamentoTotal
        )

        const riscoDiv = calcularRiscoDivida(
            sec.totalEmpenhado,
            sec.totalPago
        )

        const secretaria = await prisma.secretaria.create({
            data: {
                prefeitura_id: prefeituraId,
                nome: sec.nome,
                sigla: sec.sigla,
                descricao: sec.descricao,
                cor: sec.cor,
                icone: sec.icone,
                href: sec.href,

                orcamento_total: sec.orcamentoTotal,
                total_empenhado: sec.totalEmpenhado,
                total_pago: sec.totalPago,

                risco_orcamentario: riscoOrc,
                risco_divida: riscoDiv,

                sistema_integrado: sec.sistema,
                fonte_dos_dados: sec.sistema,
                ultima_atualizacao: new Date(),
                ativo: true
            }
        })

        const anos = {
            2024: 1,
            2023: 0.92,
            2022: 0.85,
            2021: 0.78
        }

        for (const [ano, multiplicador] of Object.entries(anos)) {
            const dadosMensais = gerarDadosMensais(
                sec.orcamentoTotal,
                multiplicador
            )

            await prisma.secretaria_dados_anuais.createMany({
                data: dadosMensais.map(d => ({
                    secretaria_id: secretaria.secretaria_id,
                    ano: Number(ano),
                    mes: d.mes,
                    orcamento_total: d.orcamento_total,
                    total_empenhado: d.total_empenhado,
                    total_pago: d.total_pago
                }))
            })
        }
    }

    // ==========================
    // LICITAÇÕES
    // ==========================
    const licitacoesData = [
        { numero: 'PE-001/2024', objeto: 'Material de escritório', modalidade: 'Pregão Eletrônico', valor: 150000, status: 'andamento', dataAbertura: '2024-12-15' },
        { numero: 'TP-002/2024', objeto: 'Reforma sede administrativa', modalidade: 'Tomada de Preços', valor: 850000, status: 'homologada', dataAbertura: '2024-11-20' },
        { numero: 'CC-003/2024', objeto: 'Consultoria jurídica', modalidade: 'Concorrência', valor: 320000, status: 'andamento', dataAbertura: '2024-12-01' },
        { numero: 'PE-004/2024', objeto: 'Combustível 2025', modalidade: 'Pregão Eletrônico', valor: 2500000, status: 'suspensa', dataAbertura: '2024-12-10' }
    ]

    const licitacoes:any = []
    for (const l of licitacoesData) {
        const lic = await prisma.licitacao.upsert({
            where: { numero: l.numero },
            update: {},
            create: {
                numero: l.numero,
                objeto: l.objeto,
                modalidade: l.modalidade,
                valor_estimado: l.valor,
                status: l.status as string,
                data_abertura: new Date(l.dataAbertura),
                ativo: true
            }
        })
        licitacoes.push(lic)
    }

    // ==========================
    // CONTRATOS
    // ==========================
    const contratosData = [
        { numero: 'CT-001/2024', objeto: 'Serviços de limpeza', fornecedor: 'Limpa Bem Ltda', valor: 480000, vigencia: '2025-12-31', status: 'ativo' },
        { numero: 'CT-002/2024', objeto: 'Manutenção predial', fornecedor: 'Predial Service', valor: 360000, vigencia: '2025-06-30', status: 'ativo' },
        { numero: 'CT-003/2024', objeto: 'Locação de veículos', fornecedor: 'AutoFrota SA', valor: 720000, vigencia: '2025-12-31', status: 'ativo' },
        { numero: 'CT-004/2023', objeto: 'Vigilância patrimonial', fornecedor: 'Vigília Total', valor: 580000, vigencia: '2025-01-31', status: 'vencendo' }
    ]

    const contratos:any = []
    for (let i = 0; i < contratosData.length; i++) {
        const c = contratosData[i]
        const contrato = await prisma.contrato.upsert({
            where: { numero: c.numero },
            update: {},
            create: {
                numero: c.numero,
                objeto: c.objeto,
                fornecedor: c.fornecedor,
                valor_total: c.valor,
                data_vigencia: new Date(c.vigencia),
                status: c.status as string,
                licitacao_id: licitacoes[i % licitacoes.length].licitacao_id,
                ativo: true
            }
        })
        contratos.push(contrato)
    }

    // ==========================
    // EMPENHOS (TODAS SECRETARIAS)
    // ==========================
    const secretarias_db = await prisma.secretaria.findMany()

    const rubricas = ['Material de Consumo', 'Serviços de Terceiros', 'Obras e Instalações', 'Equipamentos', 'Pessoal']
    const setores = ['Contabilidade Geral', 'Financeiro', 'Contratos', 'Licitações']
    const projetos = ['Manutenção', 'Expansão', 'Modernização', 'Emergencial']
    const fornecedores = ['Fornecedor A Ltda', 'Empresa B S/A', 'Comércio C', 'Serviços D Eireli']

    for (const sec of secretarias_db) {
        for (let i = 0; i < 15; i++) {
            const valor = Math.round(5000 + Math.random() * 150000)
            const percentualPago = Math.random()
            const valorPago = Math.round(valor * percentualPago)

            const status: string =
                percentualPago >= 1 ? 'pago' :
                    percentualPago > 0 ? 'parcial' :
                        Math.random() > 0.7 ? 'vencido' : 'pendente'

            const data = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
            const vencimento = new Date(data)
            vencimento.setDate(vencimento.getDate() + 30)

            const contrato = contratos[Math.floor(Math.random() * contratos.length)]

            await prisma.empenho.create({
                data: {
                    secretaria_id: sec.secretaria_id,
                    contrato_id: Math.random() > 0.3 ? contrato.contrato_id : null,

                    descricao: `${rubricas[i % rubricas.length]} - ${sec.nome}`,
                    valor,
                    valor_pago: valorPago,

                    data,
                    data_vencimento: vencimento,
                    status,

                    rubrica: rubricas[i % rubricas.length],
                    setor_contabil: setores[i % setores.length],
                    projeto: projetos[i % projetos.length],
                    fornecedor: fornecedores[i % fornecedores.length],
                    fonte: 'SIAFEM',

                    ativo: true
                }
            })
        }
    }
    console.log('✅ Seed completo: secretarias_db + histórico mensal')
}

main()
    .catch(err => {
        console.error(err)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
