import api from "./api.js";

class App {
  constructor() {
    this.render();
  }
  renderCreateComponent() {
    let inputField = document.createElement("input");
    document.body.appendChild(inputField);

    let createButton = document.createElement("button");
    createButton.innerHTML = "add new task";
    createButton.onclick = () => {
      this.execute(() => {
        api.create(inputField.value);
      });
    };
    document.body.appendChild(createButton);
  }
  renderListComponent() {
    let list = document.createElement("ul");
    document.body.appendChild(list);

    let toDoList = api.retrieve();
    Object.keys(toDoList).forEach((id) => {
      let task = document.createElement("li");
      list.appendChild(task);
      task.innerHTML = toDoList[id].value;

      let box = document.createElement("input");
      box.setAttribute("type", "checkbox");
      if (toDoList[id].completed) {
        box.setAttribute("checked", true);
      }
      box.onclick = () => {
        this.execute(api.toggleStatus, id);
      };
      task.appendChild(box);
      this.renderTaskOptionsComponent(task, id);
    });
  }
  renderClearTaskComponent(task, id) {
    let clearTask = document.createElement("button");
    clearTask.innerHTML = "clear";
    clearTask.onclick = () => {
      this.execute(api.remove, id);
    };
    task.appendChild(clearTask);
  }
  renderUpdateValueComponent(task, id) {
    // I want this to change the field of the list to editable and get an accept or cancel button,
    let updateValue = document.createElement("button");
    updateValue.innerHTML = "update task";
    updateValue.onclick = () => {
      this.execute(() => {
        //i want task from list to become editable, and to create two new buttons
        let acceptChange = document.createElement("button");
        acceptChange.innerHTML = "Accept";
        acceptChange.onclick = () => {}; //here i want to accept the input in the editable field
        let cancelChange = document.createElement("button");
        cancelChange.innerHTML = "Cancel";
        cancelChange.onclick = () => {}; //here i want to return to previous state with no changes
        task.appendChild(acceptChange);
        task.appendChild(cancelChange);
      });
    };
    task.appendChild(updateValue);
  }
  renderTaskOptionsComponent(task, id) {
    this.renderClearTaskComponent(task, id);
    this.renderUpdateValueComponent(task, id);
  }
  renderHideAllCompletedOptionsComponent() {
    let hideAllCompleted = document.createElement("button");
    hideAllCompleted.innerHTML = "hide completed";
    hideAllCompleted.onclick = () => {
      this.execute(api.hideAllCompleted);
    };
    document.body.appendChild(hideAllCompleted);
  }
  renderClearAllOptionsComponent() {
    let clearAll = document.createElement("button");
    clearAll.innerHTML = "clear all";
    clearAll.onclick = () => {
      this.execute(api.removeAll);
    };
    document.body.appendChild(clearAll);
  }
  renderListOptionsComponent() {
    this.renderHideAllCompletedOptionsComponent();
    this.renderClearAllOptionsComponent();
  }
  renderCounterComponent() {
    let counter = document.createElement("div");
    counter.innerHTML =
      "FEEL GOOD! You have completed " +
      JSON.stringify(api.completedTasksCounter()) +
      " task/s";
    document.body.appendChild(counter);
  }
  render() {
    document.body.innerHTML = "";

    this.renderCreateComponent();
    this.renderListComponent();
    this.renderListOptionsComponent();
    this.renderCounterComponent();
    this.currentstate = document.createElement("p");
    this.currentstate.innerHTML = JSON.stringify(api.retrieve());
    document.body.appendChild(this.currentstate);
  }

  execute(callback, id) {
    callback(id);
    this.render();
  }
}
let ourApp = new App();
ourApp.render();
// when we call a function of the api we call it through this execute, and this excute in the api will call another function called render
//that will create the html.
