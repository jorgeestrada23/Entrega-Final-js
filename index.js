
const nameInput = document.getElementById("name");
const subjectSelect = document.getElementById("option");
const notasInputs = document.querySelectorAll(".nota");
const inscribirseBtn = document.querySelectorAll("button")[0];
const guardarBtn = document.querySelectorAll("button")[1];
const historialBtn = document.getElementById("btn-historial");
const dataDiv = document.getElementById("data");
const historialDiv = document.getElementById("historial");
let currentData = null;

//materias
const materias = {
    1: "Literatura",
    2: "Matematica",
    3: "Quimica",
    4: "Biologia",
    5: "Geografia",
    6: "Ingles",
};

// Calcular
function calcularPromedio(notas) {
    const sum = notas.reduce((acc, nota) => acc + nota, 0);
    return (sum / notas.length).toFixed(2);
}

// BotónInscribirse
inscribirseBtn.addEventListener("click", () => {
    const nombre = nameInput.value.trim();
    const materia = materias[subjectSelect.value];
    const notas = Array.from(notasInputs).map(input => parseFloat(input.value)).filter(n => !isNaN(n));

    if (!nombre || notas.length < 2) {
        Swal.fire({
            title: 'Incompleto',
            text: 'Por favor, completa todos los campos',
            icon: 'error',
            confirmButtonText: 'Aceptar',
        });
    }

    const promedio = calcularPromedio(notas);

    currentData = {
        nombre,
        materia,
        notas,
        promedio
    };

    dataDiv.innerHTML = `
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Materia:</strong> ${materia}</p>
        <p><strong>Notas:</strong> ${notas.join(", ")}</p>
        <p><strong>Promedio:</strong> ${promedio}</p>
    `;
});

// Botón Guardar
guardarBtn.addEventListener("click", () => {
    if (!currentData) {
        Swal.fire({
            title: 'Incompleto',
            text: 'Primero completa los datos',
            icon: 'error',
            confirmButtonText: 'Aceptar',
        });
        return;
    }

    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    historial.push(currentData);
    localStorage.setItem("historial", JSON.stringify(historial));

    Swal.fire({
        title: 'Exito',
        text: 'Datos guardados con éxito',
        icon: 'success',
        confirmButtonText: 'Aceptar',
    });

    // Limpiar campos
    nameInput.value = "";
    notasInputs.forEach(input => input.value = "");
    dataDiv.innerHTML = "";
    currentData = null;
});

// Botón historial
historialBtn.addEventListener("click", () => {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];

    historialDiv.innerHTML = "";

    if (historial.length === 0) {
        historialDiv.innerHTML = "<p>No hay datos guardados aún.</p>";
        return;
    }

    historial.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("historial-item");
        card.innerHTML = `
            <p><strong>#${index + 1}</strong></p>
            <p><strong>Nombre:</strong> ${item.nombre}</p>
            <p><strong>Materia:</strong> ${item.materia}</p>
            <p><strong>Notas:</strong> ${item.notas.join(", ")}</p>
            <p><strong>Promedio:</strong> ${item.promedio}</p>
            <hr>
        `;
        historialDiv.appendChild(card);
    });
});