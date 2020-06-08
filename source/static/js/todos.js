const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const titleInput = todoForm.querySelector("#title");
const descripInput = todoForm.querySelector("#descrip");
const overlay = document.querySelector(".overlay");

let appState = "Normal";

const MathUtils = {
  // map number x from range [a, b] to [c, d]
  map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
  // linear interpolation
  lerp: (a, b, n) => (1 - n) * a + n * b,
};

const body = document.body;
// calculate the viewport size
let winsize;
const calcWinsize = () =>
  (winsize = { width: window.innerWidth, height: window.innerHeight });
calcWinsize();
// and recalculate on resize
window.addEventListener("resize", calcWinsize);

// Activate the Todo form
let isFormActive = null;
function deactivateForm() {
  // this is cheating, I don't know what the fuck I am doing here
  if (overlay.classList.length === 1) return;

  console.log(overlay.classList.length);

  titleInput.value = "";
  descripInput.value = "";

  if (overlay.classList == "overlay active") {
    todoForm.classList.remove("active");
    overlay.classList.remove("active");
  }
  console.log("deactive is ");
  appState = "Normal";
  // isFormActive = false;
}
// Deactiave the todo form if Active
function activateForm() {
  // if (isFormActive === null) return;

  todoForm.classList.add("active");
  overlay.classList.add("active");
  console.log("activate");
}

let docScroll;
const getPageYScroll = () => {
  return (docScroll = window.pageYOffset || document.documentElement.scrollTop);
};
window.addEventListener("scroll", () => {
  getPageYScroll();
  deactivateForm();
});

// copy the content of the card to the form
// check the url of the form to the specific card
// Change the add button to a save button
function handleEdit(elem) {
  titleInput.value = elem.querySelector(".todo-title").innerHTML;
  todoForm.setAttribute(
    "action",
    `${elem.querySelector(".edit-btn").dataset.url}`
  );
  descripInput.value = elem.querySelector(".card-body p").innerHTML;
  todoForm.querySelector("button").innerHTML = "Save";

  // just for the animinaion
  const formObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0 && isFormActive) {
        activateForm();
        console.log("inside");
        isFormActive = false;
      }
    });
  });
  formObserver.observe(todoForm);
}

// Change the url to add url
function handleAdd() {
  if (appState === "Edit") return;

  // just incase it has been change by handleEdit
  todoForm.querySelector("button").innerHTML = "Add";

  todoForm.setAttribute("action", "");
  activateForm();
}
class SmoothScroll {
  constructor() {
    this.DOM = { main: document.querySelector("main") };
    this.DOM.scrollable = this.DOM.main.querySelector("div[data-scroll]");
    this.renderedStyles = {
      translationY: {
        previous: 0,
        current: 0,
        ease: 0.0875,
        setValue: () => docScroll,
      },
    };

    this.setSize();
    this.update();
    this.style();
    this.initEvents();
    requestAnimationFrame(() => this.render());
  }

  update() {
    // sets the initial value (no interpolation) - translate the scroll value
    for (const key in this.renderedStyles) {
      this.renderedStyles[key].current = this.renderedStyles[
        key
      ].previous = this.renderedStyles[key].setValue();
    }
    this.layout();
  }

  layout() {
    this.DOM.scrollable.style.transform = `translate3d(0,${
      -1 * this.renderedStyles.translationY.previous
    }px,0)`;
  }

  setSize() {
    body.style.height = `${this.DOM.scrollable.scrollHeight}px`;
  }

  style() {
    this.DOM.main.style.position = "fixed";
    this.DOM.main.style.width = this.DOM.main.style.height = "100%";
    this.DOM.main.style.top = this.DOM.main.style.left = 0;
    this.DOM.main.style.overflow = "hidden";
  }
  initEvents() {
    window.addEventListener("resize", () => this.setSize());
  }

  render() {
    for (const key in this.renderedStyles) {
      this.renderedStyles[key].current = this.renderedStyles[key].setValue();
      this.renderedStyles[key].previous = MathUtils.lerp(
        this.renderedStyles[key].previous,
        this.renderedStyles[key].current,
        this.renderedStyles[key].ease
      );
    }
    this.layout();

    // for (const item of this.items) {
    //   if (item.isVisible) {
    //     item.render();
    //   }
    // }

    requestAnimationFrame(() => this.render());
  }
}

getPageYScroll();
const smothScrol = new SmoothScroll();
todoList.addEventListener("click", (e) => {
  // const todo
  if (e.target.closest(".edit-btn") || e.target.className === "edit-bt") {
    const card = e.target.closest(".card");
    window.scrollTo(0, 10);
    smothScrol.render();

    isFormActive = true;
    appState = "Edit";
    handleEdit(card, e.target);
  }
  if (e.target.closest(".expand-btn") || e.target.className === "expand-btn") {
    // const card = e.target.closest(".card");
    // handleEdit(card);
  }
  return;
});
overlay.addEventListener("click", (e) => {
  deactivateForm();
});

titleInput.addEventListener("focus", () => {
  handleAdd();
  // activateForm();
});
