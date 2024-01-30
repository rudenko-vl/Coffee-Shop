const search = document.querySelector(".search-box");
const searchBtn = document.getElementById("search-icon");
const navbar = document.querySelector(".navbar");
const menuIcon = document.getElementById("menu-icon");


searchBtn.addEventListener("click", () => {
  search.classList.toggle("active");
  navbar.classList.remove("active");
});

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
  search.classList.remove("active");
});

window.onscroll = () => {
  navbar.classList.remove("active");
  // search.classList.remove("active");
};

let header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});
