/*
 * Banners comerciais — a ORDEM deste array é a ordem de exibição.
 * Artes horizontais 1376×768 (≈16:9), exibidas inteiras no palco.
 * `href` opcional: preencher se o banner tiver página de campanha.
 */

export type Banner = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  position?: string; // enquadramento quando o palco corta as laterais
  href?: string;
};

export const BANNER_INTERVAL_MS = 5000;

export const banners: Banner[] = [
  {
    id: "body-splash-deserto",
    src: "/images/banners/01-body-splash-deserto.webp",
    width: 1376,
    height: 768,
    alt: "Campanha Buq Care: dois body splashes sobre pedras em cenário desértico ao entardecer",
    position: "22% 50%",
  },
  {
    id: "clareiah-ingredientes",
    src: "/images/banners/02-clareiah-ingredientes.webp",
    width: 1376,
    height: 768,
    alt: "Campanha Buq Care: Clareiah com niacinamida, óleo de melaleuca e óleo de rosa mosqueta — auxilia na uniformização do tom de pele, hidrata profundamente e contribui para uma pele com aparência iluminada e saudável",
  },
  {
    id: "esfoliah-clareiah",
    src: "/images/banners/03-esfoliah-clareiah.webp",
    width: 1376,
    height: 768,
    alt: "Campanha Buq Care: creme esfoliante corporal Esfoliah e creme clareador corporal Clareiah entre cristais e ingredientes naturais",
  },
];
