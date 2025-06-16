import Lenis from "lenis";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "lenis/dist/lenis.css";

const lenis = new Lenis();

gsap.registerPlugin(ScrollTrigger, SplitText);

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const gradientCursor = document.getElementById("gradientCursor");
const gradientCursorInner = document.getElementById("gradientCursorInner");

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let cursorInnerX = 0;
let cursorInnerY = 0;

const text = new SplitText("#hero-title, #hero-subtitle", { type: "words" });
gsap.fromTo(
  text.words,
  {
    y: 100,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 1.5,
    stagger: 0.1,
    ease: "power4.out",
  }
);

const sections = [
  { title: "#overview-title", subtitle: "#overview-subtitle" },
  { title: "#services-title", subtitle: "#services-subtitle" },
  { title: "#pricing-title", subtitle: "#pricing-subtitle" },
  { title: "#contact-title", subtitle: "#contact-subtitle" },
];

sections.forEach((section) => {
  const targets = `${section.title}, ${section.subtitle}`;
  const split = new SplitText(targets, { type: "words" });

  gsap.fromTo(
    split.words,
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.05,
      ease: "power4.out",
      scrollTrigger: {
        trigger: section.title,
        start: "top 85%",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
    }
  );
});

document.querySelectorAll(".card").forEach((card, i) => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    })
    .from(card, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: i * 0.15,
      ease: "power2.out",
    });
});

function initHoverEffects() {
  const hoverElements = document.querySelectorAll(".hover-rotate-text");

  hoverElements.forEach((element) => {
    const original = element.querySelector("span");
    const clone = original.cloneNode(true);
    element.appendChild(clone);

    gsap.set(clone, { position: "absolute", top: 0, left: 0 });

    const originalSplit = SplitText.create(original, { type: "chars" });
    const cloneSplit = SplitText.create(clone, { type: "chars" });

    gsap.set(cloneSplit.chars, {
      rotationX: -20,
      opacity: 0,
      transformOrigin: "50% 50% -50",
    });

    const duration = 0.4;
    const stagger = { each: 0.02, ease: "power2", from: "start" };

    const tl = gsap.timeline({ paused: true });

    tl.to(originalSplit.chars, {
      duration: duration,
      rotationX: 30,
      transformOrigin: "50% 50% -50",
      stagger: stagger,
    });

    tl.to(
      originalSplit.chars,
      {
        duration: duration,
        opacity: 0,
        stagger: stagger,
        ease: "power4.in",
      },
      0
    );

    tl.to(
      cloneSplit.chars,
      {
        duration: 0.05,
        opacity: 1,
        stagger: stagger,
      },
      0.001
    );

    tl.to(
      cloneSplit.chars,
      {
        duration: duration,
        rotationX: 0,
        stagger: stagger,
      },
      0
    );

    element.addEventListener("mouseenter", () => {
      tl.restart();
    });

    element.addEventListener("mouseleave", () => {
      tl.reverse();
    });
  });
}

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

initHoverEffects();

document.querySelectorAll(".count").forEach((counter) => {
  let target = +counter.dataset.target;
  let obj = { val: 0 };

  gsap.to(obj, {
    val: target,
    duration: 2,
    ease: "power1.out",
    onUpdate: () => {
      counter.textContent = Math.floor(obj.val) + "+";
    },
  });
});
