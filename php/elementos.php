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
$sql = "SELECT * FROM `inventario` WHERE `borrado` = false;";

// Ejecutar consulta
$result = $conn->query($sql);

// Verificar si se obtuvieron resultados
if ($result->num_rows > 0) {
    $data = array();
    // Iterar sobre cada fila de resultados
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    // Codificar los datos en formato JSON
    echo json_encode($data);
} else {
    echo json_encode(array("message" => "No se encontraron resultados."));
}

// Cerrar conexión
$conn->close();
?>

