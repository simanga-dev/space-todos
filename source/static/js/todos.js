const titleInput = document.querySelector("#title");
const form = document.querySelector("#todo-form");
const overlay = document.querySelector(".page-overlay");

titleInput.addEventListener("focus", (e) => {
  form.classList.add("isForm-active");
  overlay.classList.add("active");
});
overlay.addEventListener("click", (e) => {
  form.classList.remove("isForm-active");
  overlay.classList.remove("active");
});

document.addEventListener("click", (e) => {
  console.log(e.target);
});
