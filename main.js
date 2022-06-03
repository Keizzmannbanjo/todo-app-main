// ?        VARIABLES DECRALATION HERE
let toggleIcon = document.querySelector("#toggle-icon"),
  todoList = document.querySelector(".todos"),
  todoInput = document.querySelector(".todo_input"),
  footerLinks = document.querySelectorAll("#footer_links a"),
  clearCompleted = document.querySelector("#clear-completed"),
  checkInputs;

// ?    Retrieves or creates todos from local storage of browser
let todos = JSON.parse(localStorage.getItem("todos") || "[]");

// ?    Retrieves ID count of todos
let idCount = JSON.parse(localStorage.getItem("count") || "0");

// ?    EVENTS LISTENERS HERE

// ? Handles todo form submission
todoInput.addEventListener("keypress", function (e) {
  let val = todoInput.value;
  if (e.keyCode == 13) {
    e.preventDefault();
    if (val[0] == " " || val == "") {
      alert("Sorry, task cannot begin with space");
    } else {
      createTodo(val);
    }
  }
});

// ?    EVENT HANDLERS/ FUNCTIONS HERE
// ? Toggles dark mode
toggleIcon.onclick = function () {
  document.body.classList.toggle("dark_mode");
  let x = window.matchMedia("(max-width: 750px)");
  if (x.matches) {
    if (document.body.classList.contains("dark_mode")) {
      toggleIcon.src = "./images/icon-sun.svg";
      document.body.style.backgroundImage =
        'url("./images/bg-mobile-dark.jpg")';
    } else {
      toggleIcon.src = "./images/icon-moon.svg";
      document.body.style.backgroundImage =
        'url("./images/bg-mobile-light.jpg")';
    }
  } else {
    if (document.body.classList.contains("dark_mode")) {
      toggleIcon.src = "./images/icon-sun.svg";
      document.body.style.backgroundImage =
        'url("./images/bg-desktop-dark.jpg")';
    } else {
      toggleIcon.src = "./images/icon-moon.svg";
      document.body.style.backgroundImage =
        'url("./images/bg-desktop-light.jpg")';
    }
  }
};

// ? Creates new todo to localstorage
function createTodo(text) {
  todos = JSON.parse(localStorage.getItem("todos") || "[]");
  idCount = JSON.parse(localStorage.getItem("ID") || "0");
  count = JSON.parse(localStorage.getItem("count") || "0");
  let todo = {
    id: idCount == 0 ? 1 : idCount + 1,
    text: text,
    isCompleted: false,
  };
  idCount = todo.id;
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("count", JSON.stringify(todos.length));
  localStorage.setItem("ID", JSON.stringify(idCount));
  fillTodoList(todos);
  todoInput.value = "";
}

// ? Handles footer links click
footerLinks.forEach((link) =>
  link.addEventListener("click", displayClickedItems)
);

// ? Handles clear completed click
clearCompleted.addEventListener("click", function (e) {
  e.preventDefault();
  todos = JSON.parse(localStorage.getItem("todos") || "[]");
  todos = todos.filter((item) => item.isCompleted != true);
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("count", JSON.stringify(todos.length));
  fillTodoList();
});

// ? Fills the TODO UI
function fillTodoList(action) {
  todos = JSON.parse(localStorage.getItem("todos") || "[]");
  let uncompleted = 0;
  todoList.innerHTML = "";
  if (action == "active") {
    todos = todos.filter((item) => item.isCompleted == false);
  } else if (action == "completed") {
    todos = todos.filter((item) => item.isCompleted == true);
  }
  if (todos.length == 0) {
    todoList.innerHTML = "<h1 class='text-center'> This list is empty</h1>";
    document.querySelector(".todo_count").innerHTML = "0 Items Left";
  } else {
    todos.forEach((item) => {
      let todo = document.createElement("li"),
        circle_wrap = document.createElement("label"),
        circle = document.createElement("div"),
        todoText = document.createElement("span"),
        delete_link = document.createElement("a"),
        delete_icon = document.createElement("img"),
        checkInput = document.createElement("input");
      checkInput.setAttribute("id", String(item.id) + "check");
      checkInput.setAttribute("type", "checkbox");
      if (item.isCompleted) {
        checkInput.checked = true;
        circle.classList.add("completed");
        circle.style.backgroundImage = "url('./images/icon-check.svg')";
        circle.style.backgroundPosition = "center";
        circle.style.backgroundRepeat = "no-repeat";
        circle_wrap.style.backgroundImage = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--color-blue-grad");
        circle_wrap.addEventListener("mouseenter", handleCompleteHover);
      } else {
        uncompleted += 1;
        checkInput.checked = false;
        circle.style.backgroundImage = "";
        circle_wrap.style.backgroundImage = "";
        circle_wrap.removeEventListener("mouseenter", handleCompleteHover);
      }
      if (uncompleted > 0) {
        document.querySelector(".todo_count").innerHTML =
          uncompleted + " items left";
      }
      circle_wrap.append(circle);

      circle_wrap.setAttribute("for", String(item.id) + "check");
      delete_link.setAttribute("href", "#");
      delete_link.setAttribute("class", "todo_delete");
      delete_link.setAttribute("id", String(item.id));
      delete_icon.setAttribute("id", String(item.id));
      delete_icon.setAttribute("src", "./images/icon-cross.svg");
      circle.setAttribute("class", "circle");
      circle_wrap.setAttribute("class", "circle-wrap");
      todoText.setAttribute("class", "todo_text");
      todoText.innerHTML = item.text;
      delete_link.append(delete_icon);
      delete_icon.addEventListener("click", handleDelete);
      todo.append(circle_wrap);
      todo.append(todoText);
      todo.append(delete_link);
      todo.append(checkInput);
      checkInput.style.display = "none";
      todoList.append(todo);
    });
  }
  checkInputs = document.querySelectorAll("input[type='checkbox']");
  checkInputs.forEach((item) =>
    item.addEventListener("click", handleCompleted)
  );
}

function handleCompleted(e) {
  let todoID = parseInt(e.target.id);
  todos = JSON.parse(localStorage.getItem("todos") || "[]");
  if (todos.length != 0) {
    todos.forEach((item) => {
      if (item.id == todoID) {
        if (e.target.checked) {
          item.isCompleted = true;
        } else {
          item.isCompleted = false;
        }
      }
    });
  }
  localStorage.setItem("todos", JSON.stringify(todos));
  fillTodoList();
}

// ? Handle hover events on completed items
function handleCompleteHover(e) {
  let child = e.target.children[0];
  child.style.backgroundColor = "transparent";
}

// ? Handle deletion link click
function handleDelete(e) {
  e.preventDefault();
  todos = JSON.parse(localStorage.getItem("todos") || "[]");
  todos = todos.filter((item) => item.id != e.target.id);
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("count", JSON.stringify(todos.length));
  fillTodoList();
}

// ? Display items based on footer link clicked
function displayClickedItems(e) {
  e.preventDefault();
  footerLinks.forEach((item) => item.classList.remove("active"));
  let action;
  switch (e.target.dataset.action) {
    case "active":
      action = "active";
      break;
    case "completed":
      action = "completed";
      break;
    default:
      action = "all";
      break;
  }
  e.target.classList.add("active");
  fillTodoList(action);
}

// ? Fills the UI on first load
fillTodoList();
