const theme = document.getElementById("theme");
const favicon = document.getElementById("favicon");
const logo = document.getElementById("brain");
let themeSwitch = document.getElementById("darkmode")
let setDark;

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches
) {
  lightMode();
} else {
  darkMode();
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    const newColorScheme = e.matches ? "dark" : "light";
    if (newColorScheme == "light") {
      lightMode();
    } else {
      darkMode();
    }
  });

function lightMode() {
  theme.setAttribute("href", "css/styleLight.css");
  favicon.setAttribute("href", "images/logoLightMode.png");
  console.log("light");
  setDark = false;
}

function darkMode() {
  theme.setAttribute("href", "css/styleDark.css");
  favicon.setAttribute("href", "images/logoDarkMode.png");
  console.log("dark");
  setDark = true;
}

themeSwitch.onclick = function () {
  if (setDark == true) {
    lightMode();
  }
  else {
    darkMode();
  }
}

// Side Navigation Menu JS Code (for phone viewers)
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
let navBar = document.querySelector(".navbar");
menuBtn.onclick = function () {
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  navBar.classList.add("active");
};
cancelBtn.onclick = function () {
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  navBar.classList.remove("active");
};
//Sticky Navigation
let nav = document.querySelector("nav");
let val;
window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    if (setDark == true) {
      logo.setAttribute("src", "images/logoLightMode.png");
    } else {
      logo.setAttribute("src", "images/logoDarkMode.png");
    }
    nav.classList.add("sticky");
  } else {
    logo.setAttribute("src", "images/logoTheme.png");
    nav.classList.remove("sticky");
  }
};
