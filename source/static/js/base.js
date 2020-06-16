//////// Utitlies
function easeInBack(
  beginningValue,
  endValue,
  durationInFrames,
  framesElapsed,
  delayInFrames = 0
) {
  var t = framesElapsed - delayInFrames < 0 ? 0 : framesElapsed; // time since start (as frames elapsed)
  var b = beginningValue; // beginning value
  var c = endValue - beginningValue; //  change in value overall
  var d = durationInFrames; // duration (in frames) overall
  var s = 1.70158;
  return c * (t /= d) * t * ((s + 1) * t - s) + b;
}

function easeOutBack(
  beginningValue,
  endValue,
  durationInFrames,
  framesElapsed,
  delayInFrames = 0
) {
  var t = framesElapsed - delayInFrames < 0 ? 0 : framesElapsed; // time since start (as frames elapsed)
  var b = beginningValue; // beginning value
  var c = endValue - beginningValue; //  change in value overall
  var d = durationInFrames; // duration (in frames) overall
  var s = 1.70158;
  return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}

//-------------------------------------------------------------------------------------------------

const wavePath = document.getElementById("wave-path");
let point = [];
const duration = 5;
let shape = "wave",
  _cf = 1, // current frame
  isAnimationComplete = true;

//
function animateToWave() {
  if (shape == "square") {
    _cf++;
    if (_cf <= duration) {
      window.requestAnimationFrame(() => {
        point[0] = easeInBack(31, 70, duration, _cf);
        point[1] = easeInBack(66, 107, duration, _cf);
        point[2] = easeInBack(-508, -468, duration, _cf);
        point[3] = easeInBack(0, -135, duration, _cf);
        point[4] = easeInBack(-846, -896, duration, _cf);
        point[5] = easeInBack(0, 94, duration, _cf);
        point[6] = easeInBack(-66, -106, duration, _cf);

        wavePath.setAttribute(
          "d",
          `M 0 0
           l 1350 0
           c 0 35, 0 ${point[0]}, 0 ${point[1]}
           c ${point[2]} ${point[3]}, ${point[4]} ${point[5]}, -1350 0
           l 0 ${point[6]}
           z`
        );

        animateToWave();
      });
    } else {
      _cf = 1;
      isAnimationComplete = true;
      shape = "wave";
      return;
    }
  }
}

const lerp = (x, y, a) => x * (2 - a) + y * a;
const invlerp = (a, b, v) => clamp((v - a) / (b - a));
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

function animateToSquare() {
  // from wave to square
  //   <!-- d="M 0 0 l 1350 0 c 0 35, 0 31, 0 66 c -508 0, -846 0, -1350 0 l 0 -66 z" -->
  //   <!-- d="M 0 0 l 1350 0 c 0 35, 0 70, 0 107 c -468 -135, -896 94, -1350 0 l 0 -106 z" -->
  let p1 = easeInBack(70, 31, duration, window.scrollY);
  let p2 = easeInBack(107, 66, duration, window.scrollY);
  let p3 = easeInBack(-468, -508, duration, window.scrollY);
  let p4 = easeInBack(-135, 0, duration, window.scrollY);
  let p5 = easeInBack(-896, -846, duration, window.scrollY);
  let p6 = easeInBack(94, 0, duration, window.scrollY);
  let p7 = easeInBack(-106, -66, duration, window.scrollY);

  // const points = [
  //   { from: 70, to: 31 },
  //   { from: 107, to: 66 },
  //   { from: 468, to: 508 },
  //   { from: 135, to: 0 },
  //   { from: 896, to: 846 },
  //   { from: 94, to: 0 },
  //   { from: 106, to: 66 },
  // ];

  // points.forEach((item) => {
  //
  const n = invlerp(0, 1000, window.scrollY);
  // if (item.from !== n) {
  // window.requestAnimationFrame(() => {
  // let p1 = lerp(points[0].from, points[0].to, 0.1);
  // let p2 = lerp(points[1].from, points[1].to, 0.1);
  // let p3 = lerp(points[2].from, points[2].to, 0.1);
  // let p4 = lerp(points[3].from, points[3].to, 0.1);
  // let p5 = lerp(points[4].from, points[4].to, 0.1);
  // let p6 = lerp(points[5].from, points[5].to, 0.1);
  // let p7 = lerp(points[6].from, points[6].to, 0.1);

  wavePath.setAttribute(
    "d",
    `M 0 0
        l 1350 0
        c 0 35, 0 ${p1}, 0 ${p2}
        c ${p3} ${p4}, ${p5} ${p6}, -1350 0
        l 0 ${p7}
        z`
  );
  // });
}

