import api from "./api.js";

/*Trial for creating the input*/
let newtask = document.createElement("input")
document.body.appendChild(newtask)
/*let createButton = document.createElement('button')
createbutton.innerHTML = "To Do"
button.onclick // ---> Here I want to activate the create function
                                    //insert create function here
document.body.appendChild(createButton)*/

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
    box.onclick // Tom says this needs a function after the click. 
    task.appendChild(box)
})






// We want a list element per each task that we have in the object 

/* Quiero que mi estructura de html 
<ul>
<li>Walk the dog</li>
<li>Cut the grass</li>
</ul>
*/
