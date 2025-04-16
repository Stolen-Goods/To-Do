"use strict";

import save from "./save.js";
import btnClicks, { completedTasks, modal } from "./buttons.js";
import {
  projectDisplay,
  createdTasks,
  form,
  resetView,
  dateList,
} from "./save.js";

const addNewBtn = document.getElementById("new-btn");
const importantBtn = document.querySelector(".important");

const closeModalBtn = document.getElementById("close-modal");
const saveBtn = document.getElementById("save-btn");
const projectTitle = document.querySelector("h1");
const taskHeader = document.querySelector(".task-header");
const completedBtn = document.querySelector(".completed");
const todayBtn = document.querySelector(".today");
const tomorrowBtn = document.querySelector(".tomorrow");
const upcomingBtn = document.querySelector(".upcoming");
let theDate = new Date();
let theMonth = theDate.getMonth();
let theDay = theDate.getDate();
let theYear = theDate.getFullYear();
let today = `${theMonth}/${theDay}/${theYear}`;
let tomorrow = `${theMonth}/${theDay + 1}/${theYear}`;

todayBtn.addEventListener("click", () => {
  resetView();
  dateList.forEach((date, i) => {
    if (date !== today) {
      createdTasks[i].classList.add("not-priority");
    }
  });
});

tomorrowBtn.addEventListener("click", () => {
  resetView();
  dateList.forEach((date, i) => {
    if (date !== tomorrow) {
      createdTasks[i].classList.add("not-priority");
    }
  });
});

upcomingBtn.addEventListener("click", () => {
  resetView();
  dateList.forEach((date, i) => {
    if (date === today || date === tomorrow) {
      createdTasks[i].classList.add("not-priority");
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
