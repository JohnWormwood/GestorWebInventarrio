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

// Cierra el menú desplegable si el usuario hace clic fuera de él
window.onclick = function (event) {
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


//                  EXPORTAR A CSV 

// Espera a que el documento esté listo
$(document).ready(function () {
    // Agrega el evento change al checkbox del encabezado
    $("#checkTodos").change(function () {
        // Obtén el estado del checkbox del encabezado
        var isChecked = $(this).prop("checked");
        // Selecciona todos los checkboxes de las filas y marca/desmarca según el estado del checkbox del encabezado
        $("#tabla tbody input[type='checkbox']").prop("checked", isChecked);
    });
});
//let activo = true
// Función para hacer las columnas de la tabla redimensionables
let resizable = true; // Variable para controlar si el redimensionamiento está habilitado o no

function createResizableTable(table) {
    const cols = table.find('th');
    cols.each(function () {
        const col = $(this);
        // Agregar un elemento de redimensionamiento a la columna
        const resizer = $('<div class="resizer"></div>').css('height', table.height() + 'px');
        col.append(resizer);

        createResizableColumn(col, resizer);
    });
}

// Función para activar o desactivar el redimensionamiento
function toggleResizable(enabled) {
    resizable = enabled;
}

function createResizableColumn(col, resizer) {
    let x = 0;
    let w = 0;
    let originalWidth = col.width(); // Guardar el ancho original de la columna

    const mouseDownHandler = function (e) {
        if (!resizable) return; // Salir si el redimensionamiento está deshabilitado
        x = e.clientX;
        const styles = window.getComputedStyle(col[0]);
        w = parseInt(styles.width, 10);

        $(document).on('mousemove', mouseMoveHandler);
        $(document).on('mouseup', mouseUpHandler);

        resizer.addClass('resizing');
    };

    const mouseMoveHandler = function (e) {
        if (!resizable) return; // Salir si el redimensionamiento está deshabilitado
        const dx = e.clientX - x;

        // Redimensionar la columna actual
        col.width(w + dx);

        // Redimensionar la columna adyacente del lado derecho
        const nextCol = col.next();
        const nextColWidth = nextCol.width();
        nextCol.width(nextColWidth - dx);

        // Restaurar el ancho original de la columna al pasar los límites
        if (col.width() < originalWidth) {
            col.width(originalWidth);
            nextCol.width(nextColWidth + (originalWidth - col.width()));
        }
    };


    const mouseUpHandler = function () {
        if (!resizable) return; // Salir si el redimensionamiento está deshabilitado
        resizer.removeClass('resizing');
        $(document).off('mousemove', mouseMoveHandler);
        $(document).off('mouseup', mouseUpHandler);
    };

    resizer.on('mousedown', mouseDownHandler);
}



//BOTON FILTRAR//
// function toggleDropdown() {
//     var dropdown = document.getElementById("myDropdown");
//     createResizableTable($("#tabla"), false);
//     if (dropdown.style.display === "none" || dropdown.style.display === "") {
//         dropdown.style.display = "block";
//     } else {
//         dropdown.style.display = "none";
//     }
// }




//                  IMPORTAR CSV                 //
function PopupImport() {
    function openPopup() {
        document.getElementById('popup').style.display = 'block';
        updateFileCount(); // Llamada para actualizar el número de archivos seleccionados al abrir el pop-up
    }

    function closePopup() {
        document.getElementById('popup').style.display = 'none';
    }

    function updateFileCount() {
        var fileCountText = document.getElementById('fileCount');
        var fileInput = document.getElementById('fileInput');
    }

    document.getElementById('openPopupButton').addEventListener('click', openPopup);
    document.getElementById('closePopupButton').addEventListener('click', closePopup);
    document.getElementById('fileInput').addEventListener('change', updateFileCount);
}

// Crea una instancia de PopupImport cuando se carga el documento
document.addEventListener('DOMContentLoaded', function () {
    var popupImport = new PopupImport();
});

function importarDesdeCSV() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    var formData = new FormData();
    formData.append('file', file);

    // Realizar la solicitud AJAX para enviar el archivo al PHP
    $.ajax({
        url: '../inventario/php/import.php',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            // Manejar la respuesta del servidor
            console.log(response);
            alert(response);
            closePopup(); // Cerrar el popup después de importar los datos
        },
        error: function (xhr, status, error) {
            // Manejar errores aquí si es necesario
            console.error(error);
            alert("Error al importar datos.");
        }
    });
}


