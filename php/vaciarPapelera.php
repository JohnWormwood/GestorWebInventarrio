<?php
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

// Consulta SQL
$sql = "DELETE FROM `inventario` WHERE `borrado` = true;";

// Ejecutar consulta
if ($conn->query($sql) === TRUE) {
    // Obtener la cantidad de elementos borrados correctamente
    $cantidad_borrada = $conn->affected_rows;
    echo "Se han borrado " . $cantidad_borrada . " elementos correctamente.";
} else {
    echo "Error al ejecutar la consulta: " . $conn->error;
}

// Cerrar conexión
$conn->close();
?>

