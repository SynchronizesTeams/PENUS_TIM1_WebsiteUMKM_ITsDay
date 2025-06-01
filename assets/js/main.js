import Lenis from "lenis";
import gsap from "gsap";
import Swiper from "swiper";
import "swiper/css";
import "lenis/dist/lenis.css";

const lenis = new Lenis({
  autoRaf: true,
});

const gradientCursor = document.getElementById("gradientCursor");
const gradientCursorInner = document.getElementById("gradientCursorInner");

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let cursorInnerX = 0;
let cursorInnerY = 0;

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1.2,
  spaceBetween: 24,
  loop: true,
  grabCursor: true,
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 5) {
    navbar.classList.add(
      "backdrop-blur-md",
      "bg-white/10",
      "border",
      "shadow-md"
    );
  } else {
    navbar.classList.remove(
      "backdrop-blur-md",
      "bg-white/10",
      "border",
      "shadow-md"
    );
  }
});

window.addEventListener("mousemove", (e) => {
  const targetElement = e.target;
  const isTargetLinkOrBtn = Boolean(
    targetElement?.closest("a") || targetElement?.closest("button")
  );

  mouseX = e.clientX;
  mouseY = e.clientY;

  gsap.to(gradientCursor, {
    x: e.clientX,
    y: e.clientY,
    scale: isTargetLinkOrBtn ? 0.8 : 1,
    duration: 0.3,
    ease: "power2.out",
  });
  gsap.to(gradientCursorInner, {
    x: e.clientX,
    y: e.clientY,
    scale: isTargetLinkOrBtn ? 0.5 : 1,
    duration: 0.3,
    ease: "power2.out",
  });
});

gsap.ticker.add(() => {
  cursorX += (mouseX - cursorX) * 0.05;
  cursorY += (mouseY - cursorY) * 0.05;

  cursorInnerX += (mouseX - cursorInnerX) * 0.15;
  cursorInnerY += (mouseY - cursorInnerY) * 0.15;

  gsap.set(gradientCursor, {
    x: cursorX,
    y: cursorY,
  });

  gsap.set(gradientCursorInner, {
    x: cursorInnerX,
    y: cursorInnerY,
  });
});

// gsap.registerPlugin(ScrollTrigger);

// gsap.from(".card", {
//   y: 50,
//   opacity: 0,
//   duration: 1,
//   stagger: 0.2,
//   scrollTrigger: {
//     trigger: ".card",
//     start: "top 80%",
//     end: "bottom 20%",
//     toggleActions: "play none none reverse",
//   },
// });

// gsap.from(".feature-card", {
//   y: 30,
//   opacity: 0,
//   duration: 0.8,
//   stagger: 0.1,
//   scrollTrigger: {
//     trigger: ".feature-grid",
//     start: "top 80%",
//     end: "bottom 20%",
//     toggleActions: "play none none reverse",
//   },
// });

const dropdownBtn = document.getElementById("dropdownButton");
const dropdownList = document.getElementById("dropdownList");
const selectedOption = document.getElementById("selectedOption");

dropdownBtn.addEventListener("click", () => {
  dropdownList.classList.toggle("hidden");
});

dropdownList.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", () => {
    selectedOption.textContent = item.textContent;
    dropdownList.classList.add("hidden");
  });
});

// Optional: klik di luar nutup dropdown
document.addEventListener("click", (e) => {
  if (!dropdownBtn.contains(e.target) && !dropdownList.contains(e.target)) {
    dropdownList.classList.add("hidden");
  }
});
