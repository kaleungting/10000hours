class UI {
  constructor() {
    this.taskInput = document.querySelector(".task-input");
    this.descriptionInput = document.querySelector(".description-input");
    this.category = document.getElementById(".task-input");
    this.taskInput = document.getElementById(".task-input");
    this.taskInput = document.getElementById(".task-input");
    this.submitBtn = document.querySelector(".submit-btn");
    submitBtn.addEventListener("click", addTask);
  }

  addTask(event) {
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerHTML = "hey";
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoList.appendChild(newTodo);
  }
}
