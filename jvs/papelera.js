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
            $("<td>").text(item.Cantidad),
            $("<td>").text(item.Fabricante),
            $("<td>").text(item.Estado),
            $("<td>").text(item.Stock),
            $("<td>").text(item.Valor),
            $("<td>").text(item.Grupo),
            $("<td>").text(item.Subgrupo),
            $("<td>").text(item.Dueño),
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
    });
    recargarCSS();
    setButtonStyles();
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


document.addEventListener('DOMContentLoaded', function () {
    // Hacer una solicitud AJAX para obtener los datos del archivo PHP usando jQuery
    $.ajax({
        url: "../inventario/php/elementosPapelera.php",
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
                    $("<td>").text(item.Cantidad),
                    $("<td>").text(item.Fabricante),
                    $("<td>").text(item.Estado),
                    $("<td>").text(item.Stock),
                    $("<td>").text(item.Valor),
                    $("<td>").text(item.Grupo),
                    $("<td>").text(item.Subgrupo),
                    $("<td>").text(item.Dueño),
                    $("<td>").text(item.LugarEspacio),
                    $("<td>").text(item.LugarArmario),
                    $("<td>").text(item.LugarCaja),
                );               

                // Agregar la fila a la tabla
                tabla.append(fila);
            });
        }

    });
});


$(document).ready(function() {
    $("#vaciarPapelera").click(function() {
        // Mostrar un alert para confirmar la acción
        var confirmacion = confirm("¿Estás seguro de vaciar todos los elementos de la papelera?");
        if (confirmacion) {
            // Si se confirma la acción, enviar la solicitud al servidor
            $.ajax({
                url: '../inventario/php/vaciarPapelera.php', // Ruta a tu script PHP
                type: 'GET', // Usar GET en lugar de POST
                success: function(response) {
                    // Maneja la respuesta del servidor aquí si es necesario
                    alert(response);
                },
                error: function(xhr, status, error) {
                    // Maneja errores aquí si es necesario
                    alert(error);
                }
            });
        } else {
            // Si se cancela la acción, no hacer nada
            console.log("La acción fue cancelada.");
        }
    });
});

