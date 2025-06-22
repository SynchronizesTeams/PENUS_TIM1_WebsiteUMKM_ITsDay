export function customSelect() {
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
}
