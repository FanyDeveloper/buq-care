"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useSectionAnimation } from "@/lib/animations";
import { ArrowIcon } from "@/components/icons/Icons";
import { BANNER_INTERVAL_MS, banners } from "@/data/banners";
import styles from "./Banners.module.css";

/*
 * SEÇÃO 5 — Banners comerciais.
 * Carrossel automático com fade (5 s por banner), sem bibliotecas.
 * - Um único timer (setTimeout) recriado a cada troca → navegação manual
 *   reinicia a contagem; o cleanup evita timers duplicados.
 * - Pausa com mouse/foco sobre o banner.
 * - prefers-reduced-motion: sem troca automática e sem fade.
 * - Todas as imagens ficam montadas (eager) → sem espaços vazios na troca.
 */
export default function Banners() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  // troca automática só começa quando o banner é visto pela primeira vez
  const [started, setStarted] = useState(false);
  const total = banners.length;
  const sectionRef = useRef<HTMLElement>(null);

  // entrada rápida (~0,7 s): fade + leve escala/subida, sem atraso
  useSectionAnimation(sectionRef, (el) => {
    gsap.from(el.querySelector(`.${styles.stage}`), {
      autoAlpha: 0,
      y: 24,
      scale: 0.97,
      duration: 0.7,
      ease: "power3.out",
      clearProps: "transform,opacity,visibility",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || started) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || paused || reducedMotion) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % total), BANNER_INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [index, started, paused, reducedMotion, total]);

  const go = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);

  return (
    <section ref={sectionRef} id="campanhas" className={styles.section} aria-label="Campanhas Buq Care">
      <div className={styles.container}>
        <div
          className={styles.stage}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Banners comerciais"
          onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {banners.map((b, i) => {
            const active = i === index;
            const art = (
              <Image
                unoptimized
                loading="eager"
                src={b.src}
                alt={b.alt}
                width={b.width}
                height={b.height}
                className={styles.art}
                style={b.position ? { objectPosition: b.position } : undefined}
              />
            );
            return (
              <div
                key={b.id}
                className={`${styles.slide} ${active ? styles.active : ""}`}
                aria-hidden={!active}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${total}`}
              >
                <div className={styles.artWrap}>
                  {b.href ? (
                    <a href={b.href} tabIndex={active ? 0 : -1}>
                      {art}
                    </a>
                  ) : (
                    art
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* controles abaixo do banner: setas compactas + indicador */}
        <div className={styles.controls}>
          <button type="button" className={styles.arrow} onClick={() => go(index - 1)} aria-label="Banner anterior">
            <span className={styles.flip}>
              <ArrowIcon size={14} />
            </span>
          </button>
          <div className={styles.dots}>
            {banners.map((b, i) => (
              <button
                key={b.id}
                type="button"
                className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                onClick={() => go(i)}
                aria-label={`Ir para o banner ${i + 1}`}
                aria-current={i === index}
              >
                {/* barra de tempo: reinicia a cada troca (key) */}
                {i === index && started && !reducedMotion && (
                  <span key={index} className={`${styles.timer} ${paused ? styles.timerPaused : ""}`} style={{ animationDuration: `${BANNER_INTERVAL_MS}ms` }} />
                )}
              </button>
            ))}
          </div>
          <button type="button" className={styles.arrow} onClick={() => go(index + 1)} aria-label="Próximo banner">
            <ArrowIcon size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
