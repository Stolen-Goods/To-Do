import {
  projectDisplay,
  createdTasks,
  dateList,
  formattedDate,
  form,
} from "./save.js";
import Project from "./projects.js";
import { updateBtn, saveBtn } from "./main.js";

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

  const { title, descrip, date, priority } = new Project(
    taskTitle.value,
    description.value,
    new Date(dueDate.value),
    isPriority.value
  );
  const newDiv = document.createElement("div");
  newDiv.classList.add("task-box");
  newDiv.innerHTML = `
    <p class="task-title">${title}</p>
    <p class="task-descrip">${descrip}</p>
    <p class="task-date">Due Date: ${
      date.getUTCMonth() + 1
    }/${date.getUTCDate()}/${date.getUTCFullYear()}</p>
    <button class="edit" type="button">Edit</button>
    <button class="complete" type="button">Complete</button>
    <button class="delete" type="button">Delete</button>
    `;
  if (priority === "yes") {
    newDiv.classList.add("priority-task");
  }
  createdTasks.splice(createdTasks.indexOf(editedTask), 1, newDiv);
  dateList.splice(
    createdTasks.indexOf(editedTask),
    1,
    `${date.getUTCMonth()}/${date.getUTCDate()}/${date.getUTCFullYear()}`
  );
  formattedDate.splice(
    createdTasks.indexOf(editedTask),
    1,
    `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getUTCDate()).padStart(2, "0")}`
  );
  editedTask.replaceWith(newDiv);
  modal.close();
  form.reset();
}
