import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import {
  answerEconomicQuestion,
  buildEconomicIntelligenceReport,
  fetchEconomicIntelligenceContext,
  normalizeWindowDays,
} from "./inteligencia-economica.shared";

@Injectable()
export class InteligenciaEconomicaService {
  constructor(private readonly prisma: PrismaService) {}

  async findBySecretaria(secretariaId: number, windowDays?: number) {
    const context = await fetchEconomicIntelligenceContext(this.prisma, secretariaId);

    if (!context) {
      throw new NotFoundException(
        `Secretaria ${secretariaId} nao encontrada para analise economica.`,
      );
    }

    return buildEconomicIntelligenceReport(
      context,
      normalizeWindowDays(windowDays),
    );
  }

  async askQuestion(
    secretariaId: number,
    question: string,
    windowDays?: number,
  ) {
    const report = await this.findBySecretaria(secretariaId, windowDays);

    return answerEconomicQuestion(report, question);
  }
}
