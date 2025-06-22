import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

export function animateHero() {
  const heroText = new SplitText("#hero-title, #hero-subtitle", {
    type: "words",
  });

  requestIdleCallback(() => {
    gsap.fromTo(
      heroText.words,
      { y: 100 },
      {
        y: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power4.out",
      }
    );
  });
}