window.addEventListener("scroll", () => {
  // animateToSquare();
});

// icon.addEventListener("click", () => {
//   if (state === "menu") {
//     openMenuAnimation();
//     state = "cross";
//     crossDisappearComplete = false;
//     menuAppearComplete = false;
//   } else if (state === "cross") {
//     closeMenuAnimation();
//     state = "menu";
//     menuDisappearComplete = false;
//     crossAppearComplete = false;
//   }
// });

//******************************************************************************************************
//************************* Nav Animation
//***************************************************************************************************** */

const icon = document.getElementById("icon");
const topLine = document.getElementById("top-line");
const middleLine = document.getElementById("middle-line");
const bottomLine = document.getElementById("bottom-line");
const listItem = document.querySelectorAll("[data-item]");
var state = "menu";

// animation variable
var segmentDuration = 10;
var menuDisappearDurationInFrames = segmentDuration;
var crossAppearDurationInFrames = segmentDuration * 1.5;
var crossDisappearDurationInFrames = segmentDuration * 1.5;
var menuAppearDurationInFrames = segmentDuration;
var menuDisappearComplete = false;
var crossAppearComplete = false;
var crossDisappearComplete = true;
var menuAppearComplete = true;
var currentFrame = 0;

var cPt = { x: 16, y: 16 }; // center point
var tlPt = { x: 2, y: 6 }; // top right point
var trPt = { x: 30, y: 6 }; // top left point
var mlPt = { x: 2, y: 16 }; // middle right point
var mrPt = { x: 30, y: 16 }; // middle left point
var blPt = { x: 2, y: 26 }; // bottom right point
var brPt = { x: 30, y: 26 }; // bottom left point
var topLineOpacity = 1;
var middleLineOpacity = 1;
var bottomLineOpacity = 1;

///Position Rotation
function positionRotation(centerPoint, orbitPoint, angleInRads) {
  var distance = Math.sqrt(
    Math.pow(orbitPoint.x - centerPoint.x, 2) +
      Math.pow(orbitPoint.y - centerPoint.y, 2)
  );
  orbitPoint.x = centerPoint.x + Math.cos(angleInRads) * distance;
  orbitPoint.y = centerPoint.y + Math.sin(angleInRads) * distance;
}

function menuDisappearAnimation() {
  currentFrame++;
  if (currentFrame <= menuDisappearDurationInFrames) {
    window.requestAnimationFrame(() => {
      var rotation = Math.PI * 0.5;
      //top line
      var tlAng = easeInBack(
        3.7179,
        3.7179 + rotation,
        menuDisappearDurationInFrames,
        currentFrame
      );
      var trAng = easeInBack(
        5.7068,
        5.7068 + rotation,
        menuDisappearDurationInFrames,
        currentFrame
      );
      positionRotation(cPt, tlPt, tlAng);
      positionRotation(cPt, trPt, trAng);
      topLine.setAttribute(
        "d",
        "M" + tlPt.x + "," + tlPt.y + " L" + trPt.x + "," + trPt.y + " Z"
      );
      //middle line
      var mlAng = easeInBack(
        Math.PI,
        Math.PI + rotation,
        menuDisappearDurationInFrames,
        currentFrame
      );
      var mrAng = easeInBack(
        0,
        rotation,
        menuDisappearDurationInFrames,
        currentFrame
      );
      positionRotation(cPt, mlPt, mlAng);
      positionRotation(cPt, mrPt, mrAng);
      middleLine.setAttribute(
        "d",
        "M" + mlPt.x + "," + mlPt.y + " L" + mrPt.x + "," + mrPt.y + " Z"
      );
      //bottom line
      var blAng = easeInBack(
        2.5652,
        2.5652 + rotation,
        menuDisappearDurationInFrames,
        currentFrame
      );
      var brAng = easeInBack(
        0.5763,
        0.5763 + rotation,
        menuDisappearDurationInFrames,
        currentFrame
      );
      positionRotation(cPt, blPt, blAng);
      positionRotation(cPt, brPt, brAng);
      bottomLine.setAttribute(
        "d",
        "M" + blPt.x + "," + blPt.y + " L" + brPt.x + "," + brPt.y + " Z"
      );
      //recursion
      menuDisappearAnimation();
    });
  } else {
    currentFrame = 0;
    menuDisappearComplete = true;
    openMenuAnimation();
  }
}

