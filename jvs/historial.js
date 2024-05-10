//          INICIAR SESION
var username = localStorage.getItem('username');

function toggleDropdown() {
    if (username === 'admin') {
        var dropdownContent = document.getElementById("desplegable-btn-usu-admin");
        dropdownContent.classList.toggle("show");
    } else {
        var dropdownContent = document.getElementById("desplegable-btn-usu");
        dropdownContent.classList.toggle("show");
    }
}
//          INICIAR SESION
function toggleDropdown() {
    var username = localStorage.getItem('username');
    var dropdownContent = document.getElementById("desplegable-btn-usu");
    dropdownContent.classList.toggle("show");
}

// Cierra el menú desplegable si el usuario hace clic fuera de él
window.onclick = function(event) {
    if (!event.target.matches('.user-info')) {
        if (username === 'admin') {    
            var dropdowns = document.getElementsByClassName("content-usu-admin");
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];    
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        } else {
            var dropdowns = document.getElementsByClassName("content-usu");
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];    
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
}

  
  function cerrarSesion() {
    // Aquí colocarías el código para cerrar la sesión, por ejemplo, redirigir al usuario a la página de inicio de sesión o eliminar los datos de sesión
    // Eliminar el nombre de usuario del almacenamiento local
    localStorage.removeItem('username');
    window.location.href = "index.html"; // Ejemplo de redirección a la página de inicio
}
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el nombre de usuario del almacenamiento local si está disponible
    var username = localStorage.getItem('username');
    // Mostrar el nombre de usuario en la esquina de la página si está disponible
    if (username) {
        var userInfo = document.getElementById('user-info');
        userInfo.textContent = username;
    }else{
        window.location.href = '../inventario/';
    }
});



// Elementos de la tabla
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM cargado. Iniciando solicitud AJAX...");
    // Hacer una solicitud AJAX para obtener los datos del archivo PHP usando jQuery
    $.ajax({
        url: "../inventario/php/elementosHistorial.php",
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log("Datos recibidos:", data);
            // Construir la tabla con los datos recibidos
            var tabla = $("#tablahis");
            $.each(data, function (index, item) {
                console.log("Procesando elemento:", item);
                // Crear la fila de la tabla
                var fila = $("<tr>").append(
                    $("<td>").text(item.usuario),
                    $("<td>").text(item.justificacion),
                    $("<td>").text(item.nombre_producto),
                    $("<td>").text(item.cantidad_anterior),
                    $("<td>").text(item.cantidad_modificada),
                    $("<td>").text(item.fecha)
                );
                // Agregar la fila a la tabla
                tabla.append(fila);
            });
            console.log("Tabla construida.");
            
        },
        error: function (xhr, status, error) {
            console.error("Error al obtener datos:", status, error);
        }
    });
});

//              Funcionamiento de busqueda   //
// Función para realizar la búsqueda en el historial
function buscarhis() {
    var busquedahis = document.getElementById("busquedahis").value;
    var valoresCheckbox = obtenerValoresCheckbox();

    // Hacer una solicitud AJAX para obtener los datos filtrados del archivo PHP
    $.ajax({
        url: "../inventario/php/buscadorhistorial.php",
        type: "POST",
        dataType: "json",
        data: { busquedahis: busquedahis, valoresCheckbox: valoresCheckbox },
        success: function (data) {
            mostrarResultados(data);
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud AJAX: " + error);
        }
    });
}

// Función para obtener los valores de los checkboxes de filtros
function obtenerValoresCheckbox() {
    var valores = [];
    $("#myDropdownhis input[type='checkbox']:checked").each(function () {
        valores.push($(this).val());
    });
    if (valores.length === 0) {
        return "usuario, justificacion, nombre_producto, cantidad_anterior, cantidad_modificada, fecha"; // Valores predeterminados si no se selecciona ningún filtro
    } else {
        return valores.join(",");
    }
    console.log("Obtiene los valores del checkbox")
}

// CHECKBOX //
// Llamar a la función cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
    ajustarEstilosIconos();
});

function cambiarColorIcono(idIcono) {
    var icono = document.getElementById(idIcono);
    // Cambiar color del icono
    if (icono.style.color === 'black') {
        icono.style.color = 'red'; // Si ya está rojo, cambiar a negro
    } else {
        icono.style.color = 'black'; // Si está negro, cambiar a rojo
    }
}


function ajustarEstilosIconos() {
    // Iterar sobre cada checkbox
    for (var i = 1; i <= 6; i++) { // Considerando que hay checkboxes hasta cbox11
        var checkbox = document.getElementById('cbox' + i); // Obtener el checkbox
        var icono = document.getElementById('icono' + i); // Obtener el icono

        // Verificar si el checkbox está marcado
        if (checkbox.checked) {
            // Si está marcado, aplicar estilo rojo al icono
            icono.style.color = 'orange';
        } else {
            // Si no está marcado, aplicar estilo negro al icono
            icono.style.color = 'black';
        }
    }
}


// Función para mostrar los resultados de la búsqueda en la tabla
function mostrarResultados(data) {
    var tabla = $("#tablahis tbody"); // Seleccionar la tabla

    // Limpiar el contenido actual de la tabla, excluyendo el primer <tr>
    tabla.children('tr:not(#encabezadohis)').remove();

    // Iterar sobre los datos recibidos y agregar filas a la tabla
    data.forEach(function (item) {
        var fila = $("<tr>").append(
            // Crear celdas con los datos correspondientes
            $("<td>").text(item.usuario),
            $("<td>").text(item.justificacion),
            $("<td>").text(item.nombre_producto),
            $("<td>").text(item.cantidad_anterior),
            $("<td>").text(item.cantidad_modificada),
            $("<td>").text(item.fecha)
        );
        tabla.append(fila); // Agregar la fila a la tabla
        console.log("Muestra el resultado de la busqueda")
        recargarCSS();
    });
    // Llamar a la función para hacer las columnas de la tabla redimensionables
    createResizableTable($("#tablahis"), true);
}

//busca al dar enter
document.addEventListener('DOMContentLoaded', function () {
    // Agrega el event listener para el evento "keypress" en el input de búsqueda
    var input = document.getElementById("busquedahis");
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("btn_busquedahis").click();
        }
    });
});

function recargarCSS() {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '../inventario/css/estilo.css'; // Ruta al archivo CSS que deseas recargar
    link.id = 'cssRecargado'; // Un ID para el enlace CSS, si es necesario

    // Eliminar el enlace CSS actual si existe
    var cssRecargado = document.getElementById('cssRecargado');
    if (cssRecargado) {
        head.removeChild(cssRecargado);
    }

    // Agregar el nuevo enlace CSS al head
    head.appendChild(link);
}

// Función para activar o desactivar el redimensionamiento de la tabla
function toggleResizable(enabled) {
    resizable = enabled;
}

// Función para abrir el menú desplegable de filtros
function toggleDropdown() {
    var dropdown = document.getElementById("myDropdownhis");
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
}

