//유저가 값을 입력
//+버튼을 클릭 > 할일이 추가된다
//delete 버튼을 누르면 할일이 삭제된다
//check버튼을 누르면 할일이 끝나고 밑줄생성 + 다시 할일로 되돌아가기도 생성
//1) check 버튼을 클릭하는 순간 컴플리트 값이 false에서 true로 (check버튼은 html이 아닌 js에 있다. 버튼에 클릭이벤트를 지정-onclick)
//2) true이면 끝난것으로 간주하고 밑줄생성하기
//3) false이면 안끝난것으로 간주하고 그대로
//진행중 끝남 탭을 누르면, 언더바가 이동한다
//끝남 탭은 끝난아이템만, 진행중-진행중인것만 나옴.
//all탭 누르면 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
console.log(tabs);
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
  console.log(taskList);

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
}

function toggleComplete(id) {
  //어떤아이템이 선택됐는지 id를 생성.
  console.log("id:", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter(); //밑줄만들어주기
}

function taskDelete(id) {
  console.log("삭제:", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
    }
  }
  console.log(taskList);
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