//                           TABLA                      //

function setButtonStyles() {
    var buttons = $(".btn-modificar, .btn-borrar , .btn-editarcantidad");
    buttons.css({
        "background-color": "transparent",
        "border": "none",
        "outline": "none",
        "cursor": "pointer",
        "padding": "5px",
        "font-size": "17px", // Ajusta el tamaño del ícono según lo necesites
        "color": "#00295d", // Cambia el color del ícono según lo necesites
    }).hover(function () {
        $(this).css("color", "#ff5733"); // Cambia el color al pasar el cursor sobre el botón
    }, function () {
        $(this).css("color", "#00295d"); // Restaura el color original cuando el cursor sale del botón
    });
}

//Elementos de la tabla
document.addEventListener('DOMContentLoaded', function () {
    // Hacer una solicitud AJAX para obtener los datos del archivo PHP usando jQuery
    $.ajax({
        url: "../inventario/php/elementos.php",
        type: "GET",
        dataType: "json",
        success: function (data) {
            // Construir la tabla con los datos recibidos
            var tabla = $("#tabla");
            $.each(data, function (index, item) {
                // Crear el checkbox
                //var checkbox = $("<input type='checkbox'>");
                // Crear la fila de la tabla y agregar el checkbox al principio
                var fila = $("<tr>").append( 
                    //$("<td>").append(checkbox),
                    $("<td>").text(item.ID).css("display", "none"), // ID oculto
                    $("<td>").text(item.Nombre),
                    $("<td>").text(item.Descripcion),
                    $("<td>").text(item.Cantidad).append(
                        $("<button>").html('<i class= "fa-solid fa-arrow-up-from-bracket get-pr"></i>').addClass("btn-editarcantidad")
                    ),
                    $("<td>").text(item.Fabricante),
                    $("<td>").text(item.Estado),
                    $("<td>").text(item.Stock),
                    $("<td>").text(item.Valor),
                    $("<td>").text(item.Grupo),
                    $("<td>").text(item.Subgrupo),
                    $("<td>").text(item.dueno),
                    $("<td>").text(item.LugarEspacio),
                    $("<td>").text(item.LugarArmario),
                    $("<td>").text(item.LugarCaja),
                    // Botones de opciones
                    $("<td>").css({
                        "display": "flex",
                        "flex-direction": "column"
                    }).append(
                        $("<button>").html('<i class="fa-solid fa-pen-to-square"></i>').addClass("btn-modificar"),
                        $("<button>").html('<i class="fa-solid fa-trash-can-arrow-up"></i>').addClass("btn-borrar")

                    )
                );

                // Agregar estilos a los botones
                setButtonStyles();

                // Agregar la fila a la tabla
                tabla.append(fila);
            });

            // Llamar a la función para hacer las columnas de la tabla redimensionables
            createResizableTable($("#tabla"), true);
            // Controlador de eventos para el clic en el botón de modificar
            $("#tabla").on("click", ".btn-modificar", function () {
                var id = $(this).closest("tr").data("id");
                // Lógica para modificar el elemento con el ID especificado
                // Obtener los datos de la fila correspondiente
                var fila = $(this).closest("tr");
                var id = fila.find("td:eq(0)").text();
                var nombre = fila.find("td:eq(1)").text(); // Nombre agregado
                var descripcion = fila.find("td:eq(2)").text();
                var cantidad = fila.find("td:eq(3)").text();
                var fabricante = fila.find("td:eq(4)").text();
                var estado = fila.find("td:eq(5)").text();
                var stock = fila.find("td:eq(6)").text();
                var valor = fila.find("td:eq(7)").text();
                var grupo = fila.find("td:eq(8)").text();
                var subgrupo = fila.find("td:eq(9)").text();
                var dueno = fila.find("td:eq(10)").text();
                var espacio = fila.find("td:eq(11)").text();
                var armario = fila.find("td:eq(12)").text();
                var caja = fila.find("td:eq(13)").text(); // Ajusta el índice según la cantidad de columnas añadidas


                // Llenar el formulario de modificación dentro del popup
                $("#popupModificar").html(`
                <div class="popup-container">
                    <div class="center">
                        <span class="close" onclick="closeForm()">&times;</span>
                        <div class="title">Modificar Producto</div>
                            <form id="formulariomodificar" method="post">
                                <div class="user-details">
                                <input type="hidden" name="id" value="${id}">
                                
                                <!-- Campo oculto para la ID -->
                                <div class="input-box">
                                    <label for="details">Estado: </label>
                                    <input type="text" class="form-control" name="estado" placeholder="Introduzca el estado" value="${estado}">
                                </div>
                                <div class="input-box">
                                    <label for="details">Stock: </label>
                                    <input type="text" class="form-control" name="stock" placeholder="Introduzca el tipo de stock" value="${stock}">
                                </div>
                                <div class="input-box">
                                    <label for="details">Valor: </label>
                                    <input type="text" class="form-control" name="valor" placeholder="Introduzca el valor" value="${valor}">
                                </div>
                                <div class="input-box">
                                    <label for="details">Dueño: </label>
                                    <input type="text" class="form-control" name="dueno" placeholder="Introduzca el dueño" value="${dueno}">
                                </div>
                                <div class="input-box">
                                    <label for="details">Espacio: </label>
                                    <input type="text" class="form-control" name="espacio" placeholder="Espacio donde se encuentra" value="${espacio}">
                                </div>
                                <div class="input-box">
                                    <label for="details">Armario: </label>
                                    <input type="text" class="form-control" name="armario" placeholder="Armario donde se encuentra" value="${armario}">
                                </div>
                                <div class="input-box">
                                    <label for="details">Caja: </label>
                                    <input type="text" class="form-control" name="caja" placeholder="Caja donde se encuentra" value="${caja}"> 
                                </div>
                                <div class="input-box">
                                    <label for="details">Justificación: </label>
                                    
                                    <textarea name="caja" class="form-control" cols="90" rows="3" required></textarea>
                                    
                                </div>
                                    <br>
                                    <div class="btn">
                                        <button id="btnSubmit2" type="button" class="modify">Modificar</button>
                                    </div>

                            </form>
                    </div>
                    </button>
                    </div>`
                );

                // Mostrar el popup de modificación
                $("#popupModificar").show();
                // Agregar el evento al botón "Modificar" después de generarlo


            });
            // Controlador de eventos para el clic en el botón "Modificar" dentro del popup
            $("#popupModificar").on("click", "#btnSubmit2", function () {
                // Obtener el formulario de modificación y los datos del mismo
                var form = $("#formulariomodificar");
                var formData = form.serialize(); // Serializar el formulario para enviarlo con la solicitud AJAX

                // Crear una nueva solicitud AJAX para enviar los datos del formulario al servidor
                $.ajax({
                    url: "../inventario/php/modificar.php",
                    type: "POST",
                    data: formData,
                    success: function (response) {
                        alert(response); // Mostrar la respuesta del servidor en un mensaje de alerta
                        // Otra lógica para manejar la respuesta del servidor, si es necesario
                        buscar();
                    },
                    error: function (xhr, status, error) {
                        console.error("Error en la solicitud: " + status + ", " + error);
                    }
                });
            });
            // Controlador de eventos para el clic en el botón de borrar
            $("#tabla").on("click", ".btn-borrar", function () {
                var fila = $(this).closest("tr");
                var id = fila.find("td:eq(0)").text();
                // Lógica para borrar el elemento con el ID especificado
                var confirmacion = confirm("¿Seguro que quieres eliminar?");
                if (confirmacion) {
                    $.ajax({
                        url: '../inventario/php/borrar.php',
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

            //Popup de modificar    
            $("#tabla").on("click", ".btn-editarcantidad", function () {

                $("#popupCantidad").remove();

                var id = $(this).closest("tr").find("td:eq(0)").text();
                var nombre = $(this).closest("tr").find("td:eq(1)").text();
                var cantidad = $(this).closest("tr").find("td:eq(3)").text();
                var cantidadAnterior = $(this).closest("tr").find("td:eq(3)").text();
                var username = localStorage.getItem('username');

                // Llenar el formulario de modificación dentro del popup
                var popupCantidad = $('<div id="popupCantidad" class="popup"></div>').appendTo('body');
                popupCantidad.html(`
                <div class="popup-content">
                    <span class="close" onclick="closeForm()">&times;</span>
                    <h3>Modificar Cantidad</h3>
                        <form id="form-modificant" method="post">

                            <input type="hidden" name="id" value="${id}">
                            <input type="hidden" name="nombre" value="${nombre}">
                            <input type="hidden" name="usuario" value="${username}">    
                            <input type="hidden" name="cantidadAnterior" value="${cantidadAnterior}">
    
                            <br>
                 
                            <div class="input-box">
                                <label for="cantidad">Cantidad:</label>
                                <input type="text" class="form-control" name="cantidad" placeholder="Introduzca la cantidad" value="${cantidad}">
                            </div>
                            <br>
                            <div class="input-box">
                                <label for="details">Justificación: </label>
                                <br>
                                <textarea name="justificacion" class="form-control" cols="90" rows="5" required></textarea> 
                            </div>
                            <br>
                            <div class="btn">
                                <button id="btnModcant" type="button" class="modify">Modificar</button>
                            </div>
                            
                        </form>
                </div>`
                );

                // Mostrar el popup de modificación
                popupCantidad.show();

                // Controlador de eventos para el clic en el botón "Modificar" dentro del popup
                $("#popupCantidad").on("click", "#btnModcant", function () {
                    // Controlador de eventos para el clic en el botón "Modificar" dentro del popup
                    // Obtener el formulario de modificación y los datos del mismo
                    var form = $("#form-modificant");
                    var formData = form.serialize(); // Serializar el formulario para enviarlo con la solicitud AJAX

                    // Crear una nueva solicitud AJAX para enviar los datos del formulario al servidor
                    $.ajax({
                        url: "../inventario/php/editarcantidad.php",
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
        }
    });
});


function buscar() {
    var busqueda = document.getElementById("busqueda").value;
    var valoresCheckbox = obtenerValoresCheckbox();
    console.log(valoresCheckbox)

    // Hacer una solicitud AJAX para obtener los datos filtrados del archivo PHP
    $.ajax({
        url: "../inventario/php/buscador.php",
        type: "POST",
        dataType: "json",
        data: { busqueda: busqueda, valoresCheckbox: valoresCheckbox },
        success: function (data) {
            mostrarResultados(data);
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud AJAX: " + error);
        }
    });
}


function obtenerValoresCheckbox() {
    var valores = [];
    $("#myDropdown input[type='checkbox']:checked").each(function () {
        valores.push($(this).val());
    });
    if (valores.length === 0) {
        return "Nombre, descripcion, cantidad, fabricante, estado, Stock, Valor, Grupo, Subgrupo, dueno, LugarEspacio, LugarArmario, LugarCaja";
    } else {
        return valores.join(",");
    }
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
    for (var i = 1; i <= 13; i++) { // Considerando que hay checkboxes hasta cbox11
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



// Función para mostrar los resultados en la tabla existente
function mostrarResultados(data) {
    // Seleccionar la tabla existente
    var tabla = $("#tabla tbody");

    // Limpiar el contenido actual de la tabla, excluyendo el primer <tr>
    tabla.children('tr:not(#encabezado)').remove();

    // Iterar sobre los datos recibidos y agregar filas a la tabla
    data.forEach(function (item) {
        // Crear el checkbox
        //var checkbox = $("<input type='checkbox'>")
        // Crear la fila de la tabla y agregar celdas con los datos correspondientes
        var fila = $("<tr>").append(
            $("<td>").text(item.ID).css("display", "none"), // ID oculto
            $("<td>").text(item.Nombre),
            $("<td>").text(item.Descripcion),
            $("<td>").text(item.Cantidad).append(
                $("<button>").html('<i class= "fa-solid fa-arrow-up-from-bracket get-product"></i>').addClass("btn-editarcantidad")
            ),
            $("<td>").text(item.Fabricante),
            $("<td>").text(item.Estado),
            $("<td>").text(item.Stock),
            $("<td>").text(item.Valor),
            $("<td>").text(item.Grupo),
            $("<td>").text(item.Subgrupo),
            $("<td>").text(item.dueno),
            $("<td>").text(item.LugarEspacio),
            $("<td>").text(item.LugarArmario),
            $("<td>").text(item.LugarCaja),
            // Botones de opciones
            $("<td>").css({
                "display": "flex",
                "flex-direction": "column",
                "justify-content": "center",
                "align-items": "center"
            }).append(
                $("<button>").html('<i class="fa-solid fa-pen-to-square"></i>').addClass("btn-modificar"),
                $("<button>").html('<i class="fa-solid fa-trash-can-arrow-up"></i>').addClass("btn-borrar")
            )


        );
        // Agregar la fila a la tabla
        tabla.append(fila);

        recargarCSS();
        setButtonStyles();
    });

    // Llamar a la función para hacer las columnas de la tabla redimensionables
    createResizableTable($("#tabla"), true);
}

//bussca al dar enter
document.addEventListener('DOMContentLoaded', function () {
    // Agrega el event listener para el evento "keypress" en el input de búsqueda
    var input = document.getElementById("busqueda");
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("btn_busqueda").click();
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


// insertar bdd
document.addEventListener("DOMContentLoaded", function () {
    var btnSubmit = document.getElementById("btnSubmit");
    if (btnSubmit) {
        btnSubmit.addEventListener("click", function () {
            var form = document.getElementById("formulario");
            var formData = new FormData(form);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "../inventario/php/insertar.php", true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        alert(xhr.responseText); // Mostrar el mensaje devuelto por PHP
                        buscar();
                    } else {
                        console.error("Error en la solicitud: " + xhr.status);
                    }
                }
            };
            xhr.send(formData);
        });
    } else {
        console.error("El botón de enviar no fue encontrado.");
    }
});

//tabla



// Función para activar o desactivar el redimensionamiento
function toggleResizable(enabled) {
    resizable = enabled;
}


//                  POP-AP PARA AÑADRIR

// Función para abrir el pop-up
function openForm() {
    document.getElementById("myForm").style.display = "block";
    createResizableTable($("#tabla"), false);
}

// Función para cerrar el pop-up
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    createResizableTable($("#tabla"), true);
    $("#popupModificar").hide();
    $("#popupCantidad").hide();
    $("#myForm").hide();
}

//BOTON FILTRAR//
// function toggleDropdown() {
//     var dropdown = document.getElementById("myDropdown");
//     createResizableTable($("#tabla"), false);
//     if (dropdown.style.display === "none" || dropdown.style.display === "") {
//         dropdown.style.display = "block";
//     } else {
//         dropdown.style.display = "none";
//     }
// }

//session
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
