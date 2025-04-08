import Project from "./projects.js";
import { completedTasks } from "./buttons.js";

export const projectDisplay = document.querySelector(".projects");
export const form = document.querySelector("form");

export let createdTasks = [];

export function resetView() {
  createdTasks.forEach((task) => task.classList.remove("created-task"));
  createdTasks.forEach((task) => task.classList.remove("not-priority"));
  completedTasks.forEach((task) => task.classList.add("task-completed"));
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
    dueDate.value,
    isPriority.value
  );
  const newDiv = document.createElement("div");
  newDiv.classList.add("task-box");
  projectDisplay.append(newDiv);
  newDiv.innerHTML = `
    <p>${title}</p>
    <hr>
    <p>${descrip}</p>
    <p>${date}</p>
    <p>${priority}</p>
    <button class="edit" type="button">Edit</button>
    <button class="complete" type="button">Complete</button>
    <button class="delete" type="button">Delete</button>
    `;
  if (priority === "yes") {
    newDiv.classList.add("priority-task");
  }
  createdTasks.push(newDiv);

  modal.close();
  form.reset();
}
