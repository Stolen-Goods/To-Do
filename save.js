import Project from "./projects.js";
import { completedTasks } from "./buttons.js";
import { updateBtn, saveBtn } from "./main.js";

export const projectDisplay = document.querySelector(".projects");
export const form = document.querySelector("form");

export let createdTasks = [];
export let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
export let dateList = [];
export let formattedDate = [];

export function resetView() {
  createdTasks.forEach((task) => task.classList.remove("created-task"));
  createdTasks.forEach((task) => task.classList.remove("not-priority"));
  completedTasks.forEach((task) => task.classList.add("task-completed"));
  updateBtn.classList.add("hidden");
  saveBtn.classList.remove("hidden");
}

export function renderPage() {
  savedTasks.forEach((task) => {
    const todayDate = new Date();
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-box");
    taskDiv.setAttribute("data-id", task.id);
    taskDiv.innerHTML = `
    <p class="task-title">${task.title}</p>
    <p class="task-descrip">${task.descrip}</p>
    <p class="task-date">Due Date: ${task.date}</p>
    <button class="edit" type="button">Edit</button>
    <button class="complete" type="button">Complete</button>
    <button class="delete" type="button">Delete</button>
  `;
    if (task.priority === "yes") {
      taskDiv.classList.add("priority-task");
    }
    if (task.isCompleted) {
      taskDiv.classList.add("task-completed");
      taskDiv.lastElementChild.remove();
      taskDiv.lastElementChild.remove();
      taskDiv.lastElementChild.remove();
      projectDisplay.appendChild(taskDiv);
      completedTasks.push(taskDiv);
    }

    if (!task.isCompleted) {
      const date = new Date(task.date);
      projectDisplay.appendChild(taskDiv);
      createdTasks.push(taskDiv);
      dateList.push(
        `${date.getUTCMonth()}/${date.getUTCDate()}/${date.getUTCFullYear()}`
      );
      formattedDate.push(
        `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getUTCDate()).padStart(2, "0")}`
      );

      if (date.getTime() < todayDate.getTime()) {
        taskDiv.classList.add("overdue");
        taskDiv.innerHTML = `
    <p>Overdue!</p>
    <p class="task-title">${task.title}</p>
    <p class="task-descrip">${task.descrip}</p>
    <p class="task-date">Due Date: ${task.date}</p>
    <button class="edit" type="button">Edit</button>
    <button class="complete" type="button">Complete</button>
    <button class="delete" type="button">Delete</button>`;
      }
    }
  });
}

export default function save(e) {
  e.preventDefault();
  form.reportValidity();
  const isPriority = document.querySelector("input[name='priority']:checked");
  const taskTitle = document.getElementById("title");
  const description = document.getElementById("description");
  const dueDate = document.getElementById("due-date");

  const { title, descrip, date, priority } = new Project(
    taskTitle.value,
    description.value,
    new Date(dueDate.value),
    isPriority.value
  );

  const taskData = {
    id: Date.now(),
    title,
    descrip,
    date: `${
      date.getUTCMonth() + 1
    }/${date.getUTCDate()}/${date.getUTCFullYear()}`,
    priority,
  };

  savedTasks.push(taskData);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
  const newDiv = document.createElement("div");
  newDiv.classList.add("task-box");
  newDiv.setAttribute("data-id", taskData.id);
  projectDisplay.append(newDiv);
  newDiv.innerHTML = `
    <p class="task-title">${title}</p>
    <p class="task-descrip">${descrip}</p>
    <p class="task-date">Due Date: ${taskData.date} </p> 
    <button class="edit" type="button">Edit</button>
    <button class="complete" type="button">Complete</button>
    <button class="delete" type="button">Delete</button>
    `;
  if (priority === "yes") {
    newDiv.classList.add("priority-task");
  }

  createdTasks.push(newDiv);
  dateList.push(
    `${date.getUTCMonth()}/${date.getUTCDate()}/${date.getUTCFullYear()}`
  );
  formattedDate.push(
    `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getUTCDate()).padStart(2, "0")}`
  );
  modal.close();
  form.reset();
}
