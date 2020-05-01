let savedTasks = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

const taskList = document.querySelector(".task-list");
const loading = document.querySelector(".loading");

window.addEventListener("scroll", () => {
  handleScroll();
});

function handleScroll() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (
    Math.ceil(scrollTop + clientHeight) === scrollHeight &&
    savedTasks.length !== 0
  ) {
    if (savedTasks.length >= 3) {
      loading.classList.add("show");
      setTimeout(() => {
        getTask();
        getTask();
        getTask();
        loading.classList.remove("show");
      }, 1000);
      window.scroll({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    } else {
      loading.classList.add("show");
      setTimeout(() => {
        for (let i = 0; i <= savedTasks.length; i++) {
          getTask();
        }
        loading.classList.remove("show");
      }, 1000);
      window.scroll({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }
}

function makeTask(task, i) {
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
    taskHours.innerText = `${task["log-hours"]}`;
  } else {
    taskHours.innerText = `${task["log-hours"]}`;
  }
  taskHours.classList.add("task-hours");

  const taskDate = document.createElement("p");
  taskDate.innerText = task["date"];
  taskDate.classList.add("task-date");

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-minus-circle"></i>';
  deleteBtn.classList.add("delete-button");
  deleteBtn.addEventListener("click", deleteTask);

  taskDiv.appendChild(leftContainer);
  leftContainer.appendChild(taskName);
  leftContainer.appendChild(taskDescription);
  taskDiv.appendChild(rightContainer);
  rightContainer.appendChild(taskHours);
  rightContainer.appendChild(taskDate);
  taskDiv.appendChild(deleteBtn);
  taskDiv.id = i + 1;
  taskList.appendChild(taskDiv);

  //   taskList.insertBefore(taskDiv, taskList.firstChild);
}

function getTask() {
  let i = taskList.childElementCount;
  let task = savedTasks.pop();
  makeTask(task, i);
}

getTask();
getTask();
getTask();

function deleteTask(e) {
  const target = e.currentTarget;
  const task = target.parentElement;

  let newTasks = JSON.parse(localStorage.getItem("tasks")).reverse();

  let idx = parseInt(task.id) - 1;

  task.remove();
  let subtract = parseInt(newTasks[idx]["log-hours"]);
  let sumHours = parseInt(localStorage.getItem("sum"));
  let newHours = sumHours - subtract;
  localStorage.setItem("sum", newHours);
  newTasks.splice(idx, 1);
  newTasks.reverse();
  console.log(newTasks);
  localStorage.setItem("tasks", JSON.stringify(newTasks));
  //   location.reload();
}
