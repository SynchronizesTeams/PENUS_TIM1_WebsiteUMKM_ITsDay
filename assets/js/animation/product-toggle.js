import gsap from "gsap";

export function productToggle() {
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
}
