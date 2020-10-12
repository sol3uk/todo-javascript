const addTodoButton = document.getElementById('add-todo');

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
 * function setTodo()
 * @param {Object} todo Todo we want to save
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

function setTodos(todos) {
  // Set the new todos to localStorage
  localStorage.setItem('todos', JSON.stringify(todos));

  // Update UI
  updateTodoList();
}

function handleAdd() {
  const todoInput = document.getElementById('todo-name');
  const todoName = todoInput.value;
  if (isValidateTodoName(todoName)) {
    const todo = {
      name: todoName,
      id: uuidv4(),
    };
    setTodo(todo);
    todoInput.value = '';
  }
}

function handleDelete(id) {
  const todos = getTodos();
  const index = todos.findIndex((todo) => todo.id === id);
  todos.splice(index, 1);
  setTodos(todos);
}

function isValidateTodoName(name) {
  const nameWithoutSpaces = name.trim();
  if (name.length >= 1 && nameWithoutSpaces.length >= 1) {
    return name;
  }
  return false;
}

function updateTodoList() {
  const todoList = document.getElementById('todo-list');
  todoList.textContent = '';

  const todos = getTodos();
  if (todos.length === 0) {
    const noTodos = document.createTextNode('No todos');
    todoList.append(noTodos);
    return null;
  }
  todos.forEach((todo) => {
    const todoElement = createTodo(todo.name, todo.id);
    todoList.append(todoElement);
  });
}

function createTodo(name, id) {
  const listItem = document.createElement('li');
  listItem.dataset.id = id;
  listItem.classList.add('mdc-list-item', 'between');

  const itemRipple = document.createElement('span');
  itemRipple.classList.add('mdc-list-item__ripple');

  const itemText = document.createElement('span');
  itemText.classList.add('mdc-list-item__text');
  itemText.textContent = name;

  const itemIcon = document.createElement('span');
  itemIcon.classList.add('material-icons', 'mdc-fab__icon');
  itemIcon.textContent = 'delete';

  itemIcon.onclick = () => handleDelete(id);

  listItem.append(itemRipple, itemText, itemIcon);

  return listItem;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

updateTodoList();

addTodoButton.addEventListener('click', handleAdd);
