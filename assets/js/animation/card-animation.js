import gsap from "gsap";

export function animateCards() {
  document.querySelectorAll(".card").forEach((card, i) => {
    gsap.from(card, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: i * 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });
}
