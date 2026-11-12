/*
 * Copys e dados das seções finais (Mais vendidos, Fundadora, Rodapé). Edite aqui.
 *
 * ⚠️ DADOS PENDENTES:
 * - Preços: nenhum preço foi fornecido — por isso não são exibidos.
 * - `href` "#": substituir pelas páginas de produto, perfil do Instagram e
 *   canal de contato oficiais quando existirem (nenhum contato consta no projeto).
 * - "Mais vendidos": a seleção usa os combos fotografados em assets/combos;
 *   confirmar com a marca quais itens são de fato os mais vendidos.
 */

export type Bestseller = {
  id: string;
  tag: string;
  name: string;
  line: string;
  href: string;
  image: { src: string; width: number; height: number; alt: string; position?: string };
};

export const bestsellersCopy = {
  eyebrow: "Mais vendidos",
  titleStart: "Os favoritos de quem",
  titleEmphasis: "já sentiu.",
  lead: "Kits que conquistaram a rotina de quem ama se cuidar. Escolha o seu e leve a experiência BUQ Care para casa.",
  cta: "Quero conhecer",
  featuredCta: "Descubra o combo",
  moreTitle: "Encontre o seu favorito.",
  moreText: "Fragrâncias, cuidados para o corpo e para os cabelos em kits feitos para presentear — ou se presentear.",
  moreCta: { label: "Ver todos os produtos", href: "#vitrine" },
  watermark: "favoritos",
};

export const bestsellers: Bestseller[] = [
  {
    id: "violeta-perola",
    tag: "Body Splash",
    name: "Combo Violeta + Pérola",
    line: "Intensidade e delicadeza no mesmo ritual.",
    href: "#",
    image: { src: "/images/bestsellers/violeta-perola.webp", width: 1024, height: 1280, alt: "Combo Body Splashes Violeta e Pérola Buq Care" },
  },
  {
    id: "pitaya",
    tag: "Corpo e banho",
    name: "Combo Pitaya",
    line: "Tropical, vibrante e impossível de esquecer.",
    href: "#",
    image: { src: "/images/bestsellers/pitaya.webp", width: 800, height: 800, alt: "Combo Pitaya Buq Care" },
  },
  {
    id: "clareiah-esfoliah",
    tag: "Cuidado corporal",
    name: "Combo Clareiah + Esfoliah",
    line: "A dupla que renova o seu ritual.",
    href: "#",
    image: { src: "/images/bestsellers/clareiah-esfoliah.webp", width: 640, height: 800, alt: "Combo Clareiah e Esfoliah Buq Care" },
  },
  {
    id: "cereja",
    tag: "Corpo e banho",
    name: "Combo Cereja",
    line: "Doce, suculento e cheio de charme.",
    href: "#",
    image: { src: "/images/bestsellers/cereja.webp", width: 516, height: 387, alt: "Combo Cereja Buq Care", position: "50% 50%" },
  },
  {
    id: "macadamia",
    tag: "Corpo e banho",
    name: "Combo Macadâmia",
    line: "Um ritual envolvente do banho ao toque final.",
    href: "#",
    image: { src: "/images/bestsellers/macadamia.webp", width: 399, height: 501, alt: "Combo Macadâmia Buq Care" },
  },
  {
    id: "capilar",
    tag: "Cabelos",
    name: "Combo Perfume Capilar + Sérum",
    line: "Seus fios com perfume e presença.",
    href: "#",
    image: { src: "/images/bestsellers/capilar.webp", width: 387, height: 516, alt: "Combo Perfume Capilar e Sérum Capilar Buq Care" },
  },
];

export const founderCopy = {
  eyebrow: "A fundadora",
  titleStart: "Uma essência que",
  titleEmphasis: "tem história.",
  text: "Por trás da BUQ Care existe uma mulher que transformou sua paixão pela beleza em uma marca com identidade própria. Rayssa Buq acredita que cada detalhe carrega uma forma de expressão e que cuidar de si também é reconhecer a própria essência.",
  signature: "Rayssa Buq",
  role: "Fundadora da BUQ Care",
  image: { src: "/images/founder/rayssa-buq-produtos.webp", width: 1672, height: 941, alt: "Rayssa Buq, fundadora da BUQ Care, com produtos da marca" },
};

export const footerCopy = {
  closingStart: "A beleza está em",
  closingEmphasis: "ser você.",
  closingText: "Encontre sua fragrância, descubra novas sensações e faça de cada detalhe uma expressão da sua essência.",
  closingCta: { label: "Explore nossa coleção", href: "#vitrine" },
  tagline: "Sua essência merece ser sentida.",
  logo: { src: "/images/brand/logo-buq-care-branco.webp", width: 326, height: 169, alt: "BUQ Care" },
  columns: [
    {
      title: "Navegue",
      links: [
        { label: "Nossa essência", href: "#trajetoria" },
        { label: "Categorias", href: "#categorias" },
        { label: "Produtos", href: "#vitrine" },
        { label: "Body Splash", href: "#body-splash" },
        { label: "Mais vendidos", href: "#mais-vendidos" },
        { label: "A fundadora", href: "#fundadora" },
      ],
    },
    {
      title: "Redes sociais",
      links: [{ label: "Instagram", href: "#" }],
    },
    {
      title: "Atendimento",
      links: [{ label: "Contato", href: "#" }],
    },
  ],
  legal: "Todos os direitos reservados.",
  backToTop: "Voltar ao topo",
};
