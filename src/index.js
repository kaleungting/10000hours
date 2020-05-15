import "./styles/index.scss";
import "./styles/form.scss";
import "./styles/task.scss";
import { increaseBar, updateCompetency } from "./scripts/progress";

const taskInput = document.querySelector(".task-input");
const descriptionInput = document.querySelector(".description-input");
const submitBtn = document.querySelector(".submit-btn");
const taskList = document.querySelector(".task-list");
const hourInput = document.querySelector(".log-hours");
const dateInput = document.querySelector(".date");
const totalHours = document.querySelector(".total-hours");
const errorDiv = document.querySelector(".error-container");
const goalInput = document.querySelector(".goal-input");
const goalContainer = document.querySelector(".goal-container");
const hideForm = document.querySelector(".hide-form");
const formContainer = document.querySelector(".form-container");
const toHundred = document.querySelector(".to-hundred");
const progressBar = document.querySelector(".progress-bar");
const title = document.getElementById("title");

hideForm.addEventListener("click", formShow);
submitBtn.addEventListener("click", addTask);

// localStorage.clear();
//
//localStorage
let sumHours = localStorage.getItem("sum") ? localStorage.getItem("sum") : 0;
sumHours = parseInt(sumHours);
let savedTasks = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

let mainGoal = localStorage.getItem("goal") ? localStorage.getItem("goal") : "";
if (mainGoal) {
  addGoal();
}

localStorage.setItem("sum", sumHours);
localStorage.setItem("tasks", JSON.stringify(savedTasks));
totalHours.innerText = 10000 - sumHours;

if (sumHours > 10000) {
  localStorage.clear();
}

increaseBar();
updateCompetency();
//checks to see if any inputs are empty, and if so, adds class show and renders
function error(array) {
  array.forEach((input) => {
    if (input.value === "") {
      errorDiv.classList.add("show");
      errorDiv.innerText = "Please log the entire entry";
    }
  });
}
toHundred.innerText = `${sumHours % 100}/100`;

//iterates through each input and sets it as an key:value pair
function convertTasks(array) {
  let object = {};
  array.forEach((input) => {
    object[input.classList[0]] = input.value;
  });
  return object;
}

function addTask(event) {
  event.preventDefault();

  //create container div
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-content");

  //create left container div
  const leftContainer = document.createElement("div");
  leftContainer.classList.add("task-left-container");

  //create h1 element for task-name
  const taskName = document.createElement("h1");
  taskName.innerText = taskInput.value;
  taskName.classList.add("task-name");
  //create p element for task description
  const taskDescription = document.createElement("p");
  taskDescription.innerText = descriptionInput.value;
  taskName.classList.add("task-description");
  //create right container div
  const rightContainer = document.createElement("div");
  rightContainer.classList.add("task-right-container");

  const taskHours = document.createElement("p");
  if (hourInput.value > 1) {
    taskHours.innerText = `${hourInput.value}`;
  } else {
    taskHours.innerText = `${hourInput.value}`;
  }
  taskHours.classList.add("task-hours");
  //adds to total hours

  const taskDate = document.createElement("p");
  taskDate.innerText = dateInput.value;
  taskDate.classList.add("task-date");

  const inputArray = [taskInput, descriptionInput, dateInput, hourInput];
  //clears previous error
  errorDiv.innerHTML = "";
  errorDiv.classList.remove("show");

  //looks for any unfilled inputs and renders errors
  error(inputArray);

  //create delete
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-minus-circle"></i>';
  deleteBtn.classList.add("delete-button");
  deleteBtn.addEventListener("click", deleteTask);

  //adds task onto html
  if (errorDiv.innerText === "") {
    taskDiv.appendChild(leftContainer);
    leftContainer.appendChild(taskName);
    leftContainer.appendChild(taskDescription);
    taskDiv.appendChild(rightContainer);
    rightContainer.appendChild(taskHours);
    rightContainer.appendChild(taskDate);
    taskDiv.appendChild(deleteBtn);
    // taskList.appendChild(taskDiv);
    let sumHours = parseInt(localStorage.getItem("sum"));
    sumHours += parseInt(hourInput.value);
    localStorage.setItem("sum", parseInt(sumHours));
    totalHours.innerText = 10000 - sumHours;
    taskList.insertBefore(taskDiv, taskList.firstChild);
    toHundred.innerText = `${sumHours % 100}/100`;
    //pushes task into localStorage
    // debugger;
    savedTasks = JSON.parse(localStorage.getItem("tasks"));
    savedTasks.push(convertTasks(inputArray));
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    taskDiv.id = savedTasks.length;
    increaseBar();
    // updateCompetency();
    formContainer.style.display = "none";
    // window.scrollTo(0, taskList.offsetTop);

    window.scroll({
      top: taskList.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  }
}

document
  .querySelector(".goal-input")
  .addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
      addGoal(event);
      event.preventDefault();
    }
  });

function addGoal(event) {
  const goal = document.createElement("div");
  if (goalInput.value !== "") {
    mainGoal = goalInput.value;
  }
  goal.innerText = mainGoal;
  localStorage.setItem("goal", mainGoal);
  goal.classList.add("goal");
  goalInput.classList.add("hide");
  goalContainer.appendChild(goal);
}

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

export function deleteTask(e) {
  const target = e.currentTarget;
  const task = target.parentElement;
  const totalHours = document.querySelector(".total-hours");

  let newTasks = JSON.parse(localStorage.getItem("tasks")).reverse();
  // let idx = parseInt(task.id) - 1;
  let idx = Array.from(task.parentNode.children).indexOf(task);
  task.style.backgroundColor = "#ea7317";
  setTimeout(function () {
    task.remove();
  }, 500);
  let subtract = parseInt(
    JSON.parse(localStorage.getItem("tasks"))[newTasks.length - idx - 1][
      "log-hours"
    ]
  );
  let sumHours = parseInt(localStorage.getItem("sum"));
  let newHours = sumHours - subtract;
  totalHours.innerText = 10000 - newHours;
  toHundred.innerText = `${newHours % 100}/100`;
  localStorage.setItem("sum", newHours);
  newTasks.splice(idx, 1);
  newTasks.reverse();
  console.log(newTasks);
  localStorage.setItem("tasks", JSON.stringify(newTasks));
  //   location.reload();
}

increaseBar();
updateCompetency();

//shortcuts

document.addEventListener("keydown", formShortcut, false);
document.addEventListener("keydown", downShortcut, false);
document.addEventListener("keydown", upShortcut, false);

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

window.onload = function () {
  const quoteContainer = document.querySelector(".quote-container");
  const author = document.querySelector(".author");
  if (author) {
    quoteContainer.addEventListener("mouseenter", () => {
      author.classList.remove("hide");
    });
    quoteContainer.addEventListener("mouseleave", () => {
      author.classList.add("hide");
    });
  }

  const help = document.querySelector(".help");
  const helpContainer = document.querySelector(".help-container");
  help.addEventListener("click", () => {
    show(helpContainer);
  });

  const skillLevel = document.querySelector(".skill-level");
  const skillInfo = document.querySelector(".skill-info");
  skillLevel.addEventListener("mouseenter", () => {
    show(skillInfo);
  });
  skillLevel.addEventListener("mouseleave", () => {
    show(skillInfo);
  });

  progressBar.addEventListener("mouseenter", () => {
    show(toHundred);
  });
  progressBar.addEventListener("mouseleave", () => {
    show(toHundred);
  });
};

function show(elem) {
  elem.classList.toggle("hide");
}
