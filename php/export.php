<?php
// Conecta a la base de datos (reemplaza con tus credenciales)
$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "epmtic_bdd";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}

// Consulta SQL para seleccionar los datos que deseas exportar (reemplaza con tu consulta)
$sql = "SELECT * FROM `inventario`";
$result = $conn->query($sql);

// Nombre del archivo CSV y cabeceras
$filename = 'datos.csv';
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="' . $filename . '"');

// Abre el archivo CSV para escritura
$output = fopen('php://output', 'w');

// Escribe las cabeceras del CSV
fputcsv($output, array('ID', 'Descripción', 'Cantidad', 'Fabricante', 'Estado', 'Stock', 'Valor', 'Grupo', 'SubGrupo', 'Dueño', 'Espacio', 'Armario', 'Caja')); // Reemplaza con los nombres de las columnas

// Escribe los datos del resultado de la consulta en el archivo CSV
while ($row = $result->fetch_assoc()) {
  fputcsv($output, $row);
}

// Cierra la conexión y el archivo CSV
fclose($output);
$conn->close();

error_reporting(E_ALL);
ini_set('display_errors', '1');
?>