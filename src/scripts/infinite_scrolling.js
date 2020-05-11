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
  // debugger;
  let i = savedTasks.length - 1;
  let task = savedTasks.pop();
  makeTask(task, i);
}

if (savedTasks.length > 0) {
  for (let i = 0; i < 3; i++) {
    getTask();
  }
}

// function decreaseBar() {
//   let lvl = 0;
//   debugger;
//   if (lvl === 0) {
//     lvl = 1;
//     const sumHours = parseInt(localStorage.getItem("sum"));
//     debugger;
//     let sum = sumHours;
//     if (sum % 100 > 0) {
//       sum = sum % 100;
//     } else if (10000 - sum === 10000) {
//       sum = 0;
//     } else if (sum % 100 === 0) {
//       sum = 100;
//     }
//     let height = sum;
//     let id = setInterval(frame, 8);
//     function frame() {
//       if (height <= sum) {
//         clearInterval(id);
//         lvl = 0;
//       } else {
//         height--;
//         bar.style.height = height + "%";
//       }
//     }
//   }
// }

function deleteTask(e) {
  const target = e.currentTarget;
  const task = target.parentElement;
  const totalHours = document.querySelector(".total-hours");
  const toHundred = document.querySelector(".to-hundred");
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
  increaseBar();
  updateCompetency();
}

const sumHours = parseInt(localStorage.getItem("sum"));
const bar = document.querySelector(".amount-completed");

let lvl = 0;
function increaseBar() {
  if (lvl === 0) {
    lvl = 1;
    let height = 1;
    let id = setInterval(frame, 8);
    function frame() {
      const sumHours = parseInt(localStorage.getItem("sum"));
      let sum = sumHours;
      if (sum % 100 > 0) {
        sum = sum % 100;
      } else if (10000 - sum === 10000) {
        sum = 0;
      } else if (sum % 100 === 0) {
        sum = 100;
      }
      if (height >= sum) {
        clearInterval(id);
        lvl = 0;
      } else {
        height++;
        bar.style.height = height + "%";
      }
    }
  }
}

function updateCompetency() {
  let competencyLevel;
  const skillLevel = document.querySelector(".skill-level");
  let hoursRemaining = 10000 - sumHours;
  if (hoursRemaining > 8000) {
    competencyLevel = "Novice";
    bar.style.backgroundColor = "#ffffff";
  } else if (hoursRemaining > 6000 && hoursRemaining <= 8000) {
    competencyLevel = "Advanced Beginner";
    bar.style.backgroundColor = "#fde400";
  } else if (hoursRemaining > 4000 && hoursRemaining <= 6000) {
    competencyLevel = "Intermediate";
    bar.style.backgroundColor = "#fdad00";
  } else if (hoursRemaining > 2000 && hoursRemaining <= 4000) {
    competencyLevel = "Expert";
    bar.style.backgroundColor = "#009400";
  } else if (hoursRemaining > 0 && hoursRemaining < 2000) {
    competencyLevel = "Pro";
    bar.style.backgroundColor = "#003ada";
  } else {
    competencyLevel = "Master";
    bar.style.backgroundColor = "#2a2a2a";
  }
  skillLevel.innerText = competencyLevel;
}

updateCompetency();
increaseBar();

export { updateCompetency, increaseBar };
