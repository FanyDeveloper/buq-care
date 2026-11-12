"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useSectionAnimation } from "@/lib/animations";
import { indicators, trajectoryCopy, type Indicator } from "@/data/trajectory";
import styles from "./Trajectory.module.css";

/*
 * SEÇÃO 2 — Trajetória em números (fase estática, sem animações/contadores).
 * Conteúdo vem de src/data/trajectory.ts.
 * Disposição em "escada" ascendente: 01 (menor) → 02 → 03 (maior),
 * com 04 como informação complementar.
 */

function IndicatorBlock({ data }: { data: Indicator }) {
  return (
    <article className={`${styles.indicator} ${styles[`i-${data.id}`] ?? ""}`}>
      <p className={styles.index}>
        <span>{data.index}</span>
        <span className={styles.rule} />
      </p>

      <p className={styles.figure}>
        {data.prefix && <span className={styles.prefix}>{data.prefix}</span>}
        <span className={styles.value}>{data.value}</span>
        {data.plus && <span className={styles.plus}>+</span>}
        {data.suffix && <span className={styles.suffix}>{data.suffix}</span>}
      </p>

      <p className={styles.label}>
        {data.label}
        {data.requiresBrandApproval && (
          <sup className={styles.mark} title="Valor reportado pela imprensa — aprovação da marca pendente">
            *
          </sup>
        )}
      </p>

      {data.items && (
        <ul className={styles.items}>
          {data.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function Trajectory() {
  const ref = useRef<HTMLElement>(null);

  // contagem progressiva (0 → valor final), uma única vez, ~1,3 s
  useSectionAnimation(ref, (el) => {
    const values = Array.from(el.querySelectorAll<HTMLElement>(`.${styles.value}`));
    const targets = values.map((v) => {
      const final = v.textContent ?? "";
      const pad = final.startsWith("0") ? final.length : 0; // mantém "04"
      const fmt = (n: number) => String(Math.round(n)).padStart(pad, "0");
      v.textContent = fmt(0);
      return { v, end: Number(final), fmt, final };
    });
    ScrollTrigger.create({
      trigger: el.querySelector(`.${styles.grid}`),
      start: "top 80%",
      once: true,
      onEnter: () =>
        targets.forEach(({ v, end, fmt, final }, i) => {
          const o = { n: 0 };
          gsap.to(o, {
            n: end,
            duration: 1.3,
            delay: i * 0.08,
            ease: "power2.out",
            onUpdate: () => {
              v.textContent = fmt(o.n);
            },
            onComplete: () => {
              v.textContent = final;
            },
          });
        }),
    });
    // ao desmontar/reverter, garante o valor final
    return () => targets.forEach(({ v, final }) => (v.textContent = final));
  });

  return (
    <section ref={ref} id="trajetoria" className={styles.section} aria-labelledby="trajectory-title">
      {/* transição suave vinda da hero */}
      <div className={styles.fade} aria-hidden="true" />

      {/* iluminação lavanda/violeta — mesma linguagem da hero */}
      <div className={styles.lights} aria-hidden="true">
        <span className={`${styles.bokeh} ${styles.bk1}`} />
        <span className={`${styles.bokeh} ${styles.bk2}`} />
        <span className={`${styles.bokeh} ${styles.bk3}`} />
        <span className={`${styles.sparkle} ${styles.sp1}`} />
        <span className={`${styles.sparkle} ${styles.sp2}`} />
        <span className={`${styles.sparkle} ${styles.sp3}`} />
        <span className={`${styles.ring} ${styles.rg1}`} />
      </div>

      {/* profundidade: pétalas desfocadas e número fantasma */}
      <Image unoptimized src="/images/hero/petal-3.webp" alt="" aria-hidden="true" width={400} height={315} className={`${styles.petal} ${styles.petalA}`} />
      <Image unoptimized src="/images/hero/petal-2.webp" alt="" aria-hidden="true" width={440} height={268} className={`${styles.petal} ${styles.petalB}`} />
      <Image unoptimized src="/images/hero/petal-1.webp" alt="" aria-hidden="true" width={440} height={318} className={`${styles.petal} ${styles.petalC}`} />
      <Image unoptimized src="/images/hero/petal-3.webp" alt="" aria-hidden="true" width={400} height={315} className={`${styles.petal} ${styles.petalD}`} />
      <Image unoptimized src="/images/hero/petal-2.webp" alt="" aria-hidden="true" width={440} height={268} className={`${styles.petal} ${styles.petalE}`} />
      <span className={styles.ghost} aria-hidden="true">
        20
      </span>

      <div className={styles.container}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.line} />
              {trajectoryCopy.eyebrow}
            </p>
            <h2 id="trajectory-title" className={styles.title}>
              {trajectoryCopy.titleStart} <em>{trajectoryCopy.titleEmphasis}</em>
              {trajectoryCopy.titleEnd && (
                <>
                  <br />
                  {trajectoryCopy.titleEnd}
                </>
              )}
            </h2>
          </div>
          <p className={styles.lead}>{trajectoryCopy.lead}</p>
        </header>

        <div className={styles.grid}>
          {/* linha ascendente sutil, reforça a ideia de crescimento */}
          <svg className={styles.curve} viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="trajCurve" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#c6aee2" stopOpacity="0" />
                <stop offset="0.5" stopColor="#c6aee2" stopOpacity="0.8" />
                <stop offset="1" stopColor="#9d7cc4" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path d="M0 560 C 320 540, 520 380, 760 250 S 1100 60, 1200 40" fill="none" stroke="url(#trajCurve)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          </svg>

          {indicators.map((item) => (
            <IndicatorBlock key={item.id} data={item} />
          ))}
        </div>

        <p className={styles.source}>
          <span className={styles.mark}>*</span> {trajectoryCopy.sourceNote}
        </p>
      </div>
    </section>
  );
}
