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

hideForm.addEventListener("click", formShow);
submitBtn.addEventListener("click", addTask);
// localStorage.clear();

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

// let initial = 0;
// let reveal = 3;
// if (savedTasks.length > 10) {
//   savedTasks = savedTasks.slice(savedTasks.length - 5);
// }
// savedTasks.forEach((task, i) => {
//   makeTask(task, i);
// });

// }

// loadSelected(savedTasks, reveal, initial);

// window.addEventListener("scroll", function () {
//   if (
//     Math.ceil(window.innerHeight + window.scrollY) ===
//       document.documentElement.scrollHeight &&
//     savedTasks.length - reveal >= 0
//   ) {
//     initial += 3;
//     reveal += 3;
//     setTimeout(loadSelected(savedTasks, reveal, initial), 5000);
//   } else if (savedTasks.length - reveal - 3 === 0) {
//     initial += 3 - (savedTasks.length - reveal);
//     reveal += savedTasks.length - reveal;
//     loadSelected(savedTasks, reveal, initial);
//   }
// });

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
    sumHours += parseInt(hourInput.value);
    localStorage.setItem("sum", parseInt(sumHours));
    totalHours.innerText = 10000 - sumHours;
    taskList.insertBefore(taskDiv, taskList.firstChild);

    //pushes task into localStorage
    savedTasks.push(convertTasks(inputArray));
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    taskDiv.id = savedTasks.length;
    increaseBar();
    updateCompetency();
    formContainer.style.display = "none";
    // window.scrollTo(0, taskList.offsetTop);

    window.scroll({
      top: taskList.offsetTop,
      left: 0,
      behavior: "smooth",
    });
    // location.reload();
    //clears form
    // taskInput.value = "";
    // descriptionInput.value = "";
    // hourInput.value = "";
    // dateInput.value = "";
  }
}

// function makeTask(task, i) {
//   //create container div
//   const taskDiv = document.createElement("div");
//   taskDiv.classList.add("task-content");

//   //create left container div
//   const leftContainer = document.createElement("div");
//   leftContainer.classList.add("task-left-container");

//   //create h1 element for task-name
//   const taskName = document.createElement("h1");
//   taskName.innerText = task["task-input"];
//   taskName.classList.add("task-name");
//   //create p element for task description
//   const taskDescription = document.createElement("p");
//   taskDescription.innerText = task["description-input"];
//   taskName.classList.add("task-description");
//   //create right container div
//   const rightContainer = document.createElement("div");
//   rightContainer.classList.add("task-right-container");

//   const taskHours = document.createElement("p");
//   if (task["log-hours"] > 1) {
//     taskHours.innerText = `${task["log-hours"]}`;
//   } else {
//     taskHours.innerText = `${task["log-hours"]}`;
//   }
//   taskHours.classList.add("task-hours");

//   const taskDate = document.createElement("p");
//   taskDate.innerText = task["date"];
//   taskDate.classList.add("task-date");

//   const deleteBtn = document.createElement("button");
//   deleteBtn.innerHTML = '<i class="fas fa-minus-circle"></i>';
//   deleteBtn.classList.add("delete-button");
//   deleteBtn.addEventListener("click", deleteTask);

//   taskDiv.appendChild(leftContainer);
//   leftContainer.appendChild(taskName);
//   leftContainer.appendChild(taskDescription);
//   taskDiv.appendChild(rightContainer);
//   rightContainer.appendChild(taskHours);
//   rightContainer.appendChild(taskDate);
//   rightContainer.appendChild(deleteBtn);
//   // taskList.appendChild(taskDiv);
//   taskDiv.id = i + 1;
//   taskList.insertBefore(taskDiv, taskList.firstChild);
// }

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

  // move();
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

function deleteTask(e) {
  const target = e.currentTarget;
  const task = target.parentElement.parentElement;
  let newTasks = JSON.parse(localStorage.getItem("tasks")).reverse();
  let idx = parseInt(task.id) - 1;
  task.remove();
  let subtract = parseInt(newTasks[idx]["log-hours"]);
  let sumHours = parseInt(localStorage.getItem("sum"));
  let newHours = sumHours - subtract;
  localStorage.setItem("sum", newHours);
  newTasks.splice(idx, 1);
  newTasks.reverse();
  localStorage.setItem("tasks", JSON.stringify(newTasks));
  // location.reload();
  increaseBar();
  updateCompetency();
}

increaseBar();
updateCompetency();

//shortcuts
window.addEventListener("keydown", formShortcut, false);
window.addEventListener("keydown", downShortcut, false);
window.addEventListener("keydown", upShortcut, false);

function formShortcut(e) {
  if (
    e.key === "n" &&
    (!taskInput.activeElement || !descriptionInput.activeElement)
  ) {
    formShow();
  }
}

function downShortcut(e) {
  if (e.key === "d") {
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
