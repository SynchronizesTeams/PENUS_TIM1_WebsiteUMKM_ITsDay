import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

export function textAnimation() {
  const sections = [
    "#overview-title, #overview-subtitle",
    "#services-title, #services-subtitle",
    "#pricing-title, #pricing-subtitle",
    "#contact-title, #contact-subtitle",
  ];

  sections.forEach((selector) => {
    const split = new SplitText(selector, { type: "words" });
    gsap.fromTo(
      split.words,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: {
          trigger: selector.split(",")[0],
          start: "top 85%",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}
