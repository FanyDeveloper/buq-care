"use client";

/*
 * Base comum das animações do site (GSAP + ScrollTrigger).
 * - Tudo roda dentro de gsap.context() → cleanup automático ao desmontar.
 * - Só anima com prefers-reduced-motion: no-preference (senão, conteúdo estático).
 * - Entradas usam transform + opacity e limpam os estilos ao terminar
 *   (clearProps), para não interferir nos hovers feitos em CSS.
 */
import { useEffect, useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useSectionAnimation(ref: RefObject<HTMLElement | null>, setup: (el: HTMLElement) => void) {
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => setup(el));
    }, el);
    return () => ctx.revert();
    // a configuração é estática por seção
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* entrada padrão: fade + deslocamento vertical discreto, em sequência, uma única vez */
export function revealOnScroll(
  targets: gsap.TweenTarget,
  trigger: Element | string,
  { y = 32, duration = 0.7, stagger = 0.1, start = "top 85%", scale }: { y?: number; duration?: number; stagger?: number; start?: string; scale?: number } = {},
) {
  return gsap.from(targets, {
    y,
    ...(scale ? { scale } : {}),
    autoAlpha: 0,
    duration,
    stagger,
    ease: "power3.out",
    clearProps: "transform,opacity,visibility",
    scrollTrigger: { trigger, start, once: true },
  });
}
