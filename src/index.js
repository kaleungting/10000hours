import "./styles/index.scss";
import "./styles/form.scss";
import "./styles/task.scss";
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

localStorage.clear();

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

if (savedTasks.length > 5) {
  savedTasks = savedTasks.slice(savedTasks.length - 5);
}
savedTasks.forEach((task) => {
  makeTask(task);
});

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
    taskHours.innerText = `${hourInput.value} hours`;
  } else {
    taskHours.innerText = `${hourInput.value} hour`;
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

  //adds task onto html
  if (errorDiv.innerText === "") {
    taskDiv.appendChild(leftContainer);
    leftContainer.appendChild(taskName);
    leftContainer.appendChild(taskDescription);
    taskDiv.appendChild(rightContainer);
    rightContainer.appendChild(taskHours);
    rightContainer.appendChild(taskDate);
    // taskList.appendChild(taskDiv);
    sumHours += parseInt(hourInput.value);
    localStorage.setItem("sum", parseInt(sumHours));
    totalHours.innerText = 10000 - sumHours;
    taskList.insertBefore(taskDiv, taskList.firstChild);

    //pushes task into localStorage
    savedTasks.push(convertTasks(inputArray));
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    increaseBar();
    updateCompetency();
    formContainer.style.display = "none";
    //clears form
    // taskInput.value = "";
    // descriptionInput.value = "";
    // hourInput.value = "";
    // dateInput.value = "";
  }
}

function makeTask(task) {
  //create container div
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-content");

  //create left container div
  const leftContainer = document.createElement("div");
  leftContainer.classList.add("task-left-container");

  //create h1 element for task-name
  const taskName = document.createElement("h1");
  taskName.innerText = task["task-input"];
  taskName.classList.add("task-name");
  //create p element for task description
  const taskDescription = document.createElement("p");
  taskDescription.innerText = task["description-input"];
  taskName.classList.add("task-description");
  //create right container div
  const rightContainer = document.createElement("div");
  rightContainer.classList.add("task-right-container");

  const taskHours = document.createElement("p");
  if (task["log-hours"] > 1) {
    taskHours.innerText = `${task["log-hours"]} hours`;
  } else {
    taskHours.innerText = `${task["log-hours"]} hour`;
  }
  taskHours.classList.add("task-hours");

  const taskDate = document.createElement("p");
  taskDate.innerText = task["date"];
  taskDate.classList.add("task-date");

  taskDiv.appendChild(leftContainer);
  leftContainer.appendChild(taskName);
  leftContainer.appendChild(taskDescription);
  taskDiv.appendChild(rightContainer);
  rightContainer.appendChild(taskHours);
  rightContainer.appendChild(taskDate);
  // taskList.appendChild(taskDiv);
  taskList.insertBefore(taskDiv, taskList.firstChild);
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
