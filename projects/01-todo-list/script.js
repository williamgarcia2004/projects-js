const $containerTasks = document.querySelector(".tasks");
const $form = document.querySelector(".principal-form");
const $deleteTask = document.querySelector("#icon-delete"); 

const $template = document.querySelector("#tasks-items").content;
const $fragment = document.createDocumentFragment();

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let idTask = tasks.length ? tasks[tasks.length - 1].id : 0;

function showTasks () {
    $containerTasks.innerHTML = "";

    if (tasks.length === 0) {
        $containerTasks.innerHTML = `<h2 class="task-message">You have not added any task!</h2>`;
        return;
    };

    for (let i = 0; i < tasks.length; i++) {
        let clone = $template.cloneNode(true);
        clone.querySelector(".task-text").textContent = tasks[i].value;
        clone.querySelector("#icon-delete").dataset.id = tasks[i].id;
        $fragment.append(clone);
    };

    $containerTasks.append($fragment);
};

document.addEventListener("click", e => {
    if (e.target.matches("#icon-delete")) {
        const id = Number(e.target.dataset.id);
        const index = tasks.findIndex(task => task.id === id);
        
        if (index !== -1) {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            showTasks();
            return;
        };
    };
});

document.addEventListener("DOMContentLoaded",  showTasks);

$form.addEventListener("submit", function (e) {
    idTask++;
    e.preventDefault();
    
    const taskText = this.formTask.value.trim();

    if (!taskText) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Debe colocar datos"
        });

        return;
    };

    const taskInfo = {
        id: idTask, 
        value: taskText
    };

    tasks.push(taskInfo);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
    this.formTask.value = "";
});