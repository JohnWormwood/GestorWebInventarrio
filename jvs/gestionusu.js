//Desplegabe y nombre del usuario
document.addEventListener('DOMContentLoaded', function () {
    // Obtener el nombre de usuario del almacenamiento local si está disponible
    var username = localStorage.getItem('username');
    // Mostrar el nombre de usuario en la esquina de la página si está disponible
    if (username) {
        var userInfo = document.getElementById('user-info');
        userInfo.textContent = username;
    } else {
        window.location.href = '../inventario/';
    }
});

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

function cerrarSesion() {
    // Aquí colocarías el código para cerrar la sesión, por ejemplo, redirigir al usuario a la página de inicio de sesión o eliminar los datos de sesión
    // Eliminar el nombre de usuario del almacenamiento local
    localStorage.removeItem('username');
    window.location.href = "index.html"; // Ejemplo de redirección a la página de inicio
}

document.addEventListener('DOMContentLoaded', function () {
    // Crear el popup de modificación
    var popupPassword = $('<div id="popupPassword" class="popup"></div>').appendTo('body');

    // Estilos de los botones
    function setButtonStyles() {
        var buttons = $(".btn-modificarusuario, .btn-borrarusuario, .btn-modpass");
        buttons.css({
            "background-color": "transparent",
            "border": "none",
            "outline": "none",
            "cursor": "pointer",
            "padding": "5px",
            "font-size": "17px",
            "color": "#00295d",
        }).hover(function () {
            $(this).css("color", "#ff5733");
        }, function () {
            $(this).css("color", "#00295d");
        });
        var passwordstyle = $(".password-missed")
        passwordstyle.css({
            "color": "red",
            "border":"none",
            "display":"inline",
            "padding":"3px",
        });
    }

    // Solicitar datos y construir la tabla
    $.ajax({
        url: "../inventario/php/users.php",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var tabla = $("#tabla_gestion_usu");
            $.each(data, function (index, item) {
                var fila = $("<tr>").append(
                    $("<td>").text(item.id),
                    $("<td>").append(
                        $("<span>").text(item.Usuarios),
                        $("<div>").html('<div"></div>').addClass("password-missed")
                    ),
                    $("<td>").append(
                        $("<span>").text(item.Password),
                        $("<button>").html('<i class="fa-solid fa-pen-to-square"></i>').addClass("btn-modpass")
                    ),
                    $("<td>").append(
                        $("<button>").html('<i class="fa-solid fa-trash-can-arrow-up"></i>').addClass("btn-borrarusuario")
                    )
                );
                tabla.append(fila);
            });
            setButtonStyles(); // Aplicar estilos a los botones después de construir la tabla
        }
    });

    // Controlador de eventos para el clic en el botón "Modificar Contraseña"
    $("#tabla_gestion_usu").on("click", ".btn-modpass", function () {
        $("#popupCantidad").remove();

        var id = $(this).closest("tr").find("td:eq(0)").text();
        var usuario = $(this).closest("tr").find("td:eq(1)").text();
        var Password = $(this).closest("tr").find("td:eq(2)").text();

        // Llenar el formulario de modificación dentro del popup
        popupPassword.html(`
            <div class="popup-content">
                <span class="close" onclick="closeForm()">&times;</span>
                <h3>Modificar Contraseña</h3>
                <form id="formmodpass" method="post">

                    <input type="hidden" class="form-control" name="id" value="${id}" >

                    <br>
                    <div class="input-box">
                        <label for="usuario">Nombre :</label>
                        <input type="text" class="form-control" name="usuario" value="${usuario}" readonly>
                    </div>
                    <br>
                    <div class="input-box">
                        <label for="password">Nueva Contraseña:</label>
                        <input type="password" class="form-control" name="password" placeholder="Introduzca la nueva contraseña" value="${Password}" >
                    </div>
                    <br>
                    <div class="btn">
                        <button class="btn-modpass" type="button">Modificar</button>
                    </div>
                </form>
            </div>`
        );

        popupPassword.show(); // Mostrar el popup de modificación
    });

    // Controlador de eventos para el botón "Modificar" dentro del popup
    popupPassword.on("click", ".btn-modpass", function () {
        var form = $("#formmodpass");
        var formData = form.serialize();
        $.ajax({
            url: "../inventario/php/modificarusuarios.php",
            type: "POST",
            data: formData,
            success: function (response) {
                alert(response);
                location.reload();
            },
            error: function (xhr, status, error) {
                console.error("Error en la solicitud: " + status + ", " + error);
            }
        });
    });


});

function crearusuariofn() {
    // Mostrar el popup
    document.getElementById("addusuario").style.display = "block";

    // Agregar un evento al formulario para enviar los datos al hacer clic en el botón "Añadir"
    var form = document.getElementById("formularioUsuario");
    form.addEventListener("submit", function(event) {
        // Prevenir el comportamiento predeterminado del formulario para evitar la recarga de la página
        event.preventDefault();

        // Obtener los datos del formulario
        var formData = new FormData(form);

        // Crear una solicitud AJAX para enviar los datos al servidor
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../inventario/php/crearusuario.php", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Mostrar la respuesta del servidor en un mensaje de alerta
                    alert(xhr.responseText);

                    // Recargar la página después de agregar el usuario (opcional)
                    location.reload();
                } else {
                    console.error("Error en la solicitud: " + xhr.status);
                }
            }
        };
        xhr.send(formData);
    });
}

