let $ = document;
const inputElem = $.getElementById("itemInput");
const addButton = $.getElementById("addButton");
const clearButton = $.getElementById("clearButton");
const todoListElem = $.getElementById("todoList");
const noTodoElem = $.querySelector(".no-todo");

let todosArray = [];

function addNewTodo() {
   if (inputElem.value) {
      let newTodoTitle = inputElem.value;

      let newTodoObj = {
         id: todosArray.length + 1,
         title: newTodoTitle,
         complete: false,
         fave: false,
      };

      inputElem.value = "";

      todosArray.push(newTodoObj);
      setLocalStorage(todosArray);
      todosGenerator(todosArray);

      inputElem.focus();
   }
}

function setLocalStorage(todosList) {
   localStorage.setItem("todos", JSON.stringify(todosList));
}

function todosGenerator(todosList) {
   let newTodoLiElem, newTodoLabalElem, newTodoCompleteBtn, newTodoDeleteBtn, newTodoFaveBtn;

   todoListElem.innerHTML = "";

   todosList.forEach(function (todo) {
      //   console.log(todo);
      newTodoLiElem = $.createElement("li");
      newTodoLiElem.className = "completed well";

      newTodoLabalElem = $.createElement("label");
      newTodoLabalElem.innerHTML = todo.title;

      newTodoCompleteBtn = $.createElement("button");
      newTodoCompleteBtn.className = "btn btn-success";
      newTodoCompleteBtn.innerHTML = "Complete";
      newTodoCompleteBtn.setAttribute("onclick", "editTodo(" + todo.id + ")");

      newTodoFaveBtn = $.createElement("button");
      newTodoFaveBtn.className = "faveBtn";
      newTodoFaveBtn.innerHTML = `<svg
      className="starCalss"
      stroke="black"
      fill="white"
      stroke-width="40px"
      viewBox="0 0 576 512"
      height="1.2em"
      width="1.2em"
      xmlns="http://www.w3.org/2000/svg"
   >
      <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
   </svg>`;
      newTodoFaveBtn.setAttribute("onclick", "faveTodo(" + todo.id + ")");

      newTodoDeleteBtn = $.createElement("button");
      newTodoDeleteBtn.className = "btn btn-danger";
      newTodoDeleteBtn.innerHTML = "Delete";
      newTodoDeleteBtn.setAttribute("onclick", "removeTodo(" + todo.id + ")");

      if (todo.complete) {
         newTodoLiElem.className = "uncompleted well";
         newTodoCompleteBtn.innerHTML = "UnComplete";
         newTodoCompleteBtn.className = "btn btn-secondary btn-uncom";
      }

      if (todo.fave) {
         newTodoFaveBtn.innerHTML = `<svg
         className="starCalss"
         stroke="gold"
         fill="gold"
         stroke-width="40px"
         viewBox="0 0 576 512"
         height="1.2em"
         width="1.2em"
         xmlns="http://www.w3.org/2000/svg"
      >
         <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
      </svg>`;
      }

      newTodoLiElem.append(newTodoLabalElem, newTodoCompleteBtn, newTodoDeleteBtn, newTodoFaveBtn);

      todoListElem.append(newTodoLiElem);
   });

   if (todosArray.length === 0) {
      noTodoElem.style.display = "block";
   } else {
      noTodoElem.style.display = "none";
   }
}

function editTodo(todoId) {
   let localStorageTodos = JSON.parse(localStorage.getItem("todos"));

   todosArray = localStorageTodos;

   todosArray.forEach(function (todo) {
      if (todo.id === todoId) {
         todo.complete = !todo.complete;
      }
   });

   setLocalStorage(todosArray);
   todosGenerator(todosArray);
}

function faveTodo(todoId) {
   let localStorageTodos = JSON.parse(localStorage.getItem("todos"));

   todosArray = localStorageTodos;

   todosArray.forEach(function (todo) {
      if (todo.id === todoId) {
         todo.fave = !todo.fave;
      }
   });

   setLocalStorage(todosArray);
   todosGenerator(todosArray);
}

function removeTodo(todoId) {
   let localStorageTodos = JSON.parse(localStorage.getItem("todos"));

   todosArray = localStorageTodos;

   let mainTodoIndex = todosArray.findIndex(function (todo) {
      return todo.id === todoId;
   });

   todosArray.splice(mainTodoIndex, 1);

   setLocalStorage(todosArray);
   todosGenerator(todosArray);
}

function getLocalStorage() {
   let localStorageTodos = JSON.parse(localStorage.getItem("todos"));

   if (localStorageTodos) {
      todosArray = localStorageTodos;
   } else {
      todosArray = [];
   }

   todosGenerator(todosArray);
}

function clearTodos() {
   todosArray = [];
   todosGenerator(todosArray);
   // localStorage.clear()
   localStorage.removeItem("todos");
}

window.addEventListener("load", getLocalStorage);
addButton.addEventListener("click", addNewTodo);
clearButton.addEventListener("click", clearTodos);
inputElem.addEventListener("keydown", function (event) {
   if (event.code === "Enter") {
      addNewTodo();
   }
});

// console.log(todosArray.length);

if (todosArray.length === 0) {
   noTodoElem.style.display = "block";
} else {
   noTodoElem.style.display = "none";
}
