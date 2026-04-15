import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import {
  buildEconomicIntelligenceReport,
  fetchEconomicIntelligenceContext,
  formatEconomicIntelligenceReport,
  normalizeWindowDays,
} from "@/modules/inteligenciaEconomica/inteligencia-economica.shared";

const prisma = new PrismaClient();

export function registrarTools(server: any) {
  server.registerTool(
    "inteligencia_economica_secretaria",
    {
      title: "Inteligencia Economica por Secretaria",
      description:
        "Analisa empenhos, contratos e licitacoes de uma secretaria e devolve leitura qualitativa das movimentacoes atuais.",
      inputSchema: {
        secretariaId: z
          .number()
          .int()
          .positive()
          .describe("Identificador da secretaria a ser analisada."),
        windowDays: z
          .number()
          .int()
          .positive()
          .max(365)
          .optional()
          .describe("Janela de analise em dias. O padrao e 90."),
      },
    },
    async ({ secretariaId, windowDays }) => {
      const context = await fetchEconomicIntelligenceContext(prisma, secretariaId);

      if (!context) {
        return {
          isError: true,
          content: [
            {
              type: "text" as const,
              text: `Secretaria ${secretariaId} nao encontrada.`,
            },
          ],
        };
      }

      const report = buildEconomicIntelligenceReport(
        context,
        normalizeWindowDays(windowDays),
      );

      return {
        content: [
          {
            type: "text" as const,
            text: formatEconomicIntelligenceReport(report),
          },
        ],
        structuredContent: report,
      };
    },
  );
}