// Función para cerrar el pop-up
function closeForm() {
    $("#popupPassword").hide();
}

//  Eliminar usuario
document.addEventListener('DOMContentLoaded', function () {
    // Controlador de eventos para el clic en el botón "Borrar Usuario"
    $("#tabla_gestion_usu").on("click", ".btn-borrarusuario", function () {
        // Obtener el ID del usuario que se va a borrar desde la fila de la tabla
        var id = $(this).closest("tr").find("td:eq(0)").text();

        // Confirmar con el usuario antes de borrar
        if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            // Realizar la solicitud AJAX para borrar el usuario
            $.ajax({
                url: "../inventario/php/eliminarusuario.php",
                type: "POST",
                data: { id: id }, // Enviar el ID del usuario al script PHP
                success: function (response) {
                    alert(response); // Mostrar el mensaje de éxito o error
                    location.reload(); // Recargar la página para reflejar los cambios
                },
                error: function (xhr, status, error) {
                    console.error("Error en la solicitud: " + status + ", " + error);
                }
            });
        }
    });
});

$("#password-missed").on("click", ".password-missed", function () {
    var fila = $(this).closest("tr");
    var id = fila.find("td:eq(0)").text();
    // Lógica para borrar el elemento con el ID especificado
    if (confirmacion) {
        $.ajax({
            url: '../inventario/php/passwordmissed.php',
            method: 'POST',
            data: { id: id },
            success: function (response) {
                // Actualizar la tabla u otra lógica en caso de éxito
                alert(response); // Muestra la respuesta del servidor (opcional)
                buscar()
            },
            error: function (xhr, status, error) {
                console.error(error); // Manejo de errores (opcional)
            }
        });
    }

});

/*window.onload = function() {
    var failedUsername = localStorage.getItem("failedLoginUsername"); // Obtener el nombre de usuario del almacenamiento local
    if (failedUsername) {
        document.getElementById("failedUsername").innerText = failedUsername + "*"; // Mostrar el nombre de usuario con un asterisco
    }
};*/

window.onload = function() {
    var urlParams = new URLSearchParams(window.location.search);
    var forgotPassword = urlParams.get('forgotPassword');
    var failedUsername = urlParams.get('username');
    if (forgotPassword === "true" && failedUsername) {
        document.getElementById("failedUsername").innerText = failedUsername + "*"; // Mostrar el nombre de usuario con un asterisco
    }
};

// Función para cerrar el formulario
function closeFormausuario() {
    document.getElementById("addusuario").style.display = "none";
}

//              Funcionamiento de busqueda   //
// Función para realizar la búsqueda 
function buscarusu() {
    var busquedausu = document.getElementById("busquedausu").value;
    var valoresCheckbox = obtenerValoresCheckbox();

    // Hacer una solicitud AJAX para obtener los datos filtrados del archivo PHP
    $.ajax({
        url: "../inventario/php/buscadorusuarios.php",
        type: "POST",
        dataType: "json",
        data: { busquedausu: busquedausu, valoresCheckbox: valoresCheckbox },
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
    $("#myDropdownusu input[type='checkbox']:checked").each(function () {
        valores.push($(this).val());
    });
    if (valores.length === 0) {
        return "id, Usuarios"; // Valores predeterminados si no se selecciona ningún filtro
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



// Función para mostrar los resultados de la búsqueda en la tabla
function mostrarResultados(data) {
    var tabla = $("#tabla_gestion_usu tbody"); // Seleccionar la tabla

    // Limpiar el contenido actual de la tabla, excluyendo el primer <tr>
    tabla.children('tr:not(#encabezado_usuarios)').remove();

    // Iterar sobre los datos recibidos y agregar filas a la tabla
    data.forEach(function (item) {
        var fila = $("<tr>").append(
            // Crear celdas con los datos correspondientes
            $("<td>").text(item.id),
                    $("<td>").append(
                        $("<span>").text(item.Usuarios),
                        $("<div>").html('<div"></div>').addClass("password-missed")
                    ),
                    $("<td>").append(
                        $("<span>").text(item.Password),
                        $("<button>").html('<i class="fa-solid fa-pen-to-square"></i>').addClass("btn-modpass")
                    ),
                    $("<td>").append(
                        $("<button>").html('<i class="fa-solid fa-trash-can-arrow-up"></i>').addClass("btn-borrarusuario")
                    )
        );
        tabla.append(fila); // Agregar la fila a la tabla
        console.log("Muestra el resultado de la busqueda")
        recargarCSS();
    });
    // Llamar a la función para hacer las columnas de la tabla redimensionables
    createResizableTable($("#tabla_gestion_usu"), true);
}

//busca al dar enter
document.addEventListener('DOMContentLoaded', function () {
    // Agrega el event listener para el evento "keypress" en el input de búsqueda
    var input = document.getElementById("busquedausu");
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("btn_busquedausu").click();
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
    var dropdown = document.getElementById("myDropdownusu");
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
}