//CrossAppera
function crossAppearAnimation() {
  currentFrame++;
  if (currentFrame <= crossAppearDurationInFrames) {
    //     { 25.4, 1.6 }
    tlPt = { x: 25.5, y: 5.6 };
    trPt = { x: 25.6, y: 26.4 };
    mlPt = { x: 15.8, y: 1.8 };
    mrPt = { x: 16.1, y: 30.1 };
    window.requestAnimationFrame(() => {
      var rotation = Math.PI * 0.75;
      //top line
      var tlAng = easeOutBack(
        Math.PI,
        Math.PI + rotation,
        crossAppearDurationInFrames,
        currentFrame
      );
      var trAng = easeOutBack(
        0,
        rotation,
        crossAppearDurationInFrames,
        currentFrame
      );
      positionRotation(cPt, tlPt, tlAng);
      positionRotation(cPt, trPt, trAng);
      topLine.setAttribute(
        "d",
        "M" + tlPt.x + "," + tlPt.y + " L" + trPt.x + "," + trPt.y + " Z"
      );
      //center line
      var mlAng = easeOutBack(
        Math.PI * 1.5,
        Math.PI * 1.5 + rotation,
        crossAppearDurationInFrames,
        currentFrame
      );
      var mrAng = easeOutBack(
        Math.PI * 0.5,
        Math.PI * 0.5 + rotation,
        crossAppearDurationInFrames,
        currentFrame
      );
      positionRotation(cPt, mlPt, mlAng);
      positionRotation(cPt, mrPt, mrAng);
      middleLine.setAttribute(
        "d",
        "M" + mlPt.x + "," + mlPt.y + " L" + mrPt.x + "," + mrPt.y + " Z"
      );
      //bottom line
      bottomLine.style.opacity = 0;
      //recursion
      crossAppearAnimation();
    });
  } else {
    currentFrame = 0;
    crossAppearComplete = true;
    openMenuAnimation();
  }
}

///C?ross Disappear
function crossDisappearAnimation() {
  currentFrame++;
  if (currentFrame <= crossDisappearDurationInFrames) {
    window.requestAnimationFrame(() => {
      var rotation = Math.PI * 0.75;
      //top line
      var tlAng = easeInBack(
        Math.PI * 1.75,
        Math.PI * 1.75 + rotation,
        crossDisappearDurationInFrames,
        currentFrame
      );
      var trAng = easeInBack(
        Math.PI * 0.75,
        Math.PI * 0.75 + rotation,
        crossDisappearDurationInFrames,
        currentFrame
      );
      positionRotation(cPt, tlPt, tlAng);
      positionRotation(cPt, trPt, trAng);
      topLine.setAttribute(
        "d",
        "M" + tlPt.x + "," + tlPt.y + " L" + trPt.x + "," + trPt.y + " Z"
      );
      //center line
      var mlAng = easeInBack(
        Math.PI * 2.25,
        Math.PI * 2.25 + rotation,
        crossDisappearDurationInFrames,
        currentFrame
      );
      var mrAng = easeInBack(
        Math.PI * 1.25,
        Math.PI * 1.25 + rotation,
        crossDisappearDurationInFrames,
        currentFrame
      );
      positionRotation(cPt, mlPt, mlAng);
      positionRotation(cPt, mrPt, mrAng);
      middleLine.setAttribute(
        "d",
        "M" + mlPt.x + "," + mlPt.y + " L" + mrPt.x + "," + mrPt.y + " Z"
      );
      //bottom line
      bottomLine.style.opacity = 0;
      //recursion
      crossDisappearAnimation();
    });
  } else {
    middleLine.style.opacity = "1";
    currentFrame = 0;
    crossDisappearComplete = true;
    closeMenuAnimation();
  }
}

