import { projectDisplay, createdTasks } from "./save.js";

export let completedTasks = [];

export default function btnClicks(e) {
  if (e.target.classList.contains("delete")) {
    const deletedTask = e.target.closest(".task-box");
    projectDisplay.removeChild(deletedTask);
  }
  if (e.target.classList.contains("complete")) {
    const completedTask = e.target.closest(".task-box");
    completedTask.classList.add("task-completed");
    completedTasks.push(completedTask);
    createdTasks.splice(createdTasks.indexOf(completedTask));
  }
  if (e.target.classList.contains("edit")) {
    const editedTask = e.target.closest(".task-box");
    const title = editedTask.querySelector("p:nth-child(1)").textContent;
    // const description = editedTask.querySelector("p:nth-child(2)").textContent;
    // const dueDate = editedTask.querySelector("p:nth-child(3)").textContent;

    let editedModal = modal.cloneNode(true);
    // editedModal.value = editedTask.textContent;
    editedModal.showModal();
    console.log(editedModal.value);
  }
}
