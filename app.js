// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// Array para guardar amigos
let amigos = [];

// Funciones y requerimientos
function agregarAmigo() {
    let inputAmigo = document.getElementById('amigo');
    let nombreAmigo = inputAmigo.value.trim();

    //Para asegurar que nombreAmigo no esté vacío
    if (nombreAmigo === '') {
        alert('Por favor, ingresa un nombre.');
        return;
    }

    //Uso exprresion regular para validar los datos ingresados por el usuario
    const formatoValido = /^[a-zA-Z\s]+$/;
    if (!formatoValido.test(nombreAmigo)) {
        alert('Por favor, ingresa un nombre válido (solo letras y espacios).');
        inputAmigo.value = '';
        return;
    }

    //Otra validación para evitar nombres repetidos
    if (amigos.includes(nombreAmigo)) {
        alert('Este nombre ya ha sido agregado. Por favor, ingresa uno diferente.');
        inputAmigo.value = '';
        return;
    }

    //Acá agrego los nombres ingresados al final del array y limpio el campo de texto
    amigos.push(nombreAmigo);
    actualizarListaAmigos();
    inputAmigo.value = '';
}

//Esta Función borra la lista que está en pantalla  y luego por cada amigo crea un elemento <li> y  lo pone en pantalla
function actualizarListaAmigos() {
    let listaHTML = document.getElementById('listaAmigos'); 
    listaHTML.innerHTML = '';

    for (let i = 0; i < amigos.length; i++) {
        listaHTML.innerHTML += `<li>${amigos[i]}</li>`;
    }
}

// Esta funcion realiza el sorteo, primero asegurando un minimo de 2 amigos
function sortearAmigo() {
    if (amigos.length < 2) {
        alert('Debes agregar al menos 2 amigos para poder realizar el sorteo.');
        return;
    }

    let totalAmigos = amigos.length;
    let indiceAleatorio = Math.floor(Math.random() * totalAmigos);
    let amigoSorteado = amigos[indiceAleatorio];

    let resultadoHTML = document.getElementById('resultado');
    resultadoHTML.innerHTML = `<p>¡El amigo secreto es: <strong>${amigoSorteado}</strong>!</p>`;

    // Acá decidí cambiar el botón para reiniciar el juego y tener el ciclo completo del juego (agregué un id="boton-principal" a la etiqueta correspondiente en el HTML)
    let boton = document.getElementById('boton-principal');
    boton.textContent = 'Reiniciar juego'; // Cambia el texto del botón
    boton.onclick = reiniciarJuego;        // Cambia la función que se ejecuta al hacer clic
}

// Agrego una nueva función para reiniciar el juego e impedir que se realice el sorteo más de una vez
function reiniciarJuego() {
    // Limpia los datos del juego
    amigos = [];
    document.getElementById('resultado').innerHTML = '';
    actualizarListaAmigos(); 

    // Restaura el botón a su estado original 
    let boton = document.getElementById('boton-principal');
    boton.innerHTML = `
        <img src="assets/play_circle_outline.png" alt="Ícono para sortear">
        Sortear amigo
    `; // Restaura el texto y el ícono
    boton.onclick = sortearAmigo; // Para que vuelva a su función original
}