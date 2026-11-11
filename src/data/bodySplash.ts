/*
 * Seção — Campanha Body Splash. Edite aqui.
 *
 * Cada fragrância = fundo publicitário vazio + frasco recortado da foto original
 * (assets/sessão body splash/). O recorte usa a silhueta real do frasco e é
 * posicionado sobre o mesmo cenário de onde veio, na mesma escala de luz:
 *  - Lumiah:  fundo "Bolhas de Vidro em Luz Dourada" + frasco de "Body Splash Lunial em Ambiente Aquático-1"
 *  - Pérola:  fundo "Fundo Abstrato Neon Roxo Iridescente" + frasco de "Body Splash Pérola em Luzes Roxas"
 *  - Violeta: fundo "Fundo Futurista Roxo com Reflexos Prismáticos" + frasco de "Perfume Violeta em Brilho Iridescente"
 *
 * `bottle.box`: posição original do frasco no cenário (px da arte 1672×941).
 * `description`: personalidade olfativa — a marca ainda não forneceu; deixe
 * vazio até ter o texto oficial (não inventar). Vazio = linha oculta.
 */

export type BodySplash = {
  id: string;
  name: string;
  type: string;
  description: string;
  tone: "light" | "dark"; // cor do texto sobre o cenário
  shadow: string; // sombra de suspensão, na cor do cenário
  offsetY?: string; // ajuste vertical do frasco (ex.: "-4%" sobe)
  background: { src: string; width: number; height: number };
  bottle: { src: string; alt: string; box: { x: number; y: number; w: number; h: number } };
};

export const SCENE = { width: 1672, height: 941 };

export const bodySplashCopy = {
  eyebrow: "Coleção Body Splash",
};

const TYPE = "Body Splash Deo Colônia · 200 ml";

export const bodySplashes: BodySplash[] = [
  {
    id: "violeta",
    name: "Violeta",
    type: TYPE,
    description: "",
    tone: "light",
    offsetY: "-4%",
    shadow: "rgba(10, 0, 24, 0.6)",
    background: { src: "/images/body-splash/violeta-fundo.webp", width: 1672, height: 941 },
    bottle: { src: "/images/body-splash/violeta-frasco.webp", alt: "Body Splash Violeta Buq Care, 200 ml", box: { x: 566, y: 17, w: 591, h: 924 } },
  },
  {
    id: "lumiah",
    name: "Lumiah",
    type: TYPE,
    description: "",
    tone: "dark",
    shadow: "rgba(96, 74, 50, 0.32)",
    background: { src: "/images/body-splash/lumiah-fundo.webp", width: 1672, height: 941 },
    bottle: { src: "/images/body-splash/lumiah-frasco.webp", alt: "Body Splash Lumiah Buq Care, 200 ml", box: { x: 572, y: 48, w: 565, h: 873 } },
  },
  {
    id: "perola",
    name: "Pérola",
    type: TYPE,
    description: "",
    tone: "light",
    offsetY: "-4%",
    shadow: "rgba(8, 0, 22, 0.6)",
    background: { src: "/images/body-splash/perola-fundo.webp", width: 1672, height: 941 },
    bottle: { src: "/images/body-splash/perola-frasco.webp", alt: "Body Splash Pérola Buq Care, 200 ml", box: { x: 564, y: 41, w: 586, h: 900 } },
  },
];
