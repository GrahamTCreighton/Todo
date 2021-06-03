import api from "./api.js";

class App {
  constructor() {
    /*Trial for creating the input*/
    let newtask = document.createElement("input");
    document.body.appendChild(newtask);
    let createButton = document.createElement("button");
    createButton.innerHTML = "add new task";
    createButton.onclick = () => {
      this.execute(api.create);
    }; // ---> Here I want to activate the create function, use the text of the input field line 4 as the first parameter of the create function
    //insert create function here
    document.body.appendChild(createButton);

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

      let clearTask = document.createElement("button");
      clearTask.innerHTML = "clear";
      clearTask.onclick = () => {
        this.execute(api.remove, id);
      };
      task.appendChild(clearTask);

      let updateValue = document.createElement("button");
      updateValue.innerHTML = "update task";
      updateValue.onclick = () => {
        this.execute(api.updateValue, value);
      };
      task.appendChild(updateValue);
    });

    let hideAllCompleted = document.createElement("button");
    hideAllCompleted.innerHTML = "hide completed";
    hideAllCompleted.onclick = () => {
      this.execute(api.hideAllCompleted);
    };
    document.body.appendChild(hideAllCompleted);

    let clearAll = document.createElement("button");
    clearAll.innerHTML = "clear all";
    clearAll.onclick = () => {
      this.execute(api.removeAll);
    };
    document.body.appendChild(clearAll);

    this.currentstate = document.createElement("p");
    this.currentstate.innerHTML = JSON.stringify(api.retrieve());
    document.body.appendChild(this.currentstate);
  }
  render() {
    this.currentstate.innerHTML = JSON.stringify(api.retrieve());
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
