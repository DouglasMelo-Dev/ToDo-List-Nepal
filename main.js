const taskInput = document.querySelector(".task-input input"),
taskbox = document.querySelector(".task-box");

let editId;
let isEditedTask = false;

// Deixei salvo fora pois vou utilizar em outros momentos 
let todos = JSON.parse(localStorage.getItem("todo-list"));

function showTodo(){
     
    taskbox.innerHTML = "";
     
    if(todos){

    todos.forEach((todo, id) => {
        /* console.log(id, todo); */
        /* Se o todo status esta completado, setar isCompleted value para o checked */

    let isCompleted = todo.status == "completed" ? "checked" : " ";
    
        taskbox.innerHTML += `

            <li class="task">

                <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                    <p class="${isCompleted}">${todo.name}</p>
                </label>

                <div class="settings">
                    <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i></i>

                    <ul class="task-menu">
                        <li onclick="editTask(${id}, '${todo.name}')" ><i class="fa-solid fa-pencil"></i>Edit</li>
                        <li onclick="deleteTask(${id})" ><i class="fa-solid fa-trash"></i>Delete</li>
                    </ul>

                </div>

            </li>`;
    })}
};
showTodo();


function updateStatus(selectedTask){

    // pegando o paragrafo que contem o taskName
    let taskName = selectedTask.parentElement.lastElementChild;

        if(selectedTask.checked){
            taskName.classList.add("checked");
            //atualizando status do selected task para completado:
            todos[selectedTask.id].status = "completed";
        } else{
            taskName.classList.remove("checked");
            //atualizando status do selected task para pendente:
            todos[selectedTask.id].status = "pending";
        }
    localStorage.setItem("todo-list", JSON.stringify(todos));
};


function showMenu(selectedTask){
    // console.log(selectedTask);

    /* pegando o taskmenu div */
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");

    /* para fechar o menu: */

    document.addEventListener('click', e => {
        if(e.target.tagName != "I" || e.target != selectedTask){
            taskMenu.classList.remove("show");
        }
    })
};


function deleteTask(deleteId){
    /* console.log(deleteId) */

    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo()
};


function editTask(taskId, taskName){
    //console.log(taskId, taskName) 

    editId = taskId;
    isEditedTask = true;

    taskInput.value = taskName;
};


taskInput.addEventListener('keyup', e =>{

    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        
        if(!isEditedTask){ /* o isEditedTask foi feito no final para editar os campos. Entao se não foi editado segue e se foi editado vai para o else */
            if(!todos){
                todos = [];
            }

            let taskInfo = {name: userTask, status: "pending"};
        todos.push(taskInfo);
        } else {
            isEditedTask = false;
            todos[editId].name = userTask;
            
        }

        taskInput.value = " ";

        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo();
    }
});