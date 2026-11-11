import Image from "next/image";
import { ArrowIcon } from "@/components/icons/Icons";
import { featuredProduct, formatPrice, products, showcaseCopy } from "@/data/products";
import ProductCarousel from "./ProductCarousel";
import styles from "./Showcase.module.css";

/*
 * SEÇÃO 4 — Vitrine (fase estática; apenas hover em CSS + navegação do carrossel).
 * Composição: um produto em destaque à esquerda, sobre painel lavanda com o
 * nome em serifa itálica ao fundo, e um carrossel horizontal que "sangra"
 * para fora da tela à direita. Conteúdo em src/data/products.ts.
 */
export default function Showcase() {
  const f = featuredProduct;
  return (
    <section id="vitrine" className={styles.section} aria-labelledby="showcase-title">
      <div className={styles.container}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>
            <span className={styles.line} />
            {showcaseCopy.eyebrow}
          </p>
          <h2 id="showcase-title" className={styles.title}>
            {showcaseCopy.title} <em>{showcaseCopy.titleEmphasis}</em>
          </h2>
          <p className={styles.lead}>{showcaseCopy.lead}</p>
        </header>
      </div>

      <div className={styles.layout}>
        {/* Destaque */}
        <article className={styles.featured}>
          <span className={styles.featuredWatermark} aria-hidden="true">
            {f.name.toLowerCase()}
          </span>
          <a href={f.href} className={styles.featuredMedia} aria-label={`${showcaseCopy.cta}: ${f.name}`}>
            <Image
              unoptimized
              src={f.image.src}
              alt={f.image.alt}
              width={f.image.width}
              height={f.image.height}
              className={styles.featuredPhoto}
              style={{ objectPosition: f.image.position }}
            />
          </a>
          <div className={styles.featuredBody}>
            <p className={styles.featuredLabel}>{showcaseCopy.featuredLabel}</p>
            <p className={styles.cardLine}>
              {f.line}
              {f.volume && <span> · {f.volume}</span>}
            </p>
            <h3 className={styles.featuredName}>
              <a href={f.href}>{f.name}</a>
            </h3>
            <p className={styles.featuredDesc}>{f.description}</p>
            <div className={styles.featuredFoot}>
              <span className={f.price === null ? styles.pricePending : styles.price}>
                {formatPrice(f.price, showcaseCopy.pricePending)}
              </span>
              <a href={f.href} className={styles.featuredCta}>
                {showcaseCopy.cta}
                <ArrowIcon size={16} />
              </a>
            </div>
          </div>
        </article>

        {/* Demais produtos */}
        <ProductCarousel products={products} />
      </div>
    </section>
  );
}
