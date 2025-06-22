import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

export function hoverEffect() {
  document.querySelectorAll(".hover-rotate-text").forEach((element) => {
    const original = element.querySelector("span");
    const clone = original.cloneNode(true);
    element.appendChild(clone);
    gsap.set(clone, { position: "absolute", top: 0, left: 0 });

    const [oSplit, cSplit] = [
      new SplitText(original, { type: "chars" }),
      new SplitText(clone, { type: "chars" }),
    ];
    gsap.set(cSplit.chars, {
      rotationX: -20,
      opacity: 0,
      transformOrigin: "50% 50% -50",
    });

    const duration = 0.4;
    const stagger = { each: 0.02, ease: "power2", from: "start" };

    const tl = gsap.timeline({ paused: true });

    tl.to(oSplit.chars, {
      duration,
      rotationX: 30,
      transformOrigin: "50% 50% -50",
      stagger,
    });
    tl.to(
      oSplit.chars,
      { duration, opacity: 0, stagger: stagger, ease: "power4.in" },
      0
    );
    tl.to(cSplit.chars, { duration: 0.05, opacity: 1, stagger }, 0.001);
    tl.to(cSplit.chars, { duration, rotationX: 0, stagger }, 0);

    element.addEventListener("mouseenter", () => tl.restart());
    element.addEventListener("mouseleave", () => tl.reverse());
  });
}
