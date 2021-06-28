import toDoList from "./state.js";

let lastId = Object.keys(toDoList).length;

function retrieve() {
  return toDoList;
}
function remove(id) {
  delete toDoList[id];
}
function removeAll() {
  for (const prop in toDoList) {
    delete toDoList[prop];
  }
}
function create(value, completed = false, visible = true, input = false) {
  lastId++;
  toDoList[lastId] = {
    value: value,
    completed: completed,
    visible: visible,
    input: input,
  };
}
function updateValue(id, value) {
  toDoList[id].value = value;
}
function toggleInput(id) {
  toDoList[id].input = !toDoList[id].input;
}
function toggleStatus(id) {
  toDoList[id].completed = !toDoList[id].completed;
}
function sortByCompleted() {
  let sortable = Object.entries(toDoList);
  sortable.sort((a, b) => a[1].completed - b[1].completed);
}
function selectAllCompleted() {
  let entries = Object.entries(toDoList);
  let filtered = entries.filter((entry) => entry[1].completed === true);
  let objectFiltered = {};
  filtered.forEach((entry) => {
    objectFiltered[entry[0]] = entry[1];
  });
  return objectFiltered;
}
function hide(id) {
  toDoList[id].visible = !toDoList[id].completed;
}
function hideAllCompleted() {
  const selected = selectAllCompleted();
  let keys = Object.keys(selected);
  keys.forEach((key) => hide(key));
}

function completedTasksCounter() {
  let entries = Object.entries(toDoList);
  return entries.reduce((acc, entry) => {
    if (entry[1].completed == true) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
}
export default {
  retrieve,
  remove,
  removeAll,
  create,
  updateValue,
  toggleStatus,
  sortByCompleted,
  selectAllCompleted,
  hideAllCompleted,
  completedTasksCounter,
  toggleInput,
};
