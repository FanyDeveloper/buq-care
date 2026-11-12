/*
 * Dados da seção "Trajetória" — edite aqui, o componente apenas renderiza.
 *
 * ⚠️ ATENÇÃO — APROVAÇÃO PENDENTE:
 * Os indicadores marcados com `requiresBrandApproval: true` são valores
 * financeiros publicados por fonte jornalística (E-Commerce Brasil),
 * não materiais oficiais da marca. Precisam de aprovação da Buq Care
 * antes da publicação definitiva.
 *
 * Não adicionar números, percentuais ou cálculos de crescimento sem fonte.
 */

export type Indicator = {
  id: string;
  index: string; // numeração editorial (01, 02…)
  prefix?: string; // ex.: "R$"
  value: string; // número principal
  suffix?: string; // ex.: "milhões"
  plus?: boolean; // exibe "+" após o valor
  label: string;
  detail?: string;
  items?: string[];
  requiresBrandApproval?: boolean;
  source: string;
};

export const trajectoryCopy = {
  eyebrow: "Nossa essência",
  titleStart: "Beleza em",
  titleEmphasis: "cada detalhe.",
  titleEnd: "",
  lead: "Mais do que cuidar, queremos despertar sensações. Uma experiência de beleza criada para acompanhar você em cada versão de si mesma.",
  sourceNote:
    "Valores de faturamento reportados pelo E-Commerce Brasil (03/11/2026), conforme declaração da empresa. Categorias conforme a loja oficial.",
};

export const indicators: Indicator[] = [
  {
    id: "founded",
    index: "01",
    value: "2023",
    label: "Ano de criação da Buq Care",
    source: "E-Commerce Brasil, 03/11/2026",
  },
  {
    id: "revenue-2024",
    index: "02",
    prefix: "R$",
    value: "4",
    suffix: "milhões",
    label: "Faturamento reportado em 2024",
    requiresBrandApproval: true,
    source: "E-Commerce Brasil, 03/11/2026 — declaração do coordenador de marketing",
  },
  {
    id: "revenue-2025",
    index: "03",
    prefix: "R$",
    value: "20",
    suffix: "milhões",
    plus: true,
    label: "Faturamento reportado em 2025",
    requiresBrandApproval: true,
    source: "E-Commerce Brasil, 03/11/2026",
  },
  {
    id: "categories",
    index: "04",
    value: "04",
    label: "Categorias na loja oficial",
    items: ["Corpo e banho", "Perfumaria", "Cabelos", "Rosto"],
    source: "buqcareoficial.com.br",
  },
];
