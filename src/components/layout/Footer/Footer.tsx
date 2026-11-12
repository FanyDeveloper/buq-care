"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { footerCopy } from "@/data/site";
import styles from "./Footer.module.css";

/*
 * RODAPÉ — encerramento da experiência de marca.
 * 1. convite final ("A beleza está em ser você.")
 * 2. logo oficial + frase + navegação, redes e atendimento
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(`.${styles.reveal}`, {
          y: 36,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        });
        gsap.to(`.${styles.glow}`, { xPercent: 12, yPercent: -6, duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const f = footerCopy;

  return (
    <footer ref={ref} className={styles.footer}>
      <span className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        {/* 1. convite final */}
        <div className={styles.closing}>
          <h2 className={`${styles.closingTitle} ${styles.reveal}`}>
            {f.closingStart} <em>{f.closingEmphasis}</em>
          </h2>
          <div className={styles.closingSide}>
            <p className={`${styles.closingText} ${styles.reveal}`}>{f.closingText}</p>
            <a href={f.closingCta.href} className={`${styles.cta} ${styles.reveal}`}>
              {f.closingCta.label}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* 2. marca + navegação */}
        <div className={styles.main}>
          <div className={`${styles.brand} ${styles.reveal}`}>
            <a href="#" aria-label="BUQ Care — voltar ao início" className={styles.logoLink}>
              <Image src={f.logo.src} alt={f.logo.alt} width={f.logo.width} height={f.logo.height} unoptimized className={styles.logo} />
            </a>
            <p className={styles.tagline}>{f.tagline}</p>
          </div>

          <nav className={styles.columns} aria-label="Rodapé">
            {f.columns.map((col) => (
              <div key={col.title} className={`${styles.col} ${styles.reveal}`}>
                <p className={styles.colTitle}>{col.title}</p>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href}>{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} BUQ Care. {f.legal}
          </p>
          <a href="#" className={styles.top}>
            {f.backToTop}
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
