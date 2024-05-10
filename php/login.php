<?php
session_start();
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(E_ALL);

$error = '';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // DATABASE CONNECTION
    $host = "localhost";
    $dbusername = "root";
    $dbpassword = "1234";
    $dbname = "epmtic_bdd";

    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    // Verificar la conexión a la base de datos
    if ($conn->connect_error) {
        $error = "Error de conexión a la base de datos: " . $conn->connect_error;
    } else {
        //VALIDATE LOGIN CONNECTION
        $stmt = $conn->prepare("SELECT Password FROM usuarios WHERE Usuarios=?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows == 1) {
            $stmt->bind_result($stored_password);
            $stmt->fetch();

            // Verificar la contraseña
            if ($password === $stored_password) {
                // La contraseña es correcta, iniciar sesión
                $_SESSION['username'] = $username;
                echo "Inicio de sesión exitoso";
                exit();
            } else {
                $error = "Contraseña incorrecta";
            }
        } else {
            $error = "Usuario no encontrado";
        }

        $stmt->close();
    }

    $conn->close();
}


// Enviar el mensaje de error solo si hubo un error de inicio de sesión
if (!empty($error)) {
    echo $error;
}

?>