import {
  projectDisplay,
  createdTasks,
  dateList,
  formattedDate,
  form,
  savedTasks,
} from "./save.js";
import Project from "./projects.js";
import { updateBtn, saveBtn } from "./main.js";

export let completedTasks = [];
export const modal = document.getElementById("modal");

function convertToFormattedDate(dateStr) {
  const [month, day, year] = dateStr.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}
function newDateList(dateStr) {
  const [month, day, year] = dateStr.split("/");
  return `${month - 1}/${day}/${year}`;
}

export default function btnClicks(e) {
  if (e.target.classList.contains("delete")) {
    const deletedTask = e.target.closest(".task-box");
    const taskId = deletedTask.dataset.id;
    const taskIndex = savedTasks.findIndex((task) => task.id == taskId);
    if (taskIndex !== -1) {
      savedTasks.splice(taskIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }
    completedTasks.push(deletedTask);
    dateList.splice(createdTasks.indexOf(deletedTask), 1);
    formattedDate.splice(createdTasks.indexOf(deletedTask), 1);
    createdTasks.splice(createdTasks.indexOf(deletedTask), 1);

    projectDisplay.removeChild(deletedTask);
  }

  if (e.target.classList.contains("complete")) {
    //fix for localStorage
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
    updateBtn.classList.remove("hidden");
    updateBtn.onclick = (e) => update(e, editedTask);
    saveBtn.classList.add("hidden");
    const taskTitle = editedTask.querySelector(".task-title").textContent;
    const taskDescrip = editedTask.querySelector(".task-descrip").textContent;
    if (editedTask.classList.contains("priority-task")) {
      document.getElementById("yes").checked = true;
    } else {
      document.getElementById("no").checked = true;
    }
    document.getElementById("title").value = taskTitle;
    document.getElementById("description").value = taskDescrip;
    document.getElementById("due-date").value =
      formattedDate[createdTasks.indexOf(editedTask)];
    modal.showModal();
  }
}

function update(e, editedTask) {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const isPriority = document.querySelector("input[name='priority']:checked");
  const taskTitle = document.getElementById("title");
  const description = document.getElementById("description");
  const dueDate = document.getElementById("due-date");

  const originalId = editedTask.dataset.id;

  const updatedTaskData = {
    id: Number(originalId),
    title: taskTitle.value,
    descrip: description.value,
    date: `${new Date(dueDate.value).getUTCMonth() + 1}/${new Date(
      dueDate.value
    ).getUTCDate()}/${new Date(dueDate.value).getUTCFullYear()}`,
    priority: isPriority.value,
  };

  const taskIndex = savedTasks.findIndex(
    (task) => task.id == updatedTaskData.id
  );
  if (taskIndex !== -1) {
    savedTasks[taskIndex] = updatedTaskData;
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
  }

  const newDiv = document.createElement("div");
  newDiv.classList.add("task-box");
  newDiv.setAttribute("data-id", updatedTaskData.id);
  newDiv.innerHTML = `
    <p class="task-title">${updatedTaskData.title}</p>
    <p class="task-descrip">${updatedTaskData.descrip}</p>
    <p class="task-date">Due Date: ${updatedTaskData.date}</p>
    <button class="edit" type="button">Edit</button>
    <button class="complete" type="button">Complete</button>
    <button class="delete" type="button">Delete</button>
    `;

  if (updatedTaskData.priority === "yes") {
    newDiv.classList.add("priority-task");
  }

  const index = createdTasks.indexOf(editedTask);
  if (index !== -1) {
    dateList.splice(index, 1, newDateList(updatedTaskData.date));
    formattedDate.splice(
      index,
      1,
      convertToFormattedDate(updatedTaskData.date)
    );
    createdTasks.splice(index, 1, newDiv);
  }

  editedTask.replaceWith(newDiv);
  modal.close();
  form.reset();
}
