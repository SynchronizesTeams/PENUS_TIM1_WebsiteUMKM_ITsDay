export function navbarScroll() {
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
}
