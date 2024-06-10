document.addEventListener("DOMContentLoaded", function () {
  let dominosCenter = document.querySelector(".dominosCenter");
  // Inicializar el índice del ejercicio actual
  var currentExerciseIndex = 0;

  // Obtener todas las secuencias de dominós
  var allExercises = [
    [24, 24, 24, -1, 24, 24, 88], // Ejercicio 1
    [34, 34, 34, -1, 61, 61, 88], // Ejercicio 2 (solo como ejemplo, ajusta las secuencias según tus necesidades)
    [66, 2, 35, -1, 66, 2, 35, -1, 66, 2, 88], // Ejercicio 3
    [20, 20, 20, -1, 11, 11, 11, -1, 2, 2, 88], // Ejercicio 4
    [53, 26, 41, -1, 53, 26, 88], // Ejercicio 5
    [50, 24, 63, -1, 5, 42, 88], // Agrega más ejercicios según sea necesario
    [25, 25, 52, -1, 25, 25, 88],
    [32, 4, 32, -1, 4, 32, 88],
    [26, 54, 26, -1, 54, 26, 54, -1, 26, 54, 88],
    [33, 44, 55, -1, 22, 33, 44, -1, 11, 22, 88],
    [62, 61, 60, -1, 52, 51, 50, -1, 42, 41, 88],
    [13, 22, 31, -1, 23, 32, 41, -1, 33, 42, 88],
  ];

  var dominosSelect = [
    [4, 56, 24],
    [61, 0, 34],
    [65, 35, 14],   
    [20, 2, 50],  
    [41, 64, 0],  
    [36, 1, 31],  
    [ 54, 52, 53],  
    [4, 6, 55],  
    [25, 62, 26],  
    [3, 33, 30],  
    [60,10,40],  
    [51, 34, 60],   
  ];

  // Función para imprimir las imágenes de los dominós en la página
  function imprimirDominos() {
    var currentExercise = allExercises[currentExerciseIndex];
    
    // Imprime la prueba
    for (var i = 0; i < currentExercise.length; i++) {
      if (currentExercise[i] === -1) {
        // Crear un elemento de salto de línea
        var br = document.createElement("br");
        document.body.appendChild(br);
      } else {
        // Crear una imagen de dominó
        var domino = document.createElement("img");
        domino.className = "domino";
        domino.src = "img/" + currentExercise[i] + ".jpeg"; // Ajusta la ruta según tu estructura de carpetas y nombres de archivos
        domino.alt = "Domino " + currentExercise[i];
        domino.draggable = true;

        // Almacenar el src de la imagen cuando se empiece a arrastrar
        domino.addEventListener("dragstart", function (event) {
          event.dataTransfer.setData("text/plain", event.target.src);
        });

        dominosCenter.appendChild(domino);
      }
    }
  }

  function imprimeSelect(){
    var currentSelect = dominosSelect[currentExerciseIndex];

    // Imprime los candidatos
    for (var i = 0; i < currentSelect.length; i++) {
      // Crear una imagen de dominó
      var select = document.createElement("img");
      select.className = "select";
      select.src = "img/" + currentSelect[i] + ".jpeg"; // Ajusta la ruta según tu estructura de carpetas y nombres de archivos
      select.alt = "Select " + currentSelect[i];
      select.draggable = true;

      // Almacenar el src de la imagen cuando se empiece a arrastrar
      select.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("text/plain", event.target.src);
      });
      
      //container.appendChild(dominoSelectable);

      dominosCenter.appendChild(select);
    }
  }

  // Obtener el elemento .dice-wrapper
  var diceWrapper = document.querySelector(".dice-wrapper");

  // Permitir soltar en el elemento .dice-wrapper
  diceWrapper.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  // Cambiar el src de la imagen en el elemento .dice-wrapper cuando se suelte una imagen
  diceWrapper.addEventListener("drop", function (event) {
    event.preventDefault();
    var imgSrc = event.dataTransfer.getData("text/plain");
    diceWrapper.style.backgroundImage = "url(" + imgSrc + ")";
  });

  // Función para crear un botón "Siguiente"
  function crearBotonSiguiente() {
    let dominosCenter = document.querySelector(".dominosCenter");

    var siguienteButton = document.createElement("button");
    siguienteButton.innerText = "Siguiente";
    siguienteButton.addEventListener("click", siguienteEjercicio);
    dominosCenter.insertAdjacentElement("beforeend", siguienteButton);
  }

  var timerId;
  var tiempoRestante = 500;

  function iniciarTemporizador() {
    // Cancelar el temporizador actual si existe
    if (timerId) {
      clearInterval(timerId);
    }

    // Actualizar el elemento HTML con el tiempo restante
    document.getElementById("timer").textContent =
      "Tiempo restante: " + tiempoRestante + " segundos";

    // Iniciar un nuevo temporizador que disminuye el tiempo restante cada segundo
    timerId = setInterval(function () {
      tiempoRestante--;

      // Actualizar el elemento HTML con el tiempo restante
      document.getElementById("timer").textContent =
        "Tiempo restante: " + tiempoRestante + " segundos";

      // Si el tiempo ha llegado a cero, redirige al usuario a la página de selección de nivel
      if (tiempoRestante === 0) {
        window.location.href = "SelecNivel.html"; // Cambia esto a la URL de tu página de selección de nivel
        clearInterval(timerId);
        tiempoRestante = 500;
      }
    }, 1000);
  }

  // Define una lista de URLs de imágenes correctas
  var correctImageUrls = [
    "../img/24.jpeg", // Cambia esto a las URLs de tus imágenes correctas
    "../img/61.jpeg",
    "../img/35.jpeg",
    "../img/2.jpeg",
    "../img/41.jpeg",
    "../img/63.jpeg",
    "../img/52.jpeg",
    "../img/4.jpeg",
    "../img/26.jpeg",
    "../img/33.jpeg",
    "../img/40.jpeg",
    "../img/51.jpeg",
    // ...añade más URLs de imágenes...
  ];

  var aciertos = 0;

  function handleDrop(event) {
    // ...el código existente para manejar el evento drop...

    // Obtén la URL de la imagen que se arrastró
    var imageUrl = event.dataTransfer.getData("URL");

    // Extrae la ruta relativa de la URL
    var relativePath = ".." + imageUrl.substring(imageUrl.indexOf("/img/"));

    // Obtén la ruta de la imagen correcta de la lista
    var correctImagePath = correctImageUrls[currentExerciseIndex];

    // console.log(relativePath)
    // console.log(correctImagePath)

    // Compara la ruta relativa con la ruta de la imagen correcta
    if (relativePath === correctImagePath) {
      // Si las rutas coinciden, incrementa el contador de aciertos
      aciertos++;

      // Actualiza el valor en el almacenamiento local
      localStorage.setItem("aciertos", aciertos);
    }
  }

  // Función para avanzar al siguiente ejercicio
  function siguienteEjercicio() {
    // let dominosCenter = document.querySelector(".dominosCenter");
    // Aumentar el índice del ejercicio actual
    currentExerciseIndex++;

    // Verificar si hay más ejercicios
    if (currentExerciseIndex < allExercises.length) {
      // Limpiar el contenido actual
      dominosCenter.innerHTML = "";

      // Restablecer el fondo del elemento .dice-wrapper
      diceWrapper.style.backgroundImage = "none";

      // Imprimir las imágenes del siguiente ejercicio
      imprimirDominos();
      imprimeSelect();

      // Crear un botón "Siguiente" para avanzar al siguiente ejercicio
      crearBotonSiguiente();
    } else {
      alert("¡Has completado todos los ejercicios!");
      // Cancelar el temporizador si el usuario ha completado todos los ejercicios
      clearTimeout(timerId);

      // Redirige al usuario a la página de selección de nivel
      window.location.href = "Records.html"; // Cambia 'seleccionarNivel.html' a la URL de tu página de selección de nivel
    }
  }

  // Llamar a la función para imprimir las imágenes del primer ejercicio
  imprimirDominos();
  imprimeSelect();

  // Crear un botón "Siguiente" para avanzar al siguiente ejercicio
  crearBotonSiguiente();

  // Iniciar el temporizador cuando se inicia el primer ejercicio
  iniciarTemporizador();

  // Obtén una referencia al elemento donde se soltarán las imágenes
  var dropZone = document.querySelector(".dice-wrapper");

  // Agrega un event listener para el evento 'drop'
  dropZone.addEventListener("drop", handleDrop);
});
