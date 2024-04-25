<?php
// Configuración de errores
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

// Verificar si se han enviado datos mediante el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener la ID del formulario
    $id = $_POST["id"];

    // Configuración de la base de datos
    $servername = "localhost";
    $username = "root";
    $password = "1234";
    $database = "epmtic_bdd";

    // Crear conexión
    $conn = new mysqli($servername, $username, $password, $database);

    // Verificar la conexión
    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }

    // Preparar la consulta SQL para actualizar el campo 'borrado' a true
    $sql = "UPDATE inventario SET borrado = true WHERE ID = '$id'";

    // Ejecutar la consulta SQL
    if ($conn->query($sql) === TRUE) {
        echo "Registro borrado correctamente.";
    } else {
        echo "Error al marcar el registro como borrado: " . $conn->error;
    }

    // Cerrar conexión
    $conn->close();
}
?>
