import api from "./api.js";

let list = document.createElement("ul")
document.body.appendChild(list)

let toDoList=api.retrieve()
Object.keys(toDoList).forEach(id => {
    let task = document.createElement("li")
    list.appendChild(task)
    task.innerHTML = toDoList[id].value
    
}) // We want a list element per each task that we have in the object 

/* Quiero que mi estructura de html 
<ul>
<li>Walk the dog</li>
<li>Cut the grass</li>
</ul>
*/
