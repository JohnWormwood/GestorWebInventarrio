<?php
// Obtener el valor de búsqueda y los valores de los checkbox enviados desde el cliente
$busqueda = $_POST["busqueda"];
$valoresCheckbox = explode(",", $_POST["valoresCheckbox"]);

// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "1234";
$database = "epmtic_bdd";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Construir la parte de la consulta SQL para seleccionar los valores de las columnas
$selectColumns = implode(",", $valoresCheckbox);

// Consulta SQL con filtro de búsqueda y de valores de checkbox
$sql = "SELECT * FROM `inventario` WHERE CONCAT($selectColumns) LIKE '%$busqueda%' AND borrado = false";

// Ejecutar consulta
$result = $conn->query($sql);

// Verificar si se obtuvieron resultados
if ($result->num_rows > 0) {
    $data = array();
    // Iterar sobre cada fila de resultados
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    // Codificar los datos en formato JSON y enviarlos al cliente
    echo json_encode($data);
} else {
    // Si no se encontraron resultados, enviar un mensaje al cliente
    echo json_encode(array());
}

// Cerrar conexión
$conn->close();
// Obtener el valor de búsqueda y los valores de los checkbox enviados desde el cliente
?>
