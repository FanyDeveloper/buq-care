"use client";

import Image from "next/image";
import { useRef } from "react";
import { revealOnScroll, useSectionAnimation } from "@/lib/animations";
import { ArrowIcon } from "@/components/icons/Icons";
import { categories, categoriesCopy, type Category } from "@/data/categories";
import styles from "./Categories.module.css";

/*
 * SEÇÃO 3 — Categorias (fase estática; apenas hover em CSS).
 * Três cards idênticos em diagonal: 01 alto à esquerda → 02 abaixo à direita
 * → 03 abaixo à esquerda. Texto sempre fora da fotografia.
 * Conteúdo em src/data/categories.ts.
 */

function CategoryCard({ data }: { data: Category }) {
  return (
    <a href={data.href} className={`${styles.card} ${styles[data.id] ?? ""}`}>
      <div className={styles.frame}>
        <Image
          unoptimized
          src={data.image.src}
          alt={data.image.alt}
          width={data.image.width}
          height={data.image.height}
          className={styles.photo}
          style={{ objectPosition: data.image.position }}
        />
      </div>

      <div className={styles.caption}>
        <div className={styles.text}>
          <span className={styles.index}>{data.index}</span>
          <h3 className={styles.name}>{data.name}</h3>
          <p className={styles.description}>{data.description}</p>
        </div>
        <span className={styles.arrow} aria-hidden="true">
          <ArrowIcon size={16} />
        </span>
        <span className="visually-hidden">
          {categoriesCopy.ctaLabel} {data.name}
        </span>
      </div>
    </a>
  );
}

export default function Categories() {
  const ref = useRef<HTMLElement>(null);

  // entrada rápida: fade + leve subida, em sequência
  useSectionAnimation(ref, (el) => {
    revealOnScroll(el.querySelectorAll(`.${styles.card}`), el.querySelector(`.${styles.grid}`)!, { y: 36, duration: 0.7, stagger: 0.12 });
  });

  return (
    <section ref={ref} id="categorias" className={styles.section} aria-labelledby="categories-title">
      <p className={styles.watermark} aria-hidden="true">
        {categoriesCopy.watermark}
      </p>

      <div className={styles.container}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>
            <span className={styles.line} />
            {categoriesCopy.eyebrow}
          </p>
          <h2 id="categories-title" className={styles.title}>
            {categoriesCopy.title}
          </h2>
          <p className={styles.lead}>{categoriesCopy.lead}</p>
        </header>

        <div className={styles.grid}>
          {categories.map((c) => (
            <CategoryCard key={c.id} data={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
