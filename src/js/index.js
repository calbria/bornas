
// toggle

// details
const plusIcons = document.querySelectorAll(".plus-icon");
plusIcons.forEach((item) =>
  item.addEventListener("click", () => {
    const [, , minus, plus] = item.children;
    const [text, line] = item.nextElementSibling.children;
    const [point, poly] = line.children;

    if (minus.classList.contains("hidden")) {
      poly.style.animationName = "move";
      poly.style.animationDuration = "1s";
      poly.style.animationTimingFunction = "ease-in";
      poly.style.animationFillMode = "forwards";

      point.style.animationName = "show";
      point.style.animationDuration = "0.5s";
      point.style.animationTimingFunction = "ease-in";
      point.style.animationDelay = "1s";
      point.style.animationFillMode = "forwards";
      console.log("point show");

      text.style.animationName = "show";
      text.style.animationDuration = "0.5s";
      text.style.animationTimingFunction = "ease-in";
      text.style.animationDelay = "1s";
      text.style.animationFillMode = "forwards";
      console.log("text show");

      plus.classList.add("hidden");
      minus.classList.remove("hidden");
    } else {
      text.style.animationName = "hide";
      text.style.animationDuration = "0.5s";
      text.style.animationTimingFunction = "ease-in";
      text.style.animationDelay = "";
      text.style.animationFillMode = "";

      point.style.animationName = "hide";
      point.style.animationDuration = "0.5s";
      point.style.animationTimingFunction = "ease-in";
      point.style.animationDelay = "";
      point.style.animationFillMode = "";

      poly.style.animationName = "remove";
      poly.style.animationDuration = "0.5s";
      poly.style.animationTimingFunction = "ease-in";
      poly.style.animationFillMode = "forwards";

      plus.classList.remove("hidden");
      minus.classList.add("hidden");
    }
  })
);
