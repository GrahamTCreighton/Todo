import api from "./api.js";
import toDoList from "./state.js";

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
      if (toDoList[id].visible) {
        let task = document.createElement("li");
        list.appendChild(task);
        if (toDoList[id].input === false) {
          task.innerHTML = `<div class="content">${toDoList[id].value}</div>`;
          let box = document.createElement("input");
          box.setAttribute("type", "checkbox");
          task.appendChild(box);
          this.renderTaskOptionsComponent(task, id);
          if (toDoList[id].completed) {
            box.setAttribute("checked", true);
          }
          box.onclick = () => {
            this.execute(api.toggleStatus, id);
          };
        } else {
          const input = document.createElement("input");
          input.setAttribute("type", "text");
          input.setAttribute("value", toDoList[id].value);
          task.prepend(input);
          this.renderTaskOptionsComponent(task, id);
        }
      }
    });
  }
  renderClearTaskComponent(task, id) {
    if (toDoList[id].input === false) {
      let clearTask = document.createElement("button");
      clearTask.innerHTML = "clear";
      clearTask.onclick = () => {
        this.execute(api.remove, id);
      };
      task.appendChild(clearTask);
    }
  }
  renderUpdateValueComponent(task, id) {
    if (toDoList[id].input === false) {
      let updateValue = document.createElement("button");
      updateValue.innerHTML = "update task";
      task.appendChild(updateValue);
      updateValue.onclick = () => {
        this.execute(api.toggleInput, id);
      };
    } else {
      let acceptButton = document.createElement("button");
      acceptButton.innerHTML = "accept";
      acceptButton.onclick = () => {
        api.updateValue(id, task.querySelector("input[type=text]").value);
        api.toggleInput(id);
        this.render();
      };
      task.appendChild(acceptButton);
      let cancelButton = document.createElement("button");
      cancelButton.innerHTML = "cancel";
      cancelButton.onclick = () => {
        this.execute(api.toggleInput, id);
        task.innerHTML = `<div class="content">${toDoList[id].value}</div>`;
      };
      task.appendChild(cancelButton);
    }
  }
  renderTaskOptionsComponent(task, id) {
    this.renderClearTaskComponent(task, id);
    this.renderUpdateValueComponent(task, id);
  }
  renderHideAllCompletedOptionsComponent() {
    let hideAllCompleted = document.createElement("button");
    hideAllCompleted.innerHTML = "hide/show completed";
    let anyVisible = api.checkAnyVisible();
    let allVisible = api.checkAllVisible();
    hideAllCompleted.onclick = () => {
      if ((anyVisible = true)) {
        //checkAnyVisible needs implementing in api.
        api.showAllHidden();
        this.render();
      } else if ((allVisible = true)) {
        //checkAllVisible needs implementing in api.
        api.hideAllCompleted();
        this.render();
      }
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
