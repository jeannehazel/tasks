let tasks = [];

function addTask() {
    const taskName = document.getElementById("taskName").value.trim();
    const priority = document.getElementById("priority").value;
    
    if (taskName !== "") {
        tasks.push({ name: taskName, priority: priority, completed: false });
        document.getElementById("taskName").value = "";
        displayTasks();
    } else {
        alert("Please enter a task name.");
    }
}

function markCompleted(index) {
    tasks[index].completed = true;
    displayTasks();
}

function editTaskName(index) {
    const newTaskName = prompt("Enter the new task name:");

    if (newTaskName !== null) {
        tasks[index].name = newTaskName;
        displayTasks();
    } else {
        alert("Task name remains unchanged.");
    }
}
function editTaskPriority(index) {
    const priorities = ['high', 'medium', 'low'];

    // Create a modal container
    const modalContainer = document.createElement("div");
    modalContainer.style.position = "fixed";
    modalContainer.style.top = "50%";
    modalContainer.style.left = "50%";
    modalContainer.style.transform = "translate(-50%, -50%)";
    modalContainer.style.backgroundColor = "#fff";
    modalContainer.style.padding = "20px";
    modalContainer.style.border = "1px solid #ccc";
    modalContainer.style.zIndex = "1000";

    const selectPriority = document.createElement("select");
    selectPriority.id = "selectPriority";

    priorities.forEach(p => {
        const option = document.createElement("option");
        option.value = p;
        option.text = p.charAt(0).toUpperCase() + p.slice(1); // Capitalize first letter
        selectPriority.add(option);
    });

    selectPriority.value = tasks[index].priority;

    const submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.textContent = "Submit";
    submitButton.onclick = function () {
        tasks[index].priority = selectPriority.value;
        displayTasks();
        modalContainer.remove(); // Remove the modal after submitting
    };

    // Append elements to modal container
    modalContainer.appendChild(selectPriority);
    modalContainer.appendChild(submitButton);

    // Append modal container to the body
    document.body.appendChild(modalContainer);
}

function createPrioritySelect(priorities, selectedPriority) {
    const selectPriority = document.createElement("select");
    selectPriority.id = "selectPriority";

    priorities.forEach(p => {
        const option = document.createElement("option");
        option.value = p;
        option.text = p.charAt(0).toUpperCase() + p.slice(1); // Capitalize first letter
        selectPriority.add(option);
    });

    selectPriority.value = selectedPriority;

    return selectPriority;
}



function displayTasks() {
    const taskTableBody = document.getElementById("taskTableBody");
    taskTableBody.innerHTML = "";

    tasks.forEach((task, index) => {
        const tableRow = document.createElement("tr");

        const taskCell = document.createElement("td");
        taskCell.textContent = task.name;
        tableRow.appendChild(taskCell);

        const priorityCell = document.createElement("td");
        priorityCell.textContent = task.priority;
        priorityCell.className = task.priority;
        tableRow.appendChild(priorityCell);

        const statusCell = document.createElement("td");
        if (task.completed) {
            statusCell.textContent = "Completed";
        } else {
            const editNameButton = document.createElement("button");
            editNameButton.textContent = "Edit Name";
            editNameButton.onclick = function () {
                editTaskName(index);
            };
            statusCell.appendChild(editNameButton);

            const editPriorityButton = document.createElement("button");
            editPriorityButton.textContent = "Edit Priority";
            editPriorityButton.onclick = function () {
                editTaskPriority(index);
            };
            statusCell.appendChild(editPriorityButton);

            const completeButton = document.createElement("button");
            completeButton.textContent = "Mark Completed";
            completeButton.onclick = function () {
                markCompleted(index);
            };
            statusCell.appendChild(completeButton);
        }
        tableRow.appendChild(statusCell);

        taskTableBody.appendChild(tableRow);
    });
}
