// ?        VARIABLES DECRALATION HERE
let toggleIcon = document.querySelector("#toggle-icon"),
    todoList = document.querySelector(".todos"),
    todoInput = document.querySelector(".todo_input")

// ?    Retrieves or creates todos from local storage of browser
let todos = JSON.parse(localStorage.getItem("todos") || "[]")

// ?    Retrieves ID count of todos
let idCount = JSON.parse(localStorage.getItem("count") || "0")

// ?    EVENTS LISTENERS HERE

// ? Handles todo form submission
todoInput.addEventListener("keypress", function (e) {
    let val = todoInput.value
    if (e.keyCode == 13) {
        e.preventDefault()
        if (val[0] == " " || val == "") {
            alert("Sorry, task cannot begin with space")
        } else {
            createTodo(val)
        }
    }
})

// ?    EVENT HANDLERS/ FUNCTIONS HERE
// ? Toggles dark mode
toggleIcon.onclick = function () {
    document.body.classList.toggle("dark_mode")
    let x = window.matchMedia("(max-width: 750px)")
    if (x.matches) {
        if (document.body.classList.contains("dark_mode")) {
            toggleIcon.src = "./images/icon-sun.svg"
            document.body.style.backgroundImage = 'url("./images/bg-mobile-dark.jpg")'
        } else {
            toggleIcon.src = "./images/icon-moon.svg"
            document.body.style.backgroundImage = 'url("./images/bg-mobile-light.jpg")'
        }
    } else {
        if (document.body.classList.contains("dark_mode")) {
            toggleIcon.src = "./images/icon-sun.svg"
            document.body.style.backgroundImage = 'url("./images/bg-desktop-dark.jpg")'
        } else {
            toggleIcon.src = "./images/icon-moon.svg"
            document.body.style.backgroundImage = 'url("./images/bg-desktop-light.jpg")'
        }
    }
}

// ? Creates new todo to localstorage
function createTodo(text) {
    todos = JSON.parse(localStorage.getItem("todos") || "[]")
    idCount = JSON.parse(localStorage.getItem("count") || "0")
    let todo = {
        id: idCount == 0 ? 1 : idCount + 1,
        text: text,
        isCompleted: false
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
    localStorage.setItem("count", JSON.stringify(idCount + 1))
    fillTodoList(todos)
    todoInput.value = ""
}

// ? Fills the TODO UI
function fillTodoList() {
    todos = JSON.parse(localStorage.getItem("todos") || "[]")
    todoList.innerHTML = ""
    if (todos.length == 0) {
        todoList.innerHTML = "<h1 class='text-center'> Todo list is empty</h1>"
    } else {
        todos.forEach((item) => {
            console.log(item)
            let todo = document.createElement("li"),
                circle_wrap = document.createElement("div"),
                circle = document.createElement("div"),
                todoText = document.createElement("span"),
                delete_link = document.createElement("a"),
                delete_icon = document.createElement("img")
            delete_link.setAttribute("href", "#")
            delete_link.setAttribute("class", "todo_delete")
            delete_icon.setAttribute("src", "./images/icon-cross.svg")
            circle.setAttribute("class", "circle")
            circle_wrap.setAttribute("class", "circle-wrap")
            todoText.setAttribute("class", "todo_text")
            todoText.innerHTML = item.text
            delete_link.append(delete_icon)
            circle_wrap.append(circle)
            todo.append(circle_wrap)
            todo.append(todoText)
            todo.append(delete_link)
            todoList.append(todo)
        })
    }
}

fillTodoList()
