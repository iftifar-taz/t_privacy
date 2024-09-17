const sections = document.querySelectorAll("section[id]");
const scrollTopButton = document.querySelector(".scroll-to-top");
const headerHeight = document
  .querySelector(".header")
  .getBoundingClientRect().height;
let scrollTimeout = null;
const nav = document.querySelector(".navigation");
const subFooter = document.querySelector(".sub-footer");
const footer = document.querySelector(".footer");
const subFooterTop = subFooter.offsetTop;

// window.addEventListener("scrollend", () => {
//   this.navHighlighter();
// });
window.addEventListener("scroll", () => {
  // Get current scroll position
  let scrollY = window.scrollY;

  // Check if the sub-footer is about to overlap the navigation
  if (scrollY + nav.offsetHeight > subFooterTop) {
    // Adjust the navigation's position to scroll up
    nav.style.position = "absolute";
    nav.style.top = `${subFooterTop - nav.offsetHeight}px`;
  } else {
    // Reset the navigation's position to fixed
    nav.style.position = "fixed";
    nav.style.top = "0px";
  }

  // nav highlighter
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  scrollTimeout = setTimeout(() => {
    this.navHighlighter();
  }, 500); // adjust the timeout value as needed (max should be time takes to go from 1st menu to last menu when clicked)
});

function navHighlighter() {
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - headerHeight;
    let sectionId = current.getAttribute("id");
    let menuId = sectionId.split("-")[0];

    if (menuId && menuId != "") {
      let hyperlink = document.querySelector(
        ".navigation ul li[id*=" + menuId + "] div a"
      );

      let parent = document.querySelector(
        ".navigation ul li[id*=" + menuId + "]"
      );
      let secondChild = parent?.childNodes[3];
      let icon = parent.querySelector("div i");
      if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
        hyperlink.classList.add("active-parent");
        if (secondChild && secondChild.classList.contains("d-none")) {
          secondChild.classList.remove("d-none");
          secondChild.classList.add("d-block");
          if (icon) {
            icon.classList.add("rotate");
          }
        }
        childNavHighlighter(current, parent);
      } else {
        hyperlink.classList.remove("active-parent");
        if (secondChild && secondChild.classList.contains("d-block")) {
          secondChild.classList.remove("d-block");
          secondChild.classList.add("d-none");
          if (icon) {
            icon.classList.remove("rotate");
          }
        }
      }
    } else {
      alert("Something went wrong.");
    }
  });

  //Remove active child
  document
    .querySelectorAll(".navigation .child-item.d-none .active-child")
    .forEach((x) => {
      x.classList.remove("active-child");
    });

  //Scroll to top button
  if (window.scrollY > 500) {
    scrollTopButton.style.display = "block";
  } else {
    scrollTopButton.style.display = "none";
  }
}

function childNavHighlighter(current, menu) {
  let scrollVertical = window.scrollY;

  if (Object.keys(menu.children).length < 2) {
    return;
  }
  //Menu
  let childMenu = menu.children[1];
  let childMenuList = childMenu.children;
  //Section
  let child = current.querySelectorAll(".inner-section");
  let childList = child[0]?.children;

  childList &&
    childList?.length > 0 &&
    Object.keys(childList).forEach((key) => {
      let childSectionId = childList[key].getAttribute("id");
      let childMenuIndex = parseInt(childSectionId.split("-")[1]) - 1;
      const childSectionHeight = childList[key].offsetHeight;
      const childSectionTop = childList[key].offsetTop - headerHeight;
      let singleChild = childMenuList[childMenuIndex];
      if (
        singleChild &&
        scrollVertical >= childSectionTop &&
        scrollVertical <= childSectionTop + childSectionHeight
      ) {
        singleChild.children[0].classList.add("active-child");
      } else {
        singleChild.children[0].classList.remove("active-child");
      }
    });
}

// nav menu click
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - headerHeight,
      behavior: "smooth",
    });
  }
}

// Scroll to top button click
scrollTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
