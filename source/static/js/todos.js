const titleInput = document.querySelector("#title");
const form = document.querySelector("#todo-form");
const overlay = document.querySelector(".page-overlay");

const arrowBtn = document.querySelector(".card-header .arrow");
const cardBody = document.querySelector(".card .card-body");
// console.log(arrowBtn, cardBody);

arrowBtn.addEventListener("click", (e) => {
  cardBody.classList.toggle("hide");
  arrowBtn.classList.toggle("collapse");
});

titleInput.addEventListener("focus", (e) => {
  form.classList.add("isForm-active");
  overlay.classList.add("active");
});
overlay.addEventListener("click", (e) => {
  form.classList.remove("isForm-active");
  overlay.classList.remove("active");
});

document.addEventListener("click", (e) => {
  // console.log(e.target);
});
