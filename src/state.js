/* Este MODULO que maneja todo el estado de la aplicación, concentra la funcionalidad para manipular datos */

export const todos = JSON.parse(localStorage.getItem("todos") ?? "[]");

/* addTodo */
/* Ejecutar función para añadir un nuevo pendiente, a un listado de pendientes y si es a traves de API, llamar a la API con un POST para crear. */
export function addTodo(item) {
    todos.push({ ...item, done: false });
    persist();
}

export function toggleDone(index) {
    todos[index].done = !todos[index].done;
    persist();
}

export function removeTodo(index) {
    todos.splice(index, 1);
    persist();
}

function persist() {
    localStorage.setItem("todos", JSON.stringify(todos));
}