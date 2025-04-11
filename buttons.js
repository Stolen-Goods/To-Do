import { projectDisplay, createdTasks, dateList } from "./save.js";

export let completedTasks = [];

export default function btnClicks(e) {
  if (e.target.classList.contains("delete")) {
    const deletedTask = e.target.closest(".task-box");
    completedTasks.push(deletedTask);
    dateList.splice(createdTasks.indexOf(deletedTask), 1);
    createdTasks.splice(createdTasks.indexOf(deletedTask), 1);
    projectDisplay.removeChild(deletedTask);
  }
  if (e.target.classList.contains("complete")) {
    const completedTask = e.target.closest(".task-box");
    completedTasks.push(completedTask);
    completedTask.classList.add("task-completed");
    dateList.splice(createdTasks.indexOf(completedTask), 1);
    createdTasks.splice(createdTasks.indexOf(completedTask), 1);

    completedTask.lastElementChild.remove();
    completedTask.lastElementChild.remove();
    completedTask.lastElementChild.remove();
  }
  // if (e.target.classList.contains("edit")) {
  //   const editedTask = e.target.closest(".task-box");
  //   const title = editedTask.querySelector("p:nth-child(1)").textContent;
  //   const description = editedTask.querySelector("p:nth-child(2)").textContent;
  //   const dueDate = editedTask.querySelector("p:nth-child(3)").textContent;

  //   let editedModal = modal.cloneNode(true);
  //   editedModal.value = editedTask.textContent;
  //   editedModal.showModal();
  //   console.log(editedModal.value);
  // }
}
