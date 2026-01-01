// Generators Index
import { ISO9001_GENERATORS } from "./iso9001-generators"
import { GDP_GENERATORS } from "./gdp-generators"
import { ISO27001_GENERATORS } from "./iso27001-generators"
import { HACCP_GENERATORS } from "./haccp-generators"
import { ISO42001_GENERATORS } from "./iso42001-generators"
import { ISO13485_GENERATORS } from "./iso13485-generators"
import { SURETE_GENERATORS } from "./surete-generators"
import { DocumentGenerator } from "./types"

export * from "./types"

// All generators by standard
export const GENERATORS: Record<string, DocumentGenerator[]> = {
  ISO_9001: ISO9001_GENERATORS,
  GDP: GDP_GENERATORS,
  ISO_27001: ISO27001_GENERATORS,
  HACCP: HACCP_GENERATORS,
  ISO_42001: ISO42001_GENERATORS,
  ISO_13485: ISO13485_GENERATORS,
  SURETE: SURETE_GENERATORS,
}

// Get generators for a standard
export function getGeneratorsForStandard(standardCode: string): DocumentGenerator[] {
  return GENERATORS[standardCode] || []
}

// Get generator by ID
export function getGeneratorById(standardCode: string, generatorId: string): DocumentGenerator | undefined {
  const generators = getGeneratorsForStandard(standardCode)
  return generators.find((g) => g.id === generatorId)
}

export {
  ISO9001_GENERATORS,
  GDP_GENERATORS,
  ISO27001_GENERATORS,
  HACCP_GENERATORS,
  ISO42001_GENERATORS,
  ISO13485_GENERATORS,
  SURETE_GENERATORS,
}
