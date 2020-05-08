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
  }, 1000);
  let subtract = parseInt(
    JSON.parse(localStorage.getItem("tasks"))[newTasks.length - idx - 1][
      "log-hours"
    ]
  );
  let sumHours = parseInt(localStorage.getItem("sum"));
  let newHours = sumHours - subtract;
  totalHours.innerText = 10000 - newHours;
  localStorage.setItem("sum", newHours);
  newTasks.splice(idx, 1);
  newTasks.reverse();
  console.log(newTasks);
  localStorage.setItem("tasks", JSON.stringify(newTasks));
  //   location.reload();
}
