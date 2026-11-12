"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { founderCopy } from "@/data/site";
import styles from "./Founder.module.css";

/*
 * SEÇÃO — Sobre a fundadora (Rayssa Buq).
 * A fotografia começa "comprimida" num recorte oval estreito e se expande,
 * sincronizada com a rolagem, até revelar a composição inteira.
 * Sem deformação: a moldura nunca muda de proporção — só o RECORTE (clip-path)
 * se abre, enquanto a foto vai de um leve zoom para a escala real.
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Founder() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const frame = el.querySelector(`.${styles.frame}`);
        const tl = gsap.timeline({
          scrollTrigger: { trigger: frame, start: "top 90%", end: "center 50%", scrub: 1 },
        });
        tl.fromTo(
          frame,
          { clipPath: "inset(10% 34% 10% 34% round 999px)" },
          { clipPath: "inset(0% 0% 0% 0% round 10px)", ease: "power2.inOut", duration: 1 },
          0,
        )
          .fromTo(`.${styles.photo}`, { scale: 1.32 }, { scale: 1, ease: "power2.out", duration: 1 }, 0)
          .fromTo(`.${styles.ghost}`, { yPercent: 30, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, ease: "none", duration: 1 }, 0);

        gsap.from(`.${styles.reveal}`, {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: `.${styles.copy}`, start: "top 80%", once: true },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const f = founderCopy;

  return (
    <section ref={ref} id="fundadora" className={styles.section} aria-labelledby="founder-title">
      <div className={styles.container}>
        <figure className={styles.figure}>
          <div className={styles.frame}>
            <Image
              src={f.image.src}
              alt={f.image.alt}
              width={f.image.width}
              height={f.image.height}
              sizes="(max-width: 1440px) 92vw, 1320px"
              quality={92}
              className={styles.photo}
            />
          </div>
          <span className={styles.ghost} aria-hidden="true">
            essência
          </span>
        </figure>

        <div className={styles.copy}>
          <p className={`${styles.eyebrow} ${styles.reveal}`}>
            <span className={styles.rule} />
            {f.eyebrow}
          </p>
          <h2 id="founder-title" className={`${styles.title} ${styles.reveal}`}>
            {f.titleStart} <em>{f.titleEmphasis}</em>
          </h2>
          <div className={styles.body}>
            <p className={`${styles.text} ${styles.reveal}`}>{f.text}</p>
            <div className={`${styles.sign} ${styles.reveal}`}>
              <span className={styles.signature}>{f.signature}</span>
              <span className={styles.role}>{f.role}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
