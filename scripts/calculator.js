const allRanges = document.querySelectorAll(".content__scroller-wrapper");
allRanges.forEach(wrap => {
  const range = wrap.querySelector(".content__scroller");
  const bubble = wrap.querySelector(".content__scroller-bubble");

  range.addEventListener("input", () => {
    setBubble(range, bubble);
  });
  setBubble(range, bubble);
});

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val + ' ₴';

  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}