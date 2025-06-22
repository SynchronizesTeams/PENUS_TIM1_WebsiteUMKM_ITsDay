export function navbarScroll() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  // Scroll effect
  window.addEventListener("scroll", () => {
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


  hamburger.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");

    mobileMenu.classList.toggle("hidden");
    hamburger.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.setAttribute("aria-hidden", String(isOpen));
  });
}
