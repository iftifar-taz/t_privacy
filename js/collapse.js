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
        icon.classList.add('rotate');
      } else {
        sibling.classList.remove("d-block");
        sibling.classList.add("d-none");
        icon.classList.remove('rotate');
      }
    }
  });
}

//Mobile collapse
var mobileDrop = document.getElementsByClassName("mobile-dropdown");
const iconMobile = document.querySelector('.fa-chevron-down');
mobileDrop &&
  mobileDrop[0].addEventListener("click", function () {
    let parent = document.getElementById("aside");
    let nav = document.getElementsByTagName("nav")[0];
    let display = window.getComputedStyle(parent).display;
    if (display === "none") {
      nav.style.display = "block";
      iconMobile.classList.add('rotate');
    } else {
      nav.style.display = "none";
      iconMobile.classList.remove('rotate');
    }
  });
