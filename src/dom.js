
import { todos, toggleDone, removeTodo } from "./state.js";

/* ---------- utilidades ---------- */
export function renderErrors(form, errors = {}) {
    // ...la función renderErrors queda igual que antes (no hace falta tocarla)...
    /* limpia estados previos */
    [...form.elements].forEach((el) => {
        if (!el.name) return;
        el.classList.remove("is-invalid", "is-valid");
        const feedback =
            el.closest(".input-group")?.querySelector(".invalid-feedback") ??
            el.nextElementSibling;
        if (feedback) {
            feedback.textContent = "";
            feedback.classList.remove("d-block");
        }
    });
    /* muestra nuevos */
    Object.entries(errors).forEach(([name, msgs]) => {
        const input = form.elements[name];
        if (!input) return;
        input.classList.add("is-invalid");
        input.nextElementSibling.textContent = msgs[0];
        input.nextElementSibling.classList.add("d-block");
    });
    /* green cuando todo ok */
    if (!Object.keys(errors).length) {
        [...form.elements]
            .filter((el) => el.name)
            .forEach((el) => el.classList.add("is-valid"));
    }
}

export function renderRegisterOutput(pre, dataObj) {
    pre.textContent = JSON.stringify(dataObj, null, 2);
}

/* ------------------------------------------------ */
/* FUNCIONES PARA LA LISTA DE TAREAS EN FORMATO CARD */
/* ------------------------------------------------ */
export function renderTodoList(ul) {
    ul.replaceChildren(); // limpia todo el contenedor

    // 1) Creamos un Set para evitar IDs repetidos en esta llamada
    const usados = new Set();
    const MAX_ID = 826; // número total de personajes en la API

    todos.forEach((todo, index) => {
        // <li> que contendrá la flip-card
        const li = document.createElement("li");
        li.className = "";
        if (todo.done) li.classList.add("done");

        // Contenedor principal de la tarjeta “flip”
        const flipCard = document.createElement("div");
        flipCard.className = "flip-card";
        if (todo.done) flipCard.classList.add("done");
        flipCard.dataset.index = index;

        // ------------ CARA FRONTAL ------------
        const front = document.createElement("div");
        front.className = "face front";

        // 2) Generar ID aleatorio entre 1 y MAX_ID, sin repetir
        let randomId;
        do {
            randomId = Math.floor(Math.random() * MAX_ID) + 1;
        } while (usados.has(randomId));
        usados.add(randomId);

        // 3) Asignar la imagen de la API como fondo en la cara frontal
        front.style.backgroundImage = 
            `url('https://rickandmortyapi.com/api/character/avatar/${randomId}.jpeg')`;

        // ------------ CARA TRASERA ------------
        const back = document.createElement("div");
        back.className = "face back";
        back.innerHTML = `
      <div class="task-text">${todo.task}</div>
      <div class="task-date">${todo.dueDate}</div>
      <div class="actions">
        <button class="btn btn-sm btn-outline-success me-1" data-action="toggle" data-index="${index}">
          <i class="bi bi-check"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" data-action="delete" data-index="${index}">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;

        // Armamos la tarjeta (front + back)
        flipCard.appendChild(front);
        flipCard.appendChild(back);
        li.appendChild(flipCard);
        ul.appendChild(li);

        // Evento para voltear la tarjeta (excepto al clicar en botones)
        flipCard.addEventListener("click", (e) => {
            if (e.target.closest("button")) return;
            flipCard.classList.toggle("flipped");
        });
    });
}

/* ---------- evento delegación para lista (toggle/delete) ---------- */
export function setupTodoActions(ul, onChange) {
    ul.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        const { action, index } = btn.dataset;
        if (action === "toggle") toggleDone(index);
        if (action === "delete") removeTodo(index);
        onChange();
    });
}
