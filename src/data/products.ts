/*
 * Vitrine de produtos — edite aqui.
 *
 * ⚠️ DADOS PENDENTES:
 * - `price`: null em todos — preencher com valores confirmados pela marca.
 * - `href`: "#" — substituir pelas páginas de produto quando existirem.
 * - `description`: textos PROVISÓRIOS, escritos sem afirmar fragrância,
 *   ingredientes ou benefícios. Substituir pelas descrições oficiais.
 * - `volume`: preenchido apenas quando legível no rótulo da fotografia.
 *
 * Observação: "Imbakt impact.png" e "Impacte Perfum original.jpg" mostram o
 * mesmo produto (rótulo IMBAKT IMPACT) — usados como foto principal e de hover.
 * Confirmar com a marca se "Perfume Celebration" (frasco âmbar) é o mesmo
 * produto que o "Celebration Eau de Parfum" (frasco roxo) ou outra versão.
 */

export type Product = {
  id: string;
  name: string;
  line: string; // categoria exibida acima do nome
  volume?: string;
  description: string;
  price: number | null;
  href: string;
  image: { src: string; width: number; height: number; alt: string; position?: string };
  hoverImage?: { src: string; width: number; height: number; alt: string; position?: string };
};

export const showcaseCopy = {
  eyebrow: "Vitrine",
  title: "Feitos para",
  titleEmphasis: "serem lembrados.",
  lead: "Uma seleção de fragrâncias e cuidados Buq Care para compor o seu dia.",
  featuredLabel: "Em destaque",
  cta: "Ver produto",
  pricePending: "Preço em breve",
};

export const featuredProduct: Product = {
  id: "celebration-edp",
  name: "Celebration",
  line: "Eau de Parfum",
  volume: "100 ml",
  description: "Um frasco facetado em tons de violeta, pensado para os seus momentos de celebração.",
  price: null,
  href: "#",
  image: {
    src: "/images/products/celebration-edp.webp",
    width: 640,
    height: 800,
    alt: "Perfume Celebration Eau de Parfum Buq Care, 100 ml",
    position: "50% 50%",
  },
};

export const products: Product[] = [
  {
    id: "misterio",
    name: "Mistério",
    line: "Eau de Parfum",
    volume: "100 ml",
    description: "Um perfume que guarda seu segredo desde o nome.",
    price: null,
    href: "#",
    image: {
      src: "/images/products/misterio.webp",
      width: 1024,
      height: 1280,
      alt: "Perfume Mistério Buq Care, Eau de Parfum 100 ml",
      position: "50% 45%",
    },
  },
  {
    id: "imbakt-impact",
    name: "Imbakt Impact",
    line: "Perfumaria",
    volume: "75 ml",
    description: "Frasco escuro e estojo trabalhado, com assinatura em caligrafia árabe.",
    price: null,
    href: "#",
    image: {
      src: "/images/products/imbakt-impact.png",
      width: 1275,
      height: 971,
      alt: "Perfume Imbakt Impact Buq Care, 75 ml, com estojo",
      position: "78% 50%",
    },
    hoverImage: {
      src: "/images/products/imbakt-impact-alt.jpg",
      width: 387,
      height: 469,
      alt: "Perfume Imbakt Impact Buq Care",
      position: "40% 50%",
    },
  },
  {
    id: "lumiah",
    name: "Lumiah",
    line: "Body Splash",
    description: "Body splash Buq Care em frasco translúcido com detalhes dourados.",
    price: null,
    href: "#",
    image: {
      src: "/images/products/lumiah.webp",
      width: 1024,
      height: 1280,
      alt: "Body Splash Lumiah Buq Care",
    },
  },
  {
    id: "imperium",
    name: "Imperium",
    line: "Body Splash",
    description: "Body splash Buq Care de rótulo clássico e minimalista.",
    price: null,
    href: "#",
    image: {
      src: "/images/products/imperium.webp",
      width: 1024,
      height: 1280,
      alt: "Body Splash Imperium Buq Care",
    },
  },
  {
    id: "cereja",
    name: "Cereja",
    line: "Body Splash",
    description: "Body splash Buq Care em vermelho-cereja, em clima de piquenique.",
    price: null,
    href: "#",
    image: {
      src: "/images/products/cereja.webp",
      width: 1024,
      height: 1280,
      alt: "Body Splash Cereja Buq Care",
      position: "50% 70%",
    },
  },
  {
    id: "celebration-sunset",
    name: "Perfume Celebration",
    line: "Perfumaria",
    description: "A linha Celebration sob a luz dourada do fim de tarde.",
    price: null,
    href: "#",
    image: {
      src: "/images/products/celebration-sunset.webp",
      width: 1200,
      height: 628,
      alt: "Perfume Celebration Buq Care na areia ao pôr do sol",
      position: "22% 50%",
    },
  },
  {
    id: "espuma-facial",
    name: "Espuma Facial",
    line: "Skin Care",
    description: "Espuma de limpeza para o primeiro passo do seu ritual de skin care.",
    price: null,
    href: "#",
    image: {
      src: "/images/products/espuma-facial.jpg",
      width: 1024,
      height: 1024,
      alt: "Espuma facial Buq Care",
      position: "62% 50%",
    },
  },
];

export function formatPrice(price: number | null, fallback: string) {
  if (price === null) return fallback;
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
