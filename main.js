const addTodoButton = $('#add-todo');

//CREATE FUNCTIONS
/**
 * function createTodo(name, id);
 * @param {String} name The name of the todo
 * @param {String} id The id of the todo
 * Returns list items for the todo
 */
function createTodoHTML(name, id) {
  const listItem = $('<li>').addClass('mdc-list-item between');
  const itemRipple = $('<span>').addClass('mdc-list-item__ripple');
  const itemText = $('<span>').addClass('mdc-list-item__text').text(name);
  const itemIcon = $('<span>').addClass('deleteButton material-icons mdc-fab__icon').text('delete');

  //we can just give it a value and not worry about onclick events
  itemIcon.val(id);

  listItem.append(itemRipple, itemText, itemIcon);

  return listItem;
}

/**
 * function handleAdd()
 * Adds a todo
 */
function handleAdd() {
  const todoInput = $('#todo-name');
  const todoName = todoInput.val();

  if (isValidateTodoName(todoName)) {
    const todo = {
      name: todoName,
      id: uuidv4(),
    };
    setTodo(todo);
    todoInput.val('');
  }
}

//READ FUNCTIONS
/**
 * function getTodos()
 * Returns a list of todos from localStorage
 */
function getTodos() {
  // Get todos from localStorage
  const todos = JSON.parse(localStorage.getItem('todos'));

  // Validate that there are todos
  if (todos && Array.isArray(todos) && todos.length >= 1) {
    return todos;
  }
  return [];
}

/**
 * function updateTodoList()
 * Gets the todos from localStorage and then sets it to the UI
 */
function updateTodoList() {
  const todoList = $('#todo-list');
  todoList.text('');

  const todos = getTodos();

  if (todos.length > 0) {
    $.each(todos, (i, todo) => {

      const todoElement = createTodoHTML(todo.name, todo.id);

      todoList.append(todoElement);
    });
  } else {
    todoList.text('No todos');
    return null;
  }
}

//UPDATE FUNCTIONS
/**
 * function setTodo()
 * @param {Object<{ id: String, name: String }>} todo Todo we want to save
 * Returns nothing
 */
function setTodo(todo) {

  // Get todos from localStorage
  const todos = getTodos();

  // Add the new todo to todos
  todos.push(todo);

  // Set the new todos to localStorage
  localStorage.setItem('todos', JSON.stringify(todos));

  // Update UI
  updateTodoList();
}

/**
 * function setTodos(todos)
 * @param {Array<Object<{ id: String, name: String }>>} todos
 */
function setTodos(todos) {
  // Set the new todos to localStorage
  localStorage.setItem('todos', JSON.stringify(todos));

  // Update UI
  updateTodoList();
}

//DELETE FUNCTIONS
/**
 * function handleDelete(id)
 * @param {String} id The id of the todo
 */
function handleDelete(id) {
  const todos = getTodos();
  const index = $.inArray(id, todos.map(todo => todo.id));
  todos.splice(index, 1);
  setTodos(todos);
}






$(document).ready(function () {
  updateTodoList();

  addTodoButton.click(handleAdd);

  //Separates out click events from button creation
  $('body').on('click', '.deleteButton', function (e) {
    handleDelete($(this).val());
  });
});