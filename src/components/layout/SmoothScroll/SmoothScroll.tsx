"use client";

import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

/*
 * Rolagem suave do site inteiro (GSAP ScrollSmoother + ScrollTrigger).
 *
 * Estrutura exigida pelo plugin:  #smooth-wrapper > #smooth-content > (site)
 *
 * Ordem importa: o ScrollSmoother precisa existir ANTES dos ScrollTriggers das
 * seções (pins, scrub, entradas). Como o React executa os efeitos dos irmãos em
 * ordem, o <SmootherInit /> é o PRIMEIRO filho do conteúdo — seu efeito roda
 * antes dos efeitos de todas as seções.
 *
 * prefers-reduced-motion: rolagem nativa, sem suavização.
 */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function SmootherInit() {
  useIsoLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.1, // atraso suave no desktop, sem deixar a rolagem lenta
      smoothTouch: 0.1, // toque: suavização mínima, mantém o gesto natural
      effects: false, // parallax continua controlado pelas próprias seções
    });

    return () => smoother.kill();
  }, []);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <SmootherInit />
        {children}
      </div>
    </div>
  );
}
