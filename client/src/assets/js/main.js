const tbody = document.querySelector(".myTable");
const taskDate = document.querySelector(".taskDate");
const taskText = document.querySelector(".taskText");
const taskTime = document.querySelector(".taskTime");
const form = document.querySelector("form");
const head_text = document.querySelector(".head_text");
head_text.textContent = `${head_text.textContent} ${window.localStorage.getItem(
  "username"
)}`;

taskDate.min = getDate();

taskText.value = null;
taskText.textContent = null;
taskDate.value = null;
taskDate.textContent = null;
taskTime.valur = null;
taskTime.textContent = null;

fetchData(q("getTasks"), {
  token: window.localStorage.getItem("token"),
}).then((data) => {
  renderer(data.data.Tasks);
});

function renderer(array, taskId) {
  if (!taskId) taskId = 1;
  for (let i of array) {
    let trow = document.createElement("tr");
    let id = document.createElement("th");
    let text = document.createElement("th");
    let tdate = document.createElement("th");
    let checkbox = document.createElement("th");
    let setBtnTh = document.createElement("th");
    let deleteBtnTh = document.createElement("th");
    let par = document.createElement("p");
    let label = document.createElement("label");
    let checkInp = document.createElement("input");
    let span = document.createElement("span");
    let setBtn = document.createElement("button");
    let delBtn = document.createElement("button");

    id.textContent = taskId.toString();
    id.classList.add("id");
    text.textContent = i.TaskText;
    tdate.textContent = i.TaskDate;
    checkInp.type = "checkbox";
    checkInp.classList.add("filled-in");
    setBtn.type = "button";
    setBtn.classList.add("setButton", "btn", "grey", i.TaskId);
    setBtn.textContent = "Set";
    delBtn.type = "button";
    delBtn.classList.add("deleteButton", "btn", "grey", "darken-3", i.TaskId);
    delBtn.textContent = "Delete";

    label.append(checkInp, span);
    par.append(label);
    checkbox.append(par);
    setBtnTh.append(setBtn);
    deleteBtnTh.append(delBtn);
    trow.append(id, text, tdate, checkbox, setBtnTh, deleteBtnTh);

    tbody.prepend(trow);

    taskId++;
  }
  let deleteButtons = document.querySelectorAll(".deleteButton");
  for (let icon of deleteButtons) {
    icon.addEventListener("click", () => {
      fetchData(q("delTask"), {
        token: window.localStorage.getItem("token"),
        task_id: Number(icon.classList[4]),
        del: 1,
      }).then((data) => {
        console.log(data);
      });
    });
  }

  let setButtons = document.querySelectorAll(".setButton");
  for (let i of setButtons) {
    i.addEventListener("click", () => {
      let text = i.parentElement.parentElement.childNodes[1];
      let input = document.createElement("input");
      i.classList.remove("setButton");
      input.value = text.textContent;
      input.setAttribute("type", "text");
      input.setAttribute("class", "setInp");
      input.setAttribute(
        "style",
        "border: none; outline: none; width: 200px; border-bottom: 1px solid white;"
      );
      text.textContent = null;
      text.append(input);
      window.addEventListener("keydown", (key) => {
        if (key.keyCode == 13) {
          fetchData(q("setTask"), {
            token: window.localStorage.getItem("token"),
            task_id: Number(i.classList[2]),
            text: input.value,
          }).then((data) => {
            console.log(data);
            text.innerHTML = null;
            text.textContent = input.value;
          });
        }
      });
    });
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  fetchData(q("addTask"), {
    token: window.localStorage.getItem("token"),
    text: taskText.value,
    deadline: `${taskTime.value}/${taskDate.value}`,
    st: "create",
  }).then((data) => {
    let id = 1
      ? !tbody.innerHTML
      : Number(document.querySelector(".id").textContent) + 1;
    renderer(data.data.newTask.Task, id);
  });

  taskText.value = null;
  taskText.textContent = null;
  taskDate.value = null;
  taskDate.textContent = null;
  taskTime.valur = null;
  taskTime.textContent = null;
});
/*
<tr>
<th>5</th>
<th>lorem</th>
<th>lorem</th>
<th>
<p>
<label>
<input type="checkbox" class="filled-in"/>
<span></span>
</label>
</p>
</th>
				<th><button type="button" class="setButton btn grey">Set</button></th>
				<th><button type="button" class="deleteButton btn grey darken-3">Delete</button>
				</th>
				</tr>
				*/

function q(lt) {
  if (lt == "getTasks") {
    return `query getTasks($token: String!){
			Tasks(UserToken: $token){
			  TaskId
			  TaskText
			  TaskDate
			  TaskStatus
			}
		}`;
  } else if (lt == "addTask") {
    return `mutation addTask($token: String!, $text: String!, $deadline: String!, $st: String!){
			newTask(token: $token, TaskText: $text, TaskDeadline: $deadline, status: $st){
				Task{
					TaskId
			    TaskText
			    TaskDate
			    TaskStatus
			}
			Status
		}
	}`;
  } else if (lt == "setTask") {
    return `mutation setTask($token: String!, $task_id: Int!, $text: String!){
		setTask(token: $token, taskId: $task_id, text: $text){
			Task{
			TaskId
			TaskText
			TaskDate
			TaskStatus}
			Status
		}
	}`;
  } else if (lt == "delTask") {
    return `mutation deleteTask($token: String!, $task_id: Int!, $del: Int!){
		setTask(token: $token, taskId: $task_id, delete: $del){
			Task{
				TaskStatus
			}
			Status
			}
		}`;
  }
}

async function fetchData(query, object) {
  // console.log(query);
  // console.log(JSON.stringify(object));
  let response = await fetch(`http://${host}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: JSON.stringify(object),
    }),
  });
  return response.json();
}

function checkToken() {
  if (!window.localStorage.token) {
    window.location.href = "/login";
  }
}

checkToken();

function getDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month =
    `${date.getMonth()}`.length > 1
      ? `${date.getMonth() + 1}`
      : `0${date.getMonth() + 1}`;
  let day =
    `${date.getUTCDate()}`.length > 1
      ? `${date.getUTCDate()}`
      : `0${date.getUTCDate()}`;
  let fullDate = `${year}-${month}-${day}`;
  return fullDate;
}
