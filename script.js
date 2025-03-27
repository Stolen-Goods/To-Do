"use strict";

const projectDisplay = document.querySelector(".projects");
const addNewBtn = document.getElementById("new-btn");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal");
const saveBtn = document.getElementById("save-btn");
const taskTitle = document.getElementById("title");
const description = document.getElementById("description");
const dueDate = document.getElementById("due-date");
const isPriority = document.querySelector("input[name='priority']:checked");

addNewBtn.addEventListener("click", () => modal.showModal());
closeModalBtn.addEventListener("click", () => modal.close());
saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const { title, descrip, date, priority } = new Project(
    taskTitle.value,
    description.value,
    dueDate.value
    // isPriority.value
  );
  // console.log(priority);
  const newDiv = document.createElement("div");
  newDiv.classList.add("task-box");
  projectDisplay.append(newDiv);
  newDiv.innerHTML = `
  <p>${title}</p>
  <hr>
  <p>${descrip}</p>
  <p>${date}</p>
  `;
});

function Project(title, descrip, date, priority) {
  this.title = title;
  this.descrip = descrip;
  this.date = date;
  this.priority = priority;
}
