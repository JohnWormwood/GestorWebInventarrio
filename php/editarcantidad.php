<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Verificar si se han enviado datos mediante el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los valores del formulario
    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $usuario = $_POST["usuario"];
    $cantidadAnterior = $_POST["cantidadAnterior"];
    $cantidad = $_POST["cantidad"];
    $justificacion = $_POST["justificacion"];
    $fecha = date("Y-m-d"); // Obtener la fecha actual en formato YYYY-MM-DD

    // Configuración de la base de datos
    $servername = "localhost"; // Cambiar si tu servidor de base de datos está en otro lugar
    $username = "root"; // Cambiar al nombre de usuario de tu base de datos
    $password = "1234"; // Cambiar a la contraseña de tu base de datos
    $database = "epmtic_bdd"; // Cambiar al nombre de tu base de datos

    // Crear conexión
    $conn = new mysqli($servername, $username, $password, $database);

    // Verificar la conexión
    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }

    // Preparar la consulta SQL para actualizar el elemento
    $sqlUpdate = "UPDATE inventario SET cantidad ='$cantidad' WHERE ID='$id'";

    // Ejecutar la consulta SQL para actualizar el elemento
    if ($conn->query($sqlUpdate) === TRUE) {
        echo "Elemento actualizado correctamente.";
    } else {
        echo "Error al actualizar el elemento: " . $conn->error;
    }

    // Preparar la consulta SQL para insertar en la tabla historial
    $sqlInsert = "INSERT INTO historial (usuario, justificacion, nombre_producto, cantidad_anterior, cantidad_modificada, fecha) VALUES ('$usuario', '$justificacion', '$nombre', '$cantidadAnterior', '$cantidad', '$fecha')";

    // Ejecutar la consulta SQL para insertar en la tabla historial
    if ($conn->query($sqlInsert) === TRUE) {
        echo "Datos insertados en la tabla historial correctamente.";
    } else {
        echo "Error al insertar datos en la tabla historial: " . $conn->error;
    }

    // Cerrar conexión
    $conn->close();
}
?>
