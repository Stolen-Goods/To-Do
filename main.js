"use strict";

import save from "./save.js";
import btnClicks, { completedTasks } from "./buttons.js";
import {
  projectDisplay,
  createdTasks,
  form,
  resetView,
  dateList,
} from "./save.js";

const addNewBtn = document.getElementById("new-btn");
const importantBtn = document.querySelector(".important");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal");
const saveBtn = document.getElementById("save-btn");
const projectTitle = document.querySelector("h1");
const taskHeader = document.querySelector(".task-header");
const completedBtn = document.querySelector(".completed");
const todayBtn = document.querySelector(".today");
const tomorrowBtn = document.querySelector(".tomorrow");
const upcomingBtn = document.querySelector(".upcoming");
let theDate = new Date();
let today = `${theDate.getMonth()}/${theDate.getDate()}/${theDate.getFullYear()}`;
let tomorrow = `${theDate.getMonth()}/${
  theDate.getDate() + 1
}/${theDate.getFullYear()}`;

todayBtn.addEventListener("click", () => {
  resetView();
  dateList.forEach((date) => {
    if (today !== date) {
      createdTasks[dateList.indexOf(date)].classList.add("not-priority");
    }
  });
});

tomorrowBtn.addEventListener("click", () => {
  resetView();
  dateList.forEach((date) => {
    if (tomorrow !== date) {
      createdTasks[dateList.indexOf(date)].classList.add("not-priority");
    }
  });
});

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
  resetView();
  completedTasks.forEach((task) => task.classList.remove("task-completed"));
  createdTasks.forEach((task) => task.classList.add("created-task"));
});
importantBtn.addEventListener("click", () => {
  resetView();
  createdTasks.forEach((task) => {
    if (!task.classList.contains("priority-task")) {
      task.classList.add("not-priority");
    }
  });
});

projectTitle.addEventListener("click", resetView);

taskHeader.addEventListener("click", resetView);
