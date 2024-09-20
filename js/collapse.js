let items = document.getElementsByClassName("item");
let i;

for (i = 0; i < items.length; i++) {
  items[i].addEventListener("click", function () {
    let sibling = this.nextElementSibling;
    if (sibling) {
      let icon = this.querySelector("i");
      if (!sibling.classList.contains("d-block")) {
        sibling.classList.remove("d-none");
        sibling.classList.add("d-block");
        icon.classList.add("rotate");
      } else {
        sibling.classList.remove("d-block");
        sibling.classList.add("d-none");
        icon.classList.remove("rotate");
      }
    }
  });
}

//Mobile collapse
var mobileDrop = document.querySelector(".mobile-dropdown");
const iconMobile = document.querySelector(".mobile-dropdown .fa-chevron-down");
mobileDrop &&
  mobileDrop.addEventListener("click", function () {
    let nav = document.querySelector("#aside");
    if (getComputedStyle(nav).display === "none") {
      nav.style.display = "block";
      iconMobile.classList.add("rotate");
      // mobileDrop[0].style.display = "block";
    } else {
      nav.style.display = "none";
      iconMobile.classList.remove("rotate");
      // mobileDrop[0].style.display = "none";
    }
  });

document.getElementById("collapseBtn").addEventListener("click", function () {
  document.querySelector(".mobile-nav-links").classList.toggle("d-block");
  document.querySelector(".mobile-nav-links").classList.toggle("d-none");
});
