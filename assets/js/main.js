import Lenis from "lenis";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "lenis/dist/lenis.css";

// Inisialisasi Lenis smooth scroll
const lenis = new Lenis();
gsap.registerPlugin(ScrollTrigger, SplitText);
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Cursor custom untuk desktop
const gradientCursor = document.getElementById("gradientCursor");
const gradientCursorInner = document.getElementById("gradientCursorInner");

let mouseX = 0,
  mouseY = 0;
let cursorX = 0,
  cursorY = 0;
let cursorInnerX = 0,
  cursorInnerY = 0;

function isMobile() {
  return window.innerWidth < 768 || screen.width < 768;
}

// Animasi teks hero
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

// Animasi section title & subtitle
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

// Animasi card
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

// Hover text animation
function initHoverEffects() {
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
initHoverEffects();

// Navbar shadow on scroll
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

// Custom cursor (desktop only)
if (!isMobile()) {
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

  // Smooth follow
  gsap.ticker.add(() => {
    cursorX += (mouseX - cursorX) * 0.05;
    cursorY += (mouseY - cursorY) * 0.05;
    cursorInnerX += (mouseX - cursorInnerX) * 0.15;
    cursorInnerY += (mouseY - cursorInnerY) * 0.15;

    gsap.set(gradientCursor, { x: cursorX, y: cursorY });
    gsap.set(gradientCursorInner, { x: cursorInnerX, y: cursorInnerY });
  });
}

// Dropdown logic
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

document.addEventListener("click", (e) => {
  if (!dropdownBtn.contains(e.target) && !dropdownList.contains(e.target)) {
    dropdownList.classList.add("hidden");
  }
});

// Counter animations
document.querySelectorAll(".count").forEach((counter) => {
  const target = +counter.dataset.target;
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 2,
    ease: "power1.out",
    onUpdate: () => (counter.textContent = Math.floor(obj.val) + "+"),
  });
});

// Toggle produk (jika ada bagian produk)
const toggleBtn = document.getElementById("ToggleBtn");
const productGrid = document.getElementById("productGrid");
if (toggleBtn && productGrid) {
  const hiddenProducts = [
    ...productGrid.querySelectorAll(".product:nth-child(n+5)"),
  ];
  let isExpanded = false;

  toggleBtn.addEventListener("click", () => {
    toggleBtn.disabled = true;
    const tl = gsap.timeline({
      onComplete: () => (toggleBtn.disabled = false),
    });

    tl.to(toggleBtn, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: "power1.in",
    });

    if (!isExpanded) {
      hiddenProducts.forEach((product, index) => {
        product.classList.remove("hidden");
        tl.fromTo(
          product,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          0.05
        );
      });
    } else {
      hiddenProducts.forEach((product, index) => {
        tl.to(
          product,
          {
            opacity: 0,
            y: 50,
            duration: 0.3,
            ease: "power1.in",
            onComplete: () => product.classList.add("hidden"),
          },
          0.05
        );
      });
    }

    tl.add(() => {
      toggleBtn.textContent = isExpanded
        ? "Lihat Semua Produk"
        : "Tampilkan Lebih Sedikit";
      isExpanded = !isExpanded;
    });

    tl.to(
      toggleBtn,
      { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
      "+=0.1"
    );
  });
}
