import { BagIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/icons/Icons";
import styles from "./Header.module.css";

// Links provisórios — a navegação definitiva será definida depois.
const leftLinks = ["Body Splash", "Perfumaria"];
const rightLinks = ["Cuidados", "Sobre"];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button className={styles.menuBtn} aria-label="Abrir menu">
          <MenuIcon />
        </button>

        <nav className={styles.navLeft} aria-label="Principal">
          {leftLinks.map((l) => (
            <a key={l} href="#" className={styles.link}>
              {l}
            </a>
          ))}
        </nav>

        {/* Logo provisória em texto: nenhum arquivo de logo foi fornecido. */}
        <a href="#" className={styles.logo} aria-label="Buq Care — início">
          <span className={styles.logoMain}>BUQ</span>
          <span className={styles.logoSub}>care</span>
        </a>

        <nav className={styles.navRight} aria-label="Secundária">
          {rightLinks.map((l) => (
            <a key={l} href="#" className={styles.link}>
              {l}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button aria-label="Pesquisar" className={styles.iconBtn}>
            <SearchIcon />
          </button>
          <button aria-label="Minha conta" className={`${styles.iconBtn} ${styles.hideSm}`}>
            <UserIcon />
          </button>
          <button aria-label="Sacola" className={styles.iconBtn}>
            <BagIcon />
            <span className={styles.badge}>0</span>
          </button>
        </div>
      </div>
    </header>
  );
}
