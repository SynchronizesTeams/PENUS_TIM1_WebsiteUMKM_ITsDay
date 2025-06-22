import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

export function animateHero() {
  const heroText = new SplitText("#hero-title, #hero-subtitle", {
    type: "words",
  });

  gsap.fromTo(
    heroText.words,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.1,
      ease: "power4.out",
    }
  );
}