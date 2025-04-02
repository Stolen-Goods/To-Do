"use strict";

const projectDisplay = document.querySelector(".projects");
const addNewBtn = document.getElementById("new-btn");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal");
const saveBtn = document.getElementById("save-btn");
const form = document.querySelector("form");
const completedBtn = document.querySelector(".completed");

addNewBtn.addEventListener("click", () => modal.showModal());
closeModalBtn.addEventListener("click", () => modal.close());
projectDisplay.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const currentTask = e.target.closest(".task-box");
    projectDisplay.removeChild(currentTask);
  }
  if (e.target.classList.contains("complete")) {
    const currentTask = e.target.closest(".task-box");
    currentTask.classList.add("task-completed");
  }
  if (e.target.classList.contains("edit")) {
  }
});

saveBtn.addEventListener("click", (e) => {
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
  modal.close();
  form.reset();
});

function Project(title, descrip, date, priority) {
  this.title = title;
  this.descrip = descrip;
  this.date = date;
  this.priority = priority;
}
