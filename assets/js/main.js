import "./smooth-scroll.js";
import { animateHero } from "./animation/hero-animation.js";
import { textAnimation } from "./animation/text-animation.js";
import { animateCards } from "./animation/card-animation.js";
import { hoverEffect } from "./animation/hover-animation.js";
import { navbarScroll } from "./navbar-effect.js";
import { customSelect } from "./custom-select.js";
import { counterAnimation } from "./animation/counter-animation.js";
import { productToggle } from "./animation/product-toggle.js";
import { pricingSection } from "./pricing-section.js";
import { productDetails } from "./product-details.js";

document.addEventListener("DOMContentLoaded", () => {
  animateHero();
  textAnimation();
  animateCards();
  hoverEffect();
  navbarScroll();
  customSelect();
  counterAnimation();
  productToggle();
  pricingSection();
  productDetails();

  if (window.innerWidth >= 768) {
    import("./cursor.js").then(({ cursorEffect }) => {
      cursorEffect();
    });
  }
});
