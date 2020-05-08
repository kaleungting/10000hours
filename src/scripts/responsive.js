document.addEventListener("keydown", formShortcut, false);
document.addEventListener("keydown", downShortcut, false);
document.addEventListener("keydown", upShortcut, false);
const formContainer = document.querySelector(".form-container");

function formShow() {
  if (
    formContainer.style.display === "none" ||
    formContainer.style.display === ""
  ) {
    formContainer.style.display = "flex";
  } else {
    formContainer.style.display = "none";
  }
}

function formShortcut(e) {
  const taskInput = document.querySelector(".task-input");
  const taskFocus = document.activeElement === taskInput;
  const descriptionInput = document.querySelector(".description-input");
  const descriptionFocus = document.activeElement === descriptionInput;
  // debugger;
  if (e.key === "n" && !taskFocus && !descriptionFocus) {
    formShow();
    e.preventDefault();
    taskInput.focus();
  } else if (
    e.key === "Escape" &&
    formContainer.style.display !== "none" &&
    formContainer.style.display !== ""
  ) {
    formShow();
  }
}

function downShortcut(e) {
  if (
    e.key === "d" &&
    (formContainer.style.display === "none" ||
      formContainer.style.display === "")
  ) {
    window.scroll({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }
}

function upShortcut(e) {
  if (
    e.key === "u" &&
    (formContainer.style.display === "none" ||
      formContainer.style.display === "")
  ) {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }
}
