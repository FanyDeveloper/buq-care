import Image from "next/image";
import { ArrowIcon } from "@/components/icons/Icons";
import styles from "./Hero.module.css";

/*
 * HERO — Body Splash Violeta (fase estática, sem animações).
 * Camadas (de trás para frente):
 *   1. fundo (gradientes + luz)      2. marca d'água tipográfica
 *   3. pétalas de fundo (desfocadas) 4. flores de base + produto + sombra
 *   5. pétalas de primeiro plano     6. textos
 */
export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      {/* 1. Fundo */}
      <div className={styles.bg} aria-hidden="true">
        <span className={styles.glowTop} />
        <span className={styles.glowProduct} />
        <span className={styles.silk} />
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
            Sua essência,
            <br />
            <em>sua presença.</em>
          </h1>
          <p className={styles.lead}>
            Descubra fragrâncias que transformam pequenos momentos em
            experiências inesquecíveis.
          </p>
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
          <div className={styles.ctas}>
            <a href="#" className={styles.ctaPrimary}>
              Descubra BUQ Care
              <ArrowIcon />
            </a>
          </div>
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
