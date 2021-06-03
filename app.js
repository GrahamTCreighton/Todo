import api from "./api.js";

/*Trial for creating the input*/
let newtask = document.createElement("input")
document.body.appendChild(newtask)
let createButton = document.createElement('button')
createButton.innerHTML = "add new task";
createButton.onclick = function(){api.create()} // ---> Here I want to activate the create function, use the text of the input field line 4 as the first parameter of the create function
                                    //insert create function here
document.body.appendChild(createButton)

let list = document.createElement("ul")
document.body.appendChild(list)

let toDoList=api.retrieve()
Object.keys(toDoList).forEach(id => {
    let task = document.createElement("li")
    list.appendChild(task)
    task.innerHTML = toDoList[id].value

    let box = document.createElement("input")
    box.setAttribute("type","checkbox")
    if (toDoList[id].completed){box.setAttribute("checked",true)}
    box.onclick = function(){api.updateStatus} // Needs Amanda's approval 
    task.appendChild(box)

    let clearTask = document.createElement("button")
    clearTask.innerHTML = "clear"
    clearTask.onclick = function(){api.remove}
    box.appendChild(clearTask)
})

let deleteButton = document.createElement('button')
deleteButton.innerHTML = "clear all"
deleteButton.onclick = function(){api.removeAll}
document.body.appendChild(deleteButton)






// We want a list element per each task that we have in the object 

/* Quiero que mi estructura de html 
<ul>
<li>Walk the dog</li>
<li>Cut the grass</li>
</ul>
*/
