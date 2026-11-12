"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { bestsellers, bestsellersCopy, type Bestseller } from "@/data/site";
import styles from "./Bestsellers.module.css";

/*
 * SEÇÃO — Mais vendidos.
 * Composição editorial assimétrica (não é uma grade de loja): um protagonista
 * grande, dois produtos sobrepostos em profundidade e uma faixa escalonada.
 * GSAP: entrada suave ao rolar + leve paralaxe entre as camadas.
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Item({ item, variant, featured = false }: { item: Bestseller; variant: string; featured?: boolean }) {
  return (
    <article className={`${styles.item} ${styles[variant]}`} data-depth={featured ? 0 : variant === "c" || variant === "f" ? 1 : 0.5}>
      <a href={item.href} className={styles.media} aria-label={`${bestsellersCopy.cta}: ${item.name}`}>
        <Image
          src={item.image.src}
          alt={item.image.alt}
          width={item.image.width}
          height={item.image.height}
          sizes={featured ? "(max-width: 760px) 100vw, 46vw" : "(max-width: 760px) 100vw, 30vw"}
          quality={90}
          className={styles.img}
          style={item.image.position ? { objectPosition: item.image.position } : undefined}
        />
      </a>
      <div className={styles.caption}>
        <p className={styles.tag}>{item.tag}</p>
        <h3 className={styles.name}>
          <a href={item.href}>{item.name}</a>
        </h3>
        <p className={styles.line}>{item.line}</p>
        {featured ? (
          <a href={item.href} className={styles.button}>
            {bestsellersCopy.featuredCta}
            <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <a href={item.href} className={styles.link}>
            {bestsellersCopy.cta}
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}

export default function Bestsellers() {
  const ref = useRef<HTMLElement>(null);
  const [feat, b, c, d, e, f] = bestsellers;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(`.${styles.item}`).forEach((item) => {
          gsap.from(item, {
            y: 70,
            autoAlpha: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          });
          // paralaxe sutil: itens "de trás" andam mais devagar
          const depth = Number(item.dataset.depth ?? 0);
          if (depth) {
            gsap.to(item.querySelector(`.${styles.media}`), {
              yPercent: -8 * depth,
              ease: "none",
              scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true },
            });
          }
        });
        gsap.from(`.${styles.watermark}`, {
          xPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="mais-vendidos" className={styles.section} aria-labelledby="bestsellers-title">
      <p className={styles.watermark} aria-hidden="true">
        {bestsellersCopy.watermark}
      </p>

      <div className={styles.container}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>
            <span className={styles.rule} />
            {bestsellersCopy.eyebrow}
          </p>
          <h2 id="bestsellers-title" className={styles.title}>
            {bestsellersCopy.titleStart} <em>{bestsellersCopy.titleEmphasis}</em>
          </h2>
          <p className={styles.lead}>{bestsellersCopy.lead}</p>
        </header>

        {/* grade única: tamanhos alternados, sem vazios entre os blocos */}
        <div className={styles.stage}>
          <Item item={feat} variant="a" featured />
          <Item item={b} variant="b" />
          <Item item={c} variant="c" />
          <Item item={d} variant="d" />
          <Item item={e} variant="e" />
          <Item item={f} variant="f" />
          <div className={`${styles.item} ${styles.more}`}>
            <p className={styles.moreTitle}>{bestsellersCopy.moreTitle}</p>
            <p className={styles.line}>{bestsellersCopy.moreText}</p>
            <a href={bestsellersCopy.moreCta.href} className={styles.button}>
              {bestsellersCopy.moreCta.label}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
