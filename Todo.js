let list = document.getElementById("list");
let input = document.getElementById("task");
let subinput = document.getElementById("subinput");
let subtask = document.getElementById("sub-task");
let substep = document.getElementById("step-add");
let substepinput = document.getElementById("step-list");
let todoItems = [];
let id = 0;
let subid = 0;
let stepId = 0;
let isChecked = false;

/**
 * Method to add Todo Task
 * @param {name} text 
 * @param {id} id 
 */
function addTodo(text, id) {

  let task = `<div class="listItem" id=${id} onclick="subTaskView(id)">
    <span class="listItem-Inner">
     <i class="icon fontIcon ms-Icon ms-Icon--BulletedList2 iconSize-24" aria-hidden="true"></i>
     <li>
       <p class="listItem-title">${text} </p>
    </li>  
    </span>
    </div>`
  let position = "beforeend";
  list.insertAdjacentHTML(position, task);
}
input.addEventListener("keyup", function(event) {
  if (event.keyCode == 13) {
    let toDo = input.value;
    let subTask = [];
    if (toDo) {
      addTodo(toDo, id);
      todoItems.push({
        name: toDo,
        id: id,
        subTask: subTask
      })
      subTaskView(id);
    }
    id++;
    input.value = "";
  }
});

/**
 * Method to add Subtask
 * @param {name} subTask 
 * @param {id} subid 
 */
function addSubTask(subTask, subid) {
  let subTaskText = `<li class="taskItem-titleWrapper">
    <div>
    <input type="checkbox"  id=${subid} onclick="taskDone(id)"/>
    <div id=${subid} onclick="toggleaddstep(id)">
    <p id =${subid} name = "status" onclick="stepChild(id)">${subTask} </p>
    </div>
    </div>
    </li>`
  let position = "beforeend";
  subtask.insertAdjacentHTML(position, subTaskText);
}
subinput.addEventListener("keyup", function(event) {
  if (event.keyCode == 13) {
    let subTask = subinput.value;
    let stepArray = [];
    let taskId = document.getElementById("task-title-id").textContent;
    for (let i = 0; i < todoItems.length; i++) {
      if (todoItems[i].id == taskId) {
        if (subTask) {
          todoItems[i].subTask.push({
            name: subTask,
            id: subid,
            taskId: todoItems[i].id,
            isChecked: isChecked,
            stepArray: stepArray
          });
          addSubTask(subTask, subid, todoItems[i].id);
          subid++;

        }
      }
    }
    subinput.value = "";
  }
});

/**
 * Method to toggle and add steps to the sub task
 * @param {id} subId - 
 */
function toggleaddstep(subId) {
  let size = document.getElementById("add-step").style.width;

  if (size == "0px") {
    document.getElementById("add-step").style.width = "358px";
  } else {
    document.getElementById("add-step").style.width = "358px";
    for (let i = 0; i < todoItems.length; i++) {
      for (let j = 0; j < todoItems[i].subTask.length; j++) {
        if (todoItems[i].subTask[j].id == subId) {
          document.getElementById("sub-task-list").value = todoItems[i].subTask[j].name;
          document.getElementById("subtask-title-id").textContent = todoItems[i].subTask[j].id;
          if (todoItems[i].subTask[j].isChecked == true) {
            document.getElementById("sub-task-list").style.textDecoration = "line-through";
          } else {
            document.getElementById("sub-task-list").style.textDecoration = "none";
          }
        }
      }
    }
  }
}

/**
 * Method to toggle navbar 
 * @param {*} toogle 
 */
function toggleSidebar(toggle) {
  let availability = document.getElementById(toggle);
  if (availability.classList.contains("open-leftcolumn")) {
    document.getElementById(toggle).className = "leftcolumn";
  } else {
    document.getElementById(toggle).className = "open-leftcolumn";
  }
}

/**
 * Method to toggle navigation bar and add tasks 
 * @param {*} toogle 
 */
function taskMenu(toogle) {
  document.getElementById(toogle).className = "open-leftcolumn";
}
/**
 * Method to Get Subtask
 * @param {*} id 
 */
function subTaskView(id) {
  while (subtask.firstChild) {
    subtask.removeChild(subtask.firstChild);
  }
  getIndexForId(id)
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id == id) {
      document.getElementById("task-title").textContent = todoItems[i].name;
      document.getElementById("task-title-id").textContent = todoItems[i].id;
    }
  }
}

/**
 * Method to display step of specfic subtask
 * @param {*} subId 
 */
function getIndexForId(id) {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id == id) {
      let subTaskArray = todoItems[i].subTask;
      for (let subTask = 0; subTask < subTaskArray.length; subTask++) {
        addSubTask(subTaskArray[subTask].name, subTaskArray[subTask].id);
      }
    }
  }
}


function stepChild(subId) {
  while (substepinput.firstChild) {
    substepinput.removeChild(substepinput.firstChild);
  }
  getIndexForStepId(subId);
}

/**
 * Method to display step of specfic step
 * @param {*} subId 
 */
function getIndexForStepId(subId) {
  for (let j = 0; j < todoItems.length; j++) {
    for (let i = 0; i < todoItems[j].subTask.length; i++) {
      if (todoItems[j].subTask[i].id == subId) {
        console.log(subId)
        for (let k = 0; k < todoItems[j].subTask[i].stepArray.length; k++) {
          addSteps(todoItems[j].subTask[i].stepArray[k].name, todoItems[j].subTask[i].stepArray[k].id);
        }
      }
    }
  }

}

/**
 * Method to Add Steps in Subtask
 * @param {*} step 
 * @param {*} stepId 
 * @param {*} subTaskId 
 */
function addSteps(step, stepId, subTaskId) {
  let stepText = `<li>
    <p class="step-title">${step}</p>
  </li>`
  let position = "beforeend";
  substepinput.insertAdjacentHTML(position, stepText);
}

substep.addEventListener("keyup", function(event) {
  if (event.keyCode == 13) {
    let step = substep.value;
    let subTaskId = document.getElementById("subtask-title-id").textContent;
    for (let i = 0; i < todoItems.length; i++) {
      for (let j = 0; j < todoItems[i].subTask.length; j++) {
        if (todoItems[i].subTask[j].id == subTaskId) {
          if (step) {
            todoItems[i].subTask[j].stepArray.push({
              name: step,
              id: stepId,
              subTaskId: subTaskId
            });
            addSteps(step, stepId, subTaskId);
            stepId++;
          }

        }
        substep.value = "";
      }
    }
  }
})

/**
 * Method to mark the task as Done
 * @param {} subId 
 */
function taskDone(subId) {
  for (let i = 0; i < todoItems.length; i++) {
    for (let j = 0; j < todoItems[i].subTask.length; j++) {
      if (todoItems[i].subTask[j].id == subId) {
        if (todoItems[i].subTask[j].isChecked == false) {
          todoItems[i].subTask[j].isChecked = true;
          document.getElementsByName("status")[j].style.textDecoration = "line-through";
          lineThrough(subId);
        } else {
          todoItems[i].subTask[j].isChecked = false;
          document.getElementsByName("status")[j].style.textDecoration = "none";
          lineThrough(subId);
        }
      }
    }
  }
}

function lineThrough(subId) {
  for (let j = 0; j < todoItems.length; j++) {
    for (let i = 0; i < todoItems[j].subTask.length; i++) {
      if (todoItems[j].subTask[i].id == subId) {
        if (todoItems[j].subTask[i].isChecked == true) {
          document.getElementById("sub-task-list").style.textDecoration = "line-through";
        } else {
          document.getElementById("sub-task-list").style.textDecoration = "none";
        }
      }
    }
  }
}