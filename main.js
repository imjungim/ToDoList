let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let clock = document.querySelector(".clock");
let taskList = [];
let mode = "all";
let filterList = [];

//현재시간
function getClock(){
clock.innerText = new Date().toLocaleTimeString();
}
getClock();
setInterval(getClock,1000);

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
addButton.addEventListener("click", addTask);

taskInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

function addTask() {
  //let taskContent = taskInput.value;

  let task = {
    taskContent: taskInput.value,
    id: randomIDGenerate(),
    isComplete: false,
  };

  if(task.taskContent == ""){
    alert("오늘 해야할 일을 입력하세요")
  }else{
    taskList.push(task);
  }
  taskInput.value = "";
  render();
}

function render() {
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || "done") {
    list = filterList;
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
    <div class = "task task-done">${list[i].taskContent}</div>
    <div>
      <button onclick ="toggleComplete('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
      <button onclick = "taskDelete('${list[i].id}')"><i class="fa fa-trash"></i></button>
    </div>
  </div>`;
    } else {
      resultHTML += `<div class="task">
    <div>${list[i].taskContent}</div>
    <div>
      <button onclick ="toggleComplete('${list[i].id}')"><i class="fa fa-check"></i></button>
      <button onclick = "taskDelete('${list[i].id}')"><i class="fa fa-trash"></i></button>
    </div>
  </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
  let totalValue = `<div>할일 갯수 :  ${taskList.length} </div>`;
  document.querySelector(".total-count").innerHTML = totalValue;
  let completedValue = `<div>완료된 갯수 : ${
    taskList.filter((item) => item.isComplete === true).length
  } </div>`;
  document.querySelector(".completed-count").innerHTML = completedValue;
}

function toggleComplete(id) {
  //어떤아이템이 선택됐는지 id를 생성.
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter(); //밑줄만들어주기
}

function taskDelete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
    }
  }
  filter();
}

function filter(event) {

  if (event) {
    mode = event.target.id;
    document.getElementById("under-line").style.width =
      event.target.offsetWidth + "px";
    document.getElementById("under-line").style.top =
      event.target.offsetTop + event.target.offsetHeight + "px";
    document.getElementById("under-line").style.left =
      event.target.offsetLeft + "px";
  }
  filterList = [];
  if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
