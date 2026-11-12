"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowIcon } from "@/components/icons/Icons";
import { gsap, useSectionAnimation } from "@/lib/animations";
import styles from "./Hero.module.css";

/*
 * HERO — Body Splash Violeta (fase estática, sem animações).
 * Camadas (de trás para frente):
 *   1. fundo (gradientes + luz)      2. marca d'água tipográfica
 *   3. pétalas de fundo (desfocadas) 4. flores de base + produto + sombra
 *   5. pétalas de primeiro plano     6. textos
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useSectionAnimation(ref, (el) => {
    const $ = (cls: string) => el.querySelector(`.${cls}`);
    const flowers = {
      lotusTop: $(styles.flowerLotusTop),
      hibRight: $(styles.flowerHibiscusRight),
      hibLeft: $(styles.flowerHibiscusLeft),
      lotusBottom: $(styles.flowerLotusBottom),
      hibFront: $(styles.flowerHibiscusFront),
    };

    // 1. ENTRADA — surge suave ao carregar (copy em sequência, frasco, flores)
    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .from([$(styles.eyebrow), $(styles.title), $(styles.lead), $(styles.ctas)], { y: 28, autoAlpha: 0, duration: 0.9, stagger: 0.1 }, 0.1)
      .from($(styles.bottle), { y: 46, autoAlpha: 0, duration: 1.2 }, 0.2)
      .from(Object.values(flowers), { scale: 0.86, autoAlpha: 0, duration: 1.1, stagger: 0.08 }, 0.35)
      .from($(styles.side), { y: 20, autoAlpha: 0, duration: 0.9 }, 0.6)
      .from(el.querySelectorAll(`.${styles.petal}`), { autoAlpha: 0, duration: 1.4, stagger: 0.06, ease: "power1.out" }, 0.3);

    // 2. ROLAGEM — frasco sobe; cada flor com trajetória e velocidade próprias
    //    (xPercent/yPercent não conflitam com o y/scale da entrada nem com a rotação do CSS)
    const scroll = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1.2 },
    });
    scroll
      .to($(styles.bottle), { yPercent: -9 }, 0)
      .to(flowers.lotusTop, { yPercent: -50, xPercent: -26, rotation: "-=6" }, 0) // sobe e abre à esquerda
      .to(flowers.hibRight, { yPercent: -22, xPercent: 38, rotation: "+=8" }, 0) // espalha à direita
      .to(flowers.hibLeft, { yPercent: -10, xPercent: -44, rotation: "-=5" }, 0) // espalha à esquerda
      .to(flowers.lotusBottom, { yPercent: -14, xPercent: 28, rotation: "+=4" }, 0) // leve abertura
      .to(flowers.hibFront, { yPercent: -34, xPercent: -30, rotation: "+=10" }, 0) // primeiro plano, mais rápida
      .to(el.querySelectorAll(`.${styles.petalsFront} .${styles.petal}`), { yPercent: -60 }, 0)
      .to(el.querySelectorAll(`.${styles.petalsBack} .${styles.petal}`), { yPercent: -25 }, 0);
  });

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="hero-title">
      {/* 1. Fundo */}
      <div className={styles.bg} aria-hidden="true">
        <span className={styles.glowTop} />
        <span className={styles.glowProduct} />
        <span className={styles.silk} />
        <span className={styles.silkLine} />
        {/* pontos de luz desfocados (bokeh) em lavanda e violeta */}
        <span className={`${styles.bokeh} ${styles.bk1}`} />
        <span className={`${styles.bokeh} ${styles.bk2}`} />
        <span className={`${styles.bokeh} ${styles.bk3}`} />
        <span className={`${styles.bokeh} ${styles.bk4}`} />
        <span className={`${styles.bokeh} ${styles.bk5}`} />
        {/* brilhos pequenos e anéis finos */}
        <span className={`${styles.sparkle} ${styles.sp1}`} />
        <span className={`${styles.sparkle} ${styles.sp2}`} />
        <span className={`${styles.sparkle} ${styles.sp3}`} />
        <span className={`${styles.sparkle} ${styles.sp4}`} />
        <span className={`${styles.ring} ${styles.rg1}`} />
        <span className={`${styles.ring} ${styles.rg2}`} />
      </div>

      {/* 2. Marca d'água */}
      <p className={styles.watermark} aria-hidden="true">
        violeta
      </p>

      {/* 3. Pétalas de fundo */}
      <div className={styles.petalsBack} aria-hidden="true">
        <Image unoptimized src="/images/hero/petal-2.png" alt="" width={741} height={451} className={`${styles.petal} ${styles.pb1}`} />
        <Image unoptimized src="/images/hero/petal-3.png" alt="" width={648} height={510} className={`${styles.petal} ${styles.pb2}`} />
        <Image unoptimized src="/images/hero/petal-1.png" alt="" width={732} height={529} className={`${styles.petal} ${styles.pb3}`} />
      </div>

      <div className={styles.container}>
        {/* 6a. Texto principal (esquerda) */}
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.line} />
            Body Splash Violeta
          </p>
          <h1 id="hero-title" className={styles.title}>
            Sua essência
            <em>sua presença.</em>
          </h1>
          <p className={styles.lead}>
            Descubra fragrâncias que transformam pequenos momentos em
            experiências inesquecíveis.
          </p>
          <div className={styles.ctas}>
            <a href="#" className={styles.ctaPrimary}>
              Descubra BUQ Care
              <ArrowIcon />
            </a>
          </div>
        </div>

        {/* 4. Palco do produto — flores posicionadas em relação ao frasco */}
        <div className={styles.stage}>
          <span className={styles.halo} aria-hidden="true" />
          <div className={styles.product}>
            <span className={styles.ambient} aria-hidden="true" />
            <span className={styles.shadow} aria-hidden="true" />
            {/* atrás do frasco */}
            <Image unoptimized src="/images/hero/lotus.png" alt="" aria-hidden="true" width={1312} height={1199} className={styles.flowerLotusTop} />
            <Image unoptimized src="/images/hero/hibiscus-ivory.png" alt="" aria-hidden="true" width={1291} height={1218} className={styles.flowerHibiscusRight} />
            <Image unoptimized src="/images/hero/hibiscus-ivory.png" alt="" aria-hidden="true" width={1291} height={1218} className={styles.flowerHibiscusLeft} />
            <Image unoptimized src="/images/hero/lotus.png" alt="" aria-hidden="true" width={1312} height={1199} className={styles.flowerLotusBottom} />
            <Image
              unoptimized
              src="/images/hero/violet-bottle.png"
              alt="Body Splash Deo Colônia Violeta Buq Care, 200 ml"
              width={404}
              height={1412}
              priority
              className={styles.bottle}
            />
            {/* à frente do frasco, sem cobrir o rótulo */}
            <Image unoptimized src="/images/hero/hibiscus-ivory.png" alt="" aria-hidden="true" width={1291} height={1218} className={styles.flowerHibiscusFront} />
          </div>
        </div>

        {/* 6b. Texto secundário (direita) */}
        <aside className={styles.side}>
          <p className={styles.sideLabel}>
            <span className={styles.line} />
            Violeta
          </p>
          <p className={styles.sideText}>
            Intensidade que encanta.
          </p>
        </aside>
      </div>

      {/* 5. Pétalas de primeiro plano */}
      <div className={styles.petalsFront} aria-hidden="true">
        <Image unoptimized src="/images/hero/petal-1.png" alt="" width={732} height={529} className={`${styles.petal} ${styles.pf1}`} />
        <Image unoptimized src="/images/hero/petal-3.png" alt="" width={648} height={510} className={`${styles.petal} ${styles.pf2}`} />
        <Image unoptimized src="/images/hero/petal-2.png" alt="" width={741} height={451} className={`${styles.petal} ${styles.pf3}`} />
      </div>

      <p className={styles.scrollHint} aria-hidden="true">
        <span />
        Role
      </p>
    </section>
  );
}
