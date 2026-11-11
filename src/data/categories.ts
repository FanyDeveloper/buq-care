/*
 * Categorias da homepage — edite aqui (nomes, descrições, links, imagens).
 * `href` provisório: substituir pelas rotas do catálogo quando existirem.
 */

export type Category = {
  id: string;
  index: string;
  name: string;
  description: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
    position?: string; // enquadramento (object-position) dentro do card
  };
  href: string;
};

export const categoriesCopy = {
  eyebrow: "Categorias",
  title: "Descubra seu próximo ritual.",
  lead: "Explore nossas linhas e encontre os cuidados que combinam com você.",
  ctaLabel: "Explorar",
  watermark: "rituais",
};

export const categories: Category[] = [
  {
    id: "perfumery",
    index: "01",
    name: "Perfumaria",
    description: "Fragrâncias que transformam sua presença em uma assinatura.",
    image: {
      src: "/images/categories/perfumery.webp",
      width: 1024,
      height: 1280,
      alt: "Perfume Mistério Buq Care, Eau de Parfum 100 ml",
      position: "50% 45%",
    },
    href: "#",
  },
  {
    id: "hair",
    index: "02",
    name: "Produtos Capilares",
    description: "Cuidados especiais para cabelos com mais vida e beleza.",
    image: {
      src: "/images/categories/hair-care.jpg",
      width: 736,
      height: 931,
      alt: "Aplicação de produto capilar com conta-gotas",
      position: "50% 30%",
    },
    href: "#",
  },
  {
    id: "skin",
    index: "03",
    name: "Skin Care",
    description: "Um ritual de cuidado para valorizar cada detalhe da sua pele.",
    image: {
      src: "/images/categories/skin-care.jpg",
      width: 399,
      height: 501,
      alt: "Creme clareador facial Clareiah Buq Care, 60 g",
      position: "50% 50%",
    },
    href: "#",
  },
];
