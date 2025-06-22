import gsap from "gsap";

export const productDetails = () => {
  const products = document.querySelectorAll(".product");

  products.forEach((item) => {
    const detail = item.querySelector(".detail-products");

    item.addEventListener("click", () => {
      const isOpen = detail.style.maxHeight && detail.style.maxHeight !== "0px";

      products.forEach((other) => {
        const otherDetail = other.querySelector(".detail-products");
        if (otherDetail !== detail) {
          gsap.to(otherDetail, {
            maxHeight: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });
        }
        
      });

      if (isOpen) {
        gsap.to(detail, {
          maxHeight: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(detail, {
          maxHeight: 200,
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
        });
      }
    });
  });
};
