"use strict";

import save from "./save.js";
import btnClicks, { completedTasks } from "./buttons.js";
import { projectDisplay, createdTasks, form, resetView } from "./save.js";

const addNewBtn = document.getElementById("new-btn");
const importantBtn = document.querySelector(".important");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal");
const saveBtn = document.getElementById("save-btn");
const projectTitle = document.querySelector("h1");
const taskHeader = document.querySelector(".task-header");

const completedBtn = document.querySelector(".completed");

addNewBtn.addEventListener("click", () => {
  modal.showModal();
  resetView();
});
closeModalBtn.addEventListener("click", () => {
  modal.close();
  form.reset();
});
projectDisplay.addEventListener("click", btnClicks);
saveBtn.addEventListener("click", save);
completedBtn.addEventListener("click", () => {
  completedTasks.forEach((task) => task.classList.remove("task-completed"));
  createdTasks.forEach((task) => task.classList.add("created-task"));
});
importantBtn.addEventListener("click", () => {
  completedTasks.forEach((task) => task.classList.add("task-completed"));
  createdTasks.forEach((task) => {
    if (!task.classList.contains("priority-task")) {
      task.classList.add("not-priority");
    } else {
      task.classList.remove("created-task");
    }
  });
});

projectTitle.addEventListener("click", resetView);

taskHeader.addEventListener("click", resetView);
