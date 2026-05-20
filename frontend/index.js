let tasks =
  JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}

function render() {
  let list = document.getElementById("taskList");

  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = `
      <div class="empty">
        ✨ No tasks yet
      </div>
    `;
  }

  let done = 0;

  tasks.forEach((task, i) => {
    if (task.done) {
      done++;
    }

    let div = document.createElement("div");

    div.className = "task";

    div.innerHTML = `
      <input
        type="checkbox"
        ${task.done ? "checked" : ""}
        onclick="toggle(${i})"
      >

      <span class="${task.done ? "done" : ""}">
        ${task.text}
      </span>

      <button onclick="removeTask(${i})">
        ✕
      </button>
    `;

    list.appendChild(div);
  });

  let percent = tasks.length
    ? Math.round((done / tasks.length) * 100)
    : 0;

  document.getElementById("bar").style.width =
    percent + "%";

  document.getElementById("percent").innerText =
    percent + "%";

  let msg = document.getElementById("message");

  msg.innerHTML =
    tasks.length && done === tasks.length
      ? `
        🎉 Good Job Karthick
        <br>
        You completed all tasks today
      `
      : "";

  save();
}

function addTask() {
  let input =
    document.getElementById("taskInput");

  if (!input.value.trim()) {
    return;
  }

  tasks.push({
    text: input.value,
    done: false
  });

  input.value = "";

  render();
}

function toggle(i) {
  tasks[i].done = !tasks[i].done;

  render();
}

function removeTask(i) {
  tasks.splice(i, 1);

  render();
}

render();