const titulo = document.getElementById("titulo");
const categoria = document.getElementById("categoria");
const descripcion = document.getElementById("descripcion");
const botonGuardar = document.getElementById("guardar");
const listaIdeas = document.getElementById("listaIdeas");
const contador = document.getElementById("contador");

// Recuperar las ideas guardadas en localStorage
let ideas = JSON.parse(localStorage.getItem("ideas")) || [];

// Mostrar las ideas al abrir la página
mostrarIdeas();

botonGuardar.addEventListener("click", function () {

    if (
        titulo.value.trim() === "" ||
        categoria.value === "" ||
        descripcion.value.trim() === ""
    ) {
        alert("Completa todos los campos.");
        return;
    }

    const nuevaIdea = {
        id: Date.now(),
        titulo: titulo.value,
        categoria: categoria.value,
        descripcion: descripcion.value,
        fecha: new Date().toLocaleDateString("es-DO")
    };

    ideas.push(nuevaIdea);

    guardarEnLocalStorage();
    mostrarIdeas();

    titulo.value = "";
    categoria.value = "";
    descripcion.value = "";
});

function mostrarIdeas() {

    listaIdeas.innerHTML = "";

    ideas.forEach(function (idea) {

        const tarjeta = document.createElement("div");

        tarjeta.classList.add("tarjeta-idea");

        tarjeta.innerHTML = `
            <span class="categoria">${idea.categoria}</span>

            <h3>${idea.titulo}</h3>

            <p>${idea.descripcion}</p>

            <small class="fecha">
                ${idea.fecha || "Idea anterior"}
            </small>

            <button
                class="eliminar"
                onclick="eliminarIdea(${idea.id})"
            >
                Eliminar
            </button>
        `;

        listaIdeas.appendChild(tarjeta);
    });

    actualizarContador();
}

function guardarEnLocalStorage() {

    localStorage.setItem(
        "ideas",
        JSON.stringify(ideas)
    );
}

function eliminarIdea(id) {

    ideas = ideas.filter(function (idea) {
        return idea.id !== id;
    });

    guardarEnLocalStorage();
    mostrarIdeas();
}

function actualizarContador() {

    contador.textContent =
        ideas.length === 1
        ? "1 idea"
        : `${ideas.length} ideas`;
}