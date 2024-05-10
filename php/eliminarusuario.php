<?php
// Activar la visualización de errores para depuración
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Verificar si se han enviado datos mediante el método POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar si se ha enviado el ID del usuario a borrar
    if (isset($_POST['id'])) {
        // Obtener el ID del usuario a borrar desde la solicitud POST
        $id = $_POST['id'];

        // Configurar la conexión a la base de datos (ajusta las credenciales según tu configuración)
        $servername = "localhost";
        $username = "root";
        $password = "1234";
        $database = "epmtic_bdd";

        // Crear conexión a la base de datos
        $conn = new mysqli($servername, $username, $password, $database);

        // Verificar la conexión
        if ($conn->connect_error) {
            die("Error de conexión: " . $conn->connect_error);
        }

        // Construir la consulta SQL para borrar el usuario con el ID proporcionado
        $sql = "DELETE FROM usuarios WHERE id = $id";

        // Ejecutar la consulta SQL
        if ($conn->query($sql) === TRUE) {
            echo "Usuario eliminado correctamente.";
        } else {
            echo "Error al intentar eliminar el usuario: " . $conn->error;
        }

        // Cerrar la conexión a la base de datos
        $conn->close();
    } else {
        // Si no se proporcionó un ID de usuario, mostrar un mensaje de error
        echo "Error: No se proporcionó un ID de usuario.";
    }
}
?>
