
$("#tabla").on("click", ".btn-editarcantidad", function () {
    var id = $(this).closest("tr").data("id");
    // Lógica para modificar el elemento con el ID especificado
    // Obtener los datos de la fila correspondiente
    var cantidad = fila.find("td:eq(3)").text(); // Ajusta el índice según la cantidad de columnas añadidas


    // Llenar el formulario de modificación dentro del popup
    $("#popupCantidad").html(`
    <div class="quantity-container">
        <div class="center">
            <div class="title">Modificar Producto</div>
                <form id="formulariomodificar" method="post">
                    <div class="user-details">
                    <input type="hidden" name="id" value="${id}"> <!-- Campo oculto para la ID -->
                    <div class="input-box">
                        <label for="details">Cantidad: </label>
                        <input type="text" class="form-control" name="cantidad" placeholder="Introduzca la cantidad" value="${cantidad}">
                    </div>
                    <br>
                    <div class="btn">
                        <button id="btnSubmit2" type="button" class="modify">Modificar</button>
                        <button type="button" class="cancel" onclick="closeForm()">Cerrar</button>
                    </div>
                </form>
        </div>
        </button>
        </div>`
    );

    // Mostrar el popup de modificación
    $("#popupCantidad").show();
    // Agregar el evento al botón "Modificar" después de generarlo


});
// Controlador de eventos para el clic en el botón "Modificar" dentro del popup
$("#popupCantidad").on("click", "#btnSubmit2", function () {
    // Obtener el formulario de modificación y los datos del mismo
    var form = $("#formulariomodificar");
    var formData = form.serialize(); // Serializar el formulario para enviarlo con la solicitud AJAX

    // Crear una nueva solicitud AJAX para enviar los datos del formulario al servidor
    $.ajax({
        url: "../php/modificar.php",
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