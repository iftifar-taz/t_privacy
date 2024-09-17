window.mobileBrowser = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

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

  if (!mobileBrowser()) {
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