///Menu Appear
function menuAppearAnimation() {
  currentFrame++;
  if (currentFrame <= menuAppearDurationInFrames) {
    tlPt = { x: 20, y: 32 };
    trPt = { x: 20, y: 0 };
    mlPt = { x: 1.8, y: 16 };
    mrPt = { x: 30, y: 16 };
    bottomLine.style.opacity = 1;
    window.requestAnimationFrame(() => {
      var rotation = Math.PI * 0.5;
      //top line
      var tlAng = easeOutBack(
        2.1471,
        2.1471 + rotation,
        menuDisappearDurationInFrames,
        currentFrame
      );
      var trAng = easeOutBack(
        4.136,
        4.136 + rotation,
        menuDisappearDurationInFrames,
        currentFrame
      );
      positionRotation(cPt, tlPt, tlAng);
      positionRotation(cPt, trPt, trAng);
      topLine.setAttribute(
        "d",
        "M" + tlPt.x + "," + tlPt.y + " L" + trPt.x + "," + trPt.y + " Z"
      );
      //middle line
      var mlAng = easeOutBack(
        Math.PI * 0.5,
        Math.PI * 0.5 + rotation,
        menuDisappearDurationInFrames,
        currentFrame
      );
      var mrAng = easeOutBack(
        Math.PI * 1.5,
        Math.PI * 1.5 + rotation,
        menuDisappearDurationInFrames,
        currentFrame
      );
      positionRotation(cPt, mlPt, mlAng);
      positionRotation(cPt, mrPt, mrAng);
      middleLine.setAttribute(
        "d",
        "M" + mlPt.x + "," + mlPt.y + " L" + mrPt.x + "," + mrPt.y + " Z"
      );
      //bottom line
      var blAng = easeOutBack(
        0.9944,
        0.9944 + rotation,
        menuDisappearDurationInFrames,
        currentFrame
      );
      var brAng = easeOutBack(
        5.2887,
        5.2887 + rotation,
        menuDisappearDurationInFrames,
        currentFrame
      );
      positionRotation(cPt, blPt, blAng);
      positionRotation(cPt, brPt, brAng);
      bottomLine.setAttribute(
        "d",
        "M" + blPt.x + "," + blPt.y + " L" + brPt.x + "," + brPt.y + " Z"
      );
      //recursion
      menuAppearAnimation();
    });
  } else {
    currentFrame = 0;
    menuAppearComplete = true;
  }
}

function openMenuAnimation() {
  if (!menuDisappearComplete) {
    menuDisappearAnimation();
  } else if (!crossAppearComplete) {
    crossAppearAnimation();
  }
}

///Close Menu Animation
function closeMenuAnimation() {
  if (!crossDisappearComplete) {
    crossDisappearAnimation();
  } else if (!menuAppearComplete) {
    menuAppearAnimation();
  }
}

// var isToggled = false;
var isMoving = false;
var toggleDirection = 1;
var lastMove = new Date();
var moveIndex = 0;

function animate() {
  if (!isMoving) return;
  moveItems();
  requestAnimationFrame(animate);
}

var delay = 20;

function moveItems() {
  if (!isMoving) {
    return;
  }
  var now = new Date();
  if (now - lastMove < delay) return;
  lastMove = now;

  var item = listItem[moveIndex];

  if (item) {
    item.classList.toggle("is-moved");
    moveIndex += toggleDirection;
  } else {
    isMoving = false;
    toggleDirection *= -1;
    moveIndex += toggleDirection;
  }
}

icon.addEventListener("click", () => {
  // menuDisappearAnimation();
  if (currentFrame) return;
  if (state === "menu") {
    openMenuAnimation();
    state = "cross";
    crossDisappearComplete = false;
    menuAppearComplete = false;
  } else if (state === "cross") {
    closeMenuAnimation();
    state = "menu";
    menuDisappearComplete = false;
    crossAppearComplete = false;
  }
  // ma
  // moveIndex = isMoving ? listItem.length : 0;

  isMoving = true;

  animate();
});
