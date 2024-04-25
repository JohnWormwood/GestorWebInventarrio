<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Verificar si se han enviado datos mediante el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los valores del formulario
    $id = $_POST["id"];
    $nombre = $_POST["nombre"]; // Agregar la obtención del nombre
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

    // Preparar la consulta SQL para actualizar el elemento
    $sql = "UPDATE inventario SET nombre='$nombre', descripcion='$descripcion', cantidad='$cantidad', fabricante='$fabricante', estado='$estado', Stock='$stock', Valor='$valor', Grupo='$grupo', Subgrupo='$subgrupo', dueno='$dueno', LugarEspacio='$espacio', LugarArmario='$armario', LugarCaja='$caja' WHERE ID='$id'";

    // Ejecutar la consulta SQL
    if ($conn->query($sql) === TRUE) {
        echo "Elemento actualizado correctamente.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Cerrar conexión
    $conn->close();
}
?>