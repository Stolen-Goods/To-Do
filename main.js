"use strict";

import save from "./save.js";
import btnClicks, { completedTasks } from "./buttons.js";
import { projectDisplay, createdTasks } from "./save.js";

const addNewBtn = document.getElementById("new-btn");
const importantBtn = document.querySelector(".important");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal");
const saveBtn = document.getElementById("save-btn");
const projectTitle = document.querySelector("h1");
const taskHeader = document.querySelector(".task-header");

const completedBtn = document.querySelector(".completed");

addNewBtn.addEventListener("click", () => modal.showModal());
closeModalBtn.addEventListener("click", () => modal.close());
projectDisplay.addEventListener("click", btnClicks);
saveBtn.addEventListener("click", save);
completedBtn.addEventListener("click", () => {
  completedTasks.forEach((task) => (task.style.display = "block"));
  createdTasks.forEach((task) => (task.style.display = "none"));
});
importantBtn.addEventListener("click", () => {
  createdTasks.forEach((task) => {
    if (!task.classList.contains("priority-task")) {
      task.style.display = "none";
    }
  });
});

projectTitle.addEventListener("click", () => {
  createdTasks.forEach((task) => (task.style.display = "block"));
});

taskHeader.addEventListener("click", () => {
  createdTasks.forEach((task) => (task.style.display = "block"));
});
