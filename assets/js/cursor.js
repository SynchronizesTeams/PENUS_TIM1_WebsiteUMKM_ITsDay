import { gsap } from "gsap";

export function cursorEffect() {
  const gradientCursor = document.getElementById("gradientCursor");
  const gradientCursorInner = document.getElementById("gradientCursorInner");

  let mouseX = 0,
    mouseY = 0;
  let cursorX = 0,
    cursorY = 0;
  let cursorInnerX = 0,
    cursorInnerY = 0;

  window.addEventListener("mousemove", (e) => {
    const target = e.target;
    const isLinkOrBtn = Boolean(
      target.closest("a") || target.closest("button")
    );

    mouseX = e.clientX;
    mouseY = e.clientY;

    gsap.to(gradientCursor, {
      x: mouseX,
      y: mouseY,
      scale: isLinkOrBtn ? 0.8 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(gradientCursorInner, {
      x: mouseX,
      y: mouseY,
      scale: isLinkOrBtn ? 0.5 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  gsap.ticker.add(() => {
    cursorX += (mouseX - cursorX) * 0.05;
    cursorY += (mouseY - cursorY) * 0.05;
    cursorInnerX += (mouseX - cursorInnerX) * 0.15;
    cursorInnerY += (mouseY - cursorInnerY) * 0.15;

    gsap.set(gradientCursor, { x: cursorX, y: cursorY });
    gsap.set(gradientCursorInner, { x: cursorInnerX, y: cursorInnerY });
  });
}
