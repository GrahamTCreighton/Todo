import toDoList from "./state.js";

let lastId = 0;

function retrieve() {
  return toDoList;
}
function remove(id) {
  delete toDoList[id];
}
function removeAll() {
  //Doesn't seem to be setting the constant to empty in app js
  const toDoList = {};
}
function create(value, completed = false) {
  toDoList[lastId++] = { value: value, completed: completed };
}
function updateValue(id, value) {
  toDoList[id].value = value;
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
function hideAllCompleted() {
  //acting as a delete not as a hide needs fixing
  //New visible property added for fixing this
  const selected = selectAllCompleted();
  let keys = Object.keys(selected);
  keys.forEach((key) => remove(key));
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
};
