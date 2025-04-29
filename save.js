import Project from "./projects.js";
import { completedTasks } from "./buttons.js";
import { updateBtn, saveBtn } from "./main.js";

export const projectDisplay = document.querySelector(".projects");
export const form = document.querySelector("form");

export let createdTasks = [];
export let dateList = [];
export let formattedDate = [];

export function resetView() {
  createdTasks.forEach((task) => task.classList.remove("created-task"));
  createdTasks.forEach((task) => task.classList.remove("not-priority"));
  completedTasks.forEach((task) => task.classList.add("task-completed"));
  updateBtn.classList.add("hidden");
  saveBtn.classList.remove("hidden");
}

export default function save(e) {
  e.preventDefault();
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
  const newDiv = document.createElement("div");
  newDiv.classList.add("task-box");
  projectDisplay.append(newDiv);
  newDiv.innerHTML = `
    <p class="task-title">${title}</p>
    <hr>
    <p class="task-descrip">${descrip}</p>
    <p class="task-date">${
      date.getUTCMonth() + 1
    }/${date.getUTCDate()}/${date.getUTCFullYear()}</p> 
    <p class="task-priority">${priority}</p>
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
