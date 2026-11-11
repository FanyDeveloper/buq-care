import Image from "next/image";
import { ArrowIcon } from "@/components/icons/Icons";
import { formatPrice, showcaseCopy, type Product } from "@/data/products";
import styles from "./Showcase.module.css";

export default function ProductCard({ product }: { product: Product }) {
  const { image, hoverImage } = product;
  return (
    <article className={styles.card}>
      <a href={product.href} className={styles.cardLink} aria-label={`${showcaseCopy.cta}: ${product.name}`}>
        <div className={styles.cardMedia}>
          <Image
            unoptimized
            loading="eager"
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className={styles.cardPhoto}
            style={{ objectPosition: image.position }}
          />
          {hoverImage && (
            <Image
              unoptimized
              loading="eager"
              src={hoverImage.src}
              alt=""
              aria-hidden="true"
              width={hoverImage.width}
              height={hoverImage.height}
              className={`${styles.cardPhoto} ${styles.cardPhotoAlt}`}
              style={{ objectPosition: hoverImage.position }}
            />
          )}
        </div>
      </a>

      <div className={styles.cardBody}>
        <p className={styles.cardLine}>
          {product.line}
          {product.volume && <span> · {product.volume}</span>}
        </p>
        <h3 className={styles.cardName}>
          <a href={product.href}>{product.name}</a>
        </h3>
        <p className={styles.cardDesc}>{product.description}</p>
        <div className={styles.cardFoot}>
          <span className={product.price === null ? styles.pricePending : styles.price}>
            {formatPrice(product.price, showcaseCopy.pricePending)}
          </span>
          <a href={product.href} className={styles.cardCta}>
            {showcaseCopy.cta}
            <ArrowIcon size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}
