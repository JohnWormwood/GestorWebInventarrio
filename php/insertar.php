<?php
//echo "Archivo PHP ejecutado correctamente.";
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// Verificar si se han enviado datos mediante el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los valores del formulario
    $nombreProducto = $_POST["nombre"];
    $descripcion = $_POST["descripcion"];
    $cantidad = $_POST["cantidad"];
    $fabricante = $_POST["fabricante"];
    $estado = $_POST["estado"];
    $stock = $_POST["stock"];
    $valor = $_POST["valor"];
    $grupo = $_POST["grupo"];
    $subgrupo = $_POST["subgrupo"];
    $dueno = $_POST["dueno"];
    $espacio = $_POST["espacio"];
    $armario = $_POST["armario"];
    $caja = $_POST["caja"];

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

    // Preparar la consulta SQL para insertar un nuevo elemento
    $sql = "INSERT INTO inventario (Nombre, descripcion, cantidad, fabricante, estado, Stock, Valor, Grupo, Subgrupo, dueno, LugarEspacio, LugarArmario, LugarCaja) 
    VALUES ('$nombreProducto', '$descripcion', '$cantidad', '$fabricante', '$estado', '$stock', '$valor', '$grupo', '$subgrupo', '$dueno', '$espacio', '$armario', '$caja')";

    // Ejecutar la consulta SQL
    if ($conn->query($sql) === TRUE) {
        echo "Nuevo elemento agregado correctamente.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Cerrar conexión
    $conn->close();
}


?>
