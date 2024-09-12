// Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");
const scrollTopButton = document.querySelector(".scroll-to-top");
const headerHeight = document.querySelector(".header").getBoundingClientRect().height;
let currentActiveParents = null;
let clickedParent = null;
let isScroll = false;

window.addEventListener("scroll", () => {
  isScroll = true;
  this.navHighlighter();
  setTimeout(() => {
    isScroll = false;
}, 2000);
});

function navHighlighter() {
  let scrollY = window.scrollY;
  currentActiveParents = currentActiveParents || [];
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - headerHeight;
    let sectionId = current.getAttribute("id");
    let menuId = sectionId.split("-")[0];

    if (menuId && menuId != "") {
      let hyperlink = document.querySelector(
        ".navigation ul li[id*=" + menuId + "] div a"
      );

      if ([...currentActiveParents, clickedParent].includes(hyperlink) || isScroll) {
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
              icon.classList.remove("fa-chevron-down");
              icon.classList.add("fa-chevron-up");
            }
          }
          childNvHighlighter(current, parent);
        } else {
          hyperlink.classList.remove("active-parent");
          if (secondChild && secondChild.classList.contains("d-block")) {
            secondChild.classList.remove("d-block");
            secondChild.classList.add("d-none");
            if (icon) {
              icon.classList.remove("fa-chevron-up");
              icon.classList.add("fa-chevron-down");
            }
          }
        }
      }
    } else {
      alert("Something went wrong.");
    }
  });
  if (window.scrollY > 1500) {
    scrollTopButton.style.display = "block";
  } else {
    scrollTopButton.style.display = "none";
  }
}

function childNvHighlighter(current, menu) {
  let scrollVertical = window.scrollY;

  if(Object.keys(menu.children).length  < 2){
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

function scrollToSection(sectionId) {
  currentActiveParents = document.querySelectorAll(".active-parent");
  let menuId = sectionId.split("-")[0];
  clickedParent = document.querySelector(
    ".navigation ul li[id*=" + menuId + "] div a"
  );
  const section = document.getElementById(sectionId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - headerHeight,
      behavior: "smooth",
    });
  }
}

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
