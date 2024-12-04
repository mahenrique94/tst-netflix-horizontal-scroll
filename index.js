const SCROLL_DIRECTIONS = ["left", "right"];
const SCROLL_ORIENTATIONS = ["horizontal", "vertical"];

const leftControl = document.querySelector('[data-scroll-direction="left"]');
const rightControl = document.querySelector('[data-scroll-direction="right"]');

if (leftControl) {
  leftControl.addEventListener("click", handleScroll);

  leftControl.classList.add("is-disabled");
}

if (rightControl) {
  rightControl.addEventListener("click", handleScroll);
}

function handleScroll(event) {
  event.preventDefault();

  const control = event.target;

  const {
    scrollDirection,
    scrollOrientation = "horizontal",
    scrollTarget,
  } = control.dataset;

  if (!scrollTarget) {
    console.error(`${control.outerHTML}: There's no target to be scrolled at`);
  }

  if (!SCROLL_DIRECTIONS.includes(scrollDirection)) {
    console.error(
      `${
        control.outerHTML
      }: You can't scroll to ${scrollDirection}, valid values are: ${SCROLL_DIRECTIONS.join(
        ", "
      )}`
    );
  }

  if (!SCROLL_ORIENTATIONS.includes(scrollOrientation)) {
    console.error(
      `${
        control.outerHTML
      }: You can't scroll into ${scrollOrientation}, valid values are: ${SCROLL_ORIENTATIONS.join(
        ", "
      )}`
    );
  }

  const target = document.getElementById(scrollTarget);

  if (!target) {
    console.error(`There's no scroll target with #${scrollTarget}`);
  }

  const gap = 16;
  const { width } = target.firstElementChild.getBoundingClientRect();
  const scrollDistance = width + gap;

  target.scrollBy({
    left: scrollDirection === "left" ? -scrollDistance : scrollDistance,
    behavior: "smooth",
  });

  const secondToLast = target.children[target.children.length - 2];

  if (secondToLast) {
    const { x } = secondToLast.getBoundingClientRect();
    const hasOnlyOneRemaining = x < window.innerWidth;

    if (hasOnlyOneRemaining) {
      if (scrollDirection === "right") {
        target.scrollBy({
          left: target.getBoundingClientRect().width,
          behavior: "smooth",
        });

        rightControl.classList.add("is-disabled");
      }
    }
  }

  if (scrollDirection === "right") {
    leftControl.classList.remove("is-disabled");
  } else {
    if (target.scrollLeft <= scrollDistance) {
      leftControl.classList.add("is-disabled");
    }

    rightControl.classList.remove("is-disabled");
  }
}
