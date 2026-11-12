import Image from "next/image";
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
  return (
    <section id="trajetoria" className={styles.section} aria-labelledby="trajectory-title">
      {/* transição suave vinda da hero */}
      <div className={styles.fade} aria-hidden="true" />

      {/* profundidade: pétalas desfocadas e número fantasma */}
      <Image unoptimized src="/images/hero/petal-3.png" alt="" aria-hidden="true" width={648} height={510} className={`${styles.petal} ${styles.petalA}`} />
      <Image unoptimized src="/images/hero/petal-2.png" alt="" aria-hidden="true" width={741} height={451} className={`${styles.petal} ${styles.petalB}`} />
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
