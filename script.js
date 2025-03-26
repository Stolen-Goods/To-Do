"use strict";

const projectDisplay = document.querySelector(".projects");
const addNew = document.getElementById("new-btn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");

function Project(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
}

const project1 = new Project("History Paper", "Begin researching Greece");

addNew.addEventListener("click", () => modal.showModal());
closeModal.addEventListener("click", () => modal.close());
