"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon } from "@/components/icons/Icons";
import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import styles from "./Showcase.module.css";

/*
 * Carrossel horizontal nativo (scroll-snap em CSS).
 * JS mínimo: botões anterior/próximo e barra de progresso. Sem bibliotecas.
 */
export default function ProductCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 1;
    setProgress(p);
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("article");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <div className={styles.carousel}>
      <div
        ref={trackRef}
        className={styles.track}
        onScroll={update}
        tabIndex={0}
        role="region"
        aria-label="Produtos da vitrine"
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className={styles.controls}>
        <div className={styles.progress} aria-hidden="true">
          <span
            className={styles.progressBar}
            style={{ transform: `scaleX(${0.18 + progress * 0.82})` }}
          />
        </div>
        <div className={styles.navButtons}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Produtos anteriores"
          >
            <span className={styles.flip}>
              <ArrowIcon size={16} />
            </span>
          </button>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="Próximos produtos"
          >
            <ArrowIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
