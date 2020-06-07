const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const titleInput = todoForm.querySelector("#title");

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

let docScroll;
const getPageYScroll = () => {
  return (docScroll = window.pageYOffset || document.documentElement.scrollTop);
};
window.addEventListener("scroll", getPageYScroll);

function handleEdit(elem) {
  titleInput.value = elem.querySelector(".todo-title").innerHTML;
  todoForm.setAttribute("action", "{% url 'editTodos' %}");
  let h = 12.8125;
  let nh = parseFloat(
    getComputedStyle(todoForm).getPropertyValue("--form-height"),
    10
  );
  const update = () => {
    let next = nh + 1;
    let prev = MathUtils.lerp(nh, next, 0.1);

    todoForm.style.height = `${prev}rem`;
    requestAnimationFrame(() => update());
  };
  const formObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        update();
      }
    });
  });
  formObserver.observe(todoForm);
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

    // console.log("hello");
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
    handleEdit(card);
  }
  if (e.target.closest(".expand-btn") || e.target.className === "expand-btn") {
    const card = e.target.closest(".card");
    handleEdit(card);
  }
  return;
});
