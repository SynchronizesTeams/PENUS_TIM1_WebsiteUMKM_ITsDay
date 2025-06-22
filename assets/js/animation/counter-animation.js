import gsap from "gsap";

export function counterAnimation() {
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
}
