import gsap from "gsap";

export function pricingSection() {
  const container = document.querySelector(".pricing-cards-container");
  const cards = gsap.utils.toArray(".pricing-cards-container > div");

  gsap.to(container, {
    xPercent: -100 * (cards.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: "#pricing",
      pin: true,
      scrub: 1,
      end: () => "+=" + container.scrollWidth,
      invalidateOnRefresh: true,
    },
  });
}
