import {
  projectDisplay,
  createdTasks,
  dateList,
  formattedDate,
} from "./save.js";

import save from "./save.js";

export let completedTasks = [];
export const modal = document.getElementById("modal");

export default function btnClicks(e) {
  if (e.target.classList.contains("delete")) {
    const deletedTask = e.target.closest(".task-box");
    completedTasks.push(deletedTask);
    dateList.splice(createdTasks.indexOf(deletedTask), 1);
    formattedDate.splice(createdTasks.indexOf(deletedTask), 1);
    createdTasks.splice(createdTasks.indexOf(deletedTask), 1);
    projectDisplay.removeChild(deletedTask);
  }
  if (e.target.classList.contains("complete")) {
    const completedTask = e.target.closest(".task-box");
    completedTasks.push(completedTask);
    completedTask.classList.add("task-completed");
    dateList.splice(createdTasks.indexOf(completedTask), 1);
    formattedDate.splice(createdTasks.indexOf(completedTask), 1);
    createdTasks.splice(createdTasks.indexOf(completedTask), 1);

    completedTask.lastElementChild.remove();
    completedTask.lastElementChild.remove();
    completedTask.lastElementChild.remove();
  }
  if (e.target.classList.contains("edit")) {
    const editedTask = e.target.closest(".task-box");
    const taskTitle = editedTask.querySelector(".task-title").textContent;
    const taskDescrip = editedTask.querySelector(".task-descrip").textContent;
    const taskPriority = editedTask.querySelector(".task-priority").value;
    document.getElementById("title").value = taskTitle;
    document.getElementById("description").value = taskDescrip;
    document.getElementById("due-date").value =
      formattedDate[createdTasks.indexOf(editedTask)];
    console.log(taskPriority);
    modal.showModal();
  }
}
