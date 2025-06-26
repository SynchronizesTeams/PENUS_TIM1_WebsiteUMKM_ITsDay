import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

export function textAnimation() {
  const sections = [
    {
      trigger: "#overview",
      targets: "#overview-title, #overview-subtitle",
    },
    {
      trigger: "#about",
      targets: "#about-title, #about-text",
    },
    {
      trigger: "#pricing",
      targets: "#pricing-title, #pricing-subtitle",
    },
    {
      trigger: "#products",
      targets: "#products-title, #products-subtitle",
    },
    {
      trigger: "#contact",
      targets: "#contact-title, #contact-subtitle",
    },
  ];

  sections.forEach(({ trigger, targets }) => {
    const split = new SplitText(targets, { type: "words" });
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
          trigger: trigger,
          start: "top 85%",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}
