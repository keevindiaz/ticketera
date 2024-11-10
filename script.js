function guardarYDescargar(event) {
    event.preventDefault();  // Prevenir el envío del formulario

    // Limpiar mensajes de error previos
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(message => message.style.display = "none");

    // Obtener los valores del formulario
    const cuenta = document.getElementById("cuenta").value;
    const contacto = document.getElementById("contacto").value;
    const email = document.getElementById("email").value;
    let comentario = document.getElementById("comentario").value;

    // Obtener los valores de los checkboxes seleccionados
    const checkboxes = document.querySelectorAll('input[name="opciones"]:checked');
    const opcionesSeleccionadas = Array.from(checkboxes).map(checkbox => checkbox.value);

    // Obtener la opción seleccionada en los grupos de radio
    const error1Seleccionado = document.querySelector('input[name="error1"]:checked') ? document.querySelector('input[name="error1"]:checked').value : "";
    const error2Seleccionado = document.querySelector('input[name="error2"]:checked') ? document.querySelector('input[name="error2"]:checked').value : "";
    const error3Seleccionado = document.querySelector('input[name="error3"]:checked') ? document.querySelector('input[name="error3"]:checked').value : "";
    const error4Seleccionado = document.querySelector('input[name="error4"]:checked') ? document.querySelector('input[name="error4"]:checked').value : "";
    const error5Seleccionado = document.querySelector('input[name="error5"]:checked') ? document.querySelector('input[name="error5"]:checked').value : "";

    // Variable para verificar si el formulario es válido
    let formValido = true;

    // Validar si al menos un checkbox está seleccionado
    if (opcionesSeleccionadas.length === 0) {
        alert("¡Por favor, seleccione al menos un módulo donde se produjo el error!");
        formValido = false;
    }

    // Si el formulario no es válido, detener la ejecución
    if (!formValido) {
        return; // Detener la ejecución si hay un error
    }

    // Obtener la fecha actual en formato DD/MM/YYYY
    const fecha = new Date();
    const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`;

    // Crear el contenido del archivo de texto con los datos del formulario, agregando la fecha
    const contenido = `Cliente reportando BUGS
                                                                                 Fecha: ${fechaFormateada}

Cuenta: ${cuenta}
Contacto: ${contacto}
Email: ${email}

Módulo donde se produjo el error:
${opcionesSeleccionadas.length > 0 ? opcionesSeleccionadas.join("\n") : "No se seleccionaron módulos."}

¿El error ha sido reproducido más de una vez? ${error1Seleccionado}

¿El error ha sido reproducido con distintas credenciales? ${error2Seleccionado}

¿Es la primera vez que realiza la acción? ${error3Seleccionado}

¿Está utilizando un suscriptor distinto? ${error4Seleccionado}

¿El bug ha ocurrido siempre que realiza la acción o el mismo es esporádico? ${error5Seleccionado}

Comentarios:
${comentario}
    `;

    // Crear un Blob con el contenido
    const blob = new Blob([contenido], { type: 'text/plain' });

    // Crear enlace de descarga
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `${cuenta}_bugs.txt`;  // Nombre del archivo solo con el nombre del cliente

    // Asegurarse de limpiar cualquier enlace previo antes de generar uno nuevo
    if (document.getElementById("descarga-enlace")) {
        document.getElementById("descarga-enlace").remove();
    }

    // Agregar el enlace a la página
    enlace.id = "descarga-enlace";
    document.body.appendChild(enlace);

    // Hacer clic en el enlace para descargar
    enlace.click();

    // Limpiar URL
    URL.revokeObjectURL(enlace.href);

    // Limpiar los campos del formulario sin recargar la página
    document.getElementById("miFormulario").reset();

    // Mostrar mensaje de éxito
    document.getElementById("resultado").innerText = "Datos guardados y descargados correctamente.";
}

// Agregar el evento al formulario para ejecutar la función de guardado y descarga
document.getElementById("miFormulario").addEventListener("submit", guardarYDescargar);
