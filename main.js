//para mostrar tab en header
$(function () {
  $("#myTab li:last-child a").tab("show");
});

// Update
function updateTodoItem(index, updatedTodo) {
  let todos = getTodoItems();
  todos[index] = updatedTodo;
  localStorage.setItem("HistorialFormulaGeneral", JSON.stringify(todos));
}

// Delete
function deleteTodoItem(index) {
  let todos = obtenerItemsDeLaMemoria();
  todos.splice(index, 1);
  localStorage.setItem("HistorialFormulaGeneral", JSON.stringify(todos));
}

// Add Todo Form Submit
// variable para el formulario
let form = document.querySelector("form");
// agregar un chismoso que espere el evento submit
form.addEventListener("submit", function (event) {
  //funcion que hara cunado el evento submit ocurra
  event.preventDefault();

  let valora = document.getElementById("valordea").value;
  let valorb = document.getElementById("valordeb").value;
  let valorc = document.getElementById("valordec").value;

  //Calcula las raices
  let x1 = 0;
  let x2 = 0;

  try {
    x1 =
      (-valorb + Math.sqrt(valorb * valorb - 4 * valora * valorc)) /
      (2 * valora);
  } catch (error) {
    x1 = "No tiene solución en R";
  }
  try {
    x2 =
      (-valorb - Math.sqrt(valorb * valorb - 4 * valora * valorc)) /
      (2 * valora);
  } catch (error) {
    x2 = "No tiene solución en mathbb R";
  }
  if (valorb * valorb - 4 * valora * valorc < 0) {
    x1 = "";
    x2 = "";
  }

  //Pasa máximo los 5 valores en el agregador
  agregarAlRegistro(valora, valorb, valorc, x1, x2);

  //Reinicia las variables
  valora = 0;
  valorb = 0;
  valorc = 0;
  x1 = 0;
  x2 = 0;

  mostrarItemsCalculados();
});

function agregarAlRegistro(a, b, c, x1, x2) {
  let registroActual = obtenerItemsDeLaMemoria(); //[{text:todo,completed:false}]
  // .push agrega un elemento al arreglo [{},{},{}]
  let signoB = "+";
  if (b < 0) {
    signoB = "";
  }
  let signoC = "+";
  if (c < 0) {
    signoC = "";
  }

  let variablesDeLaEcuacion = [
    a +
      " x² " +
      signoB +
      b +
      " x " +
      signoC +
      c +
      " = 0 | Solución: x₁=" +
      x1 +
      " y x₂=" +
      x2,
  ];
  if (b * b - 4 * a * c < 0) {
    variablesDeLaEcuacion = [
      a + " x² " + signoB + b + " x " + signoC + c + " = 0 | ∄ solución en R",
    ];
  }

  let abcDelaEcuacion = [a, b, c];

  registroActual.push({
    text: variablesDeLaEcuacion,
    completed: false,
  });
  // mandar la variable todo al local storage
  localStorage.setItem(
    "HistorialFormulaGeneral",
    JSON.stringify(registroActual)
  );
}

function obtenerItemsDeLaMemoria() {
  let registroAct = localStorage.getItem("HistorialFormulaGeneral");
  if (!registroAct) {
    return [];
  }
  return JSON.parse(registroAct);
}

// Show Todos on Load
mostrarItemsCalculados();

// Show Todos
function mostrarItemsCalculados() {
  let todos = obtenerItemsDeLaMemoria();
  let todoList = document.getElementById("listaDeCalculos");
  todoList.innerHTML = "";
  for (let i = todos.length - 1; i >= 0; i--) {
    let li = document.createElement("li");
    li.className = "list-group-item m-1";
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todos[i].completed;
    checkbox.addEventListener("change", function () {
      let updatedTodo = { text: todos[i].text, completed: !todos[i].completed };
      updateTodoItem(i, updatedTodo);
      mostrarItemsCalculados();
    });
    let span = document.createElement("span");
    span.className = "m-1"; //margen de 2
    span.innerHTML = todos[i].text;
    let editButton = document.createElement("button");
    editButton.className = "btn btn-info m-1 botonesparalista";
    editButton.innerHTML = "Editar";
    editButton.addEventListener("click", function () {
      let newTodo = prompt("Enter new todo value:");
      let updatedTodo = { text: newTodo, completed: todos[i].completed };

      updateTodoItem(i, updatedTodo);
      mostrarItemsCalculados();
    });
    let deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger m-1 botonesparalista";
    deleteButton.innerHTML = "Borrar";
    deleteButton.addEventListener("click", function () {
      deleteTodoItem(i);
      mostrarItemsCalculados();
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  }
}
