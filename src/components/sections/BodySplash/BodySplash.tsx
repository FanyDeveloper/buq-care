"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import type React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCENE, bodySplashCopy, bodySplashes } from "@/data/bodySplash";
import styles from "./BodySplash.module.css";

/*
 * SEÇÃO — Campanha Body Splash.
 * Camadas por fragrância: cenário (fundo vazio) → sombra de suspensão → frasco → copy.
 * O cenário e o frasco compartilham o mesmo "palco" (proporção da arte), então o
 * frasco fica sempre no lugar e na escala de luz em que foi fotografado.
 *
 * Rolagem (pin + scrub), mantendo a troca anterior:
 *  - entrada: o cenário se revela de baixo para cima com a câmera se aproximando;
 *    o frasco sobe girando levemente em 3D até assumir o centro; a copy entra por último;
 *  - saída: copy sai, frasco recua para o alto em profundidade, cenário recua e escurece.
 * Contínuo: o frasco flutua (subida, rotação 3D sutil, respiração de escala) e a
 * sombra acompanha — mais clara e menor quando ele sobe.
 * prefers-reduced-motion: sem pin/animação — os momentos aparecem empilhados.
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

export default function BodySplash() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const total = bodySplashes.length;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const moments = gsap.utils.toArray<HTMLElement>(`.${styles.moment}`);
        const q = (i: number, cls: string) => moments[i].querySelectorAll(`.${cls}`);

        gsap.set(moments, { autoAlpha: 0 });
        gsap.set(moments[0], { autoAlpha: 1 });

        // flutuação contínua — independente da rolagem
        moments.forEach((m, i) => {
          const float = m.querySelector(`.${styles.float}`);
          const shadow = m.querySelector(`.${styles.shadow}`);
          const d = 3.6 + i * 0.3;
          gsap
            .timeline({ repeat: -1, yoyo: true, defaults: { duration: d, ease: "sine.inOut" } })
            .fromTo(float, { yPercent: 1.2, rotationY: -5, rotationZ: -0.6, scale: 1 }, { yPercent: -2.2, rotationY: 5, rotationZ: 0.8, scale: 1.015 }, 0)
            .fromTo(shadow, { scaleX: 1, opacity: 1 }, { scaleX: 0.82, opacity: 0.6 }, 0);
        });

        const enter = (tl: gsap.core.Timeline, i: number, at: number | string, reveal = true) => {
          if (reveal) {
            tl.set(moments[i], { autoAlpha: 1, zIndex: i + 1 }, at).fromTo(
              moments[i],
              { clipPath: "inset(100% 0% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.inOut" },
              at,
            );
          }
          tl.fromTo(q(i, styles.scenery), { scale: 1.22, yPercent: 5 }, { scale: 1.03, yPercent: 0, duration: 1.8, ease: "power3.out" }, at)
            .fromTo(
              q(i, styles.bottle),
              { yPercent: 28, scale: 0.84, rotationY: 24, rotationZ: -5, autoAlpha: 0 },
              { yPercent: 0, scale: 1, rotationY: 0, rotationZ: 0, autoAlpha: 1, duration: 1.6, ease: "power3.out" },
              `${at}+=0.2`,
            )
            .fromTo(q(i, styles.shadowWrap), { autoAlpha: 0, scaleX: 0.5 }, { autoAlpha: 1, scaleX: 1, duration: 1.2, ease: "power2.out" }, `${at}+=0.5`)
            .fromTo(q(i, styles.reveal), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.09, ease: "power3.out" }, `${at}+=0.7`);
        };

        const exit = (tl: gsap.core.Timeline, i: number, at: string) => {
          tl.to(q(i, styles.reveal), { y: -24, autoAlpha: 0, duration: 0.5, stagger: 0.04, ease: "power2.in" }, at)
            .to(q(i, styles.bottle), { yPercent: -26, scale: 0.86, rotationY: -22, rotationZ: 4, autoAlpha: 0, duration: 1, ease: "power2.in" }, at)
            .to(q(i, styles.shadowWrap), { autoAlpha: 0, scaleX: 0.5, duration: 0.6, ease: "power2.in" }, at)
            .to(q(i, styles.scenery), { scale: 0.94, yPercent: -4, duration: 1.3, ease: "power2.inOut" }, at)
            .to(q(i, styles.dim), { opacity: 0.6, duration: 1.2, ease: "power1.in" }, at);
        };

        // Momento 01 — entra enquanto a seção sobe até o topo
        const intro = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 85%", end: "top top", scrub: 0.8 },
        });
        enter(intro, 0, 0, false);

        if (moments.length < 2) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.2 * moments.length}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const t = self.progress * tl.duration();
              let idx = 0;
              for (let k = 1; k < moments.length; k++) if (t >= tl.labels[`to${k}`] + 0.6) idx = k;
              setActive(idx);
            },
          },
        });

        tl.to({}, { duration: 0.9 }); // Momento 01 em destaque
        for (let k = 1; k < moments.length; k++) {
          tl.addLabel(`to${k}`, k === 1 ? undefined : "+=0.9");
          exit(tl, k - 1, `to${k}`);
          enter(tl, k, `to${k}+=0.15`);
          tl.set(moments[k - 1], { autoAlpha: 0 }, `to${k}+=1.4`);
        }
        tl.to({}, { duration: 0.7 }); // respiro final antes de liberar o pin
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
    {/* cabeçalho da coleção — mesmo padrão das demais seções */}
    <header className={styles.intro}>
      <p className={styles.introEyebrow}>
        <span className={styles.introLine} />
        {bodySplashCopy.eyebrow}
      </p>
      <h2 className={styles.introTitle}>{bodySplashCopy.title}</h2>
      <p className={styles.introLead}>{bodySplashCopy.lead}</p>
    </header>

    <section ref={sectionRef} id="body-splash" className={styles.section} aria-label="Coleção Body Splash Buq Care">
      {bodySplashes.map((p, i) => {
        const b = p.bottle.box;
        return (
          <article
            key={p.id}
            className={styles.moment}
            data-tone={p.tone}
            aria-label={p.name}
            style={{ "--shadow": p.shadow, ...(p.offsetY ? { "--bottle-lift": p.offsetY } : {}) } as React.CSSProperties}
          >
            {/* palco na proporção da arte: cenário e frasco sempre alinhados */}
            <div className={styles.stage}>
              <div className={styles.scenery}>
                <Image
                  src={p.background.src}
                  alt=""
                  aria-hidden="true"
                  width={p.background.width}
                  height={p.background.height}
                  sizes="100vw"
                  quality={88}
                  priority={i === 0}
                  loading="eager"
                  className={styles.bg}
                />
              </div>

              <div
                className={styles.bottlePos}
                style={{ left: pct(b.x, SCENE.width), top: pct(b.y, SCENE.height), width: pct(b.w, SCENE.width), height: pct(b.h, SCENE.height) }}
              >
                <div className={styles.shadowWrap} aria-hidden="true">
                  <span className={styles.shadow} />
                </div>
                <div className={styles.bottle}>
                  <div className={styles.float}>
                    <Image
                      src={p.bottle.src}
                      alt={p.bottle.alt}
                      width={b.w}
                      height={b.h}
                      unoptimized
                      loading="eager"
                      priority={i === 0}
                      className={styles.bottleImg}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.scrim} aria-hidden="true" />
            <div className={styles.dim} aria-hidden="true" />

            <div className={styles.copy}>
              <p className={`${styles.eyebrow} ${styles.reveal}`}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.line} />
                {bodySplashCopy.eyebrow}
              </p>
              <h3 className={`${styles.name} ${styles.reveal}`}>{p.name}</h3>
              <p className={`${styles.tagline} ${styles.reveal}`}>{p.tagline}</p>
              <p className={`${styles.text} ${styles.reveal}`}>{p.description}</p>
              <a href={p.cta.href} className={`${styles.cta} ${styles.reveal}`}>
                {p.cta.label}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        );
      })}

      {total > 1 && (
        <ol className={styles.rail} data-tone={bodySplashes[active].tone} aria-hidden="true">
          {bodySplashes.map((p, i) => (
            <li key={p.id} className={i === active ? styles.railActive : ""}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.railName}>{p.name}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
    </>
  );
}
