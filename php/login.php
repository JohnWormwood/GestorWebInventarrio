<?php
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(E_ALL);

$error = '';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // CONEXIÓN A LA BASE DE DATOS

    $host = "localhost";
    $dbusername = "root";
    $dbpassword = "1234";
    $dbname = "epmtic_bdd";

    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    if (!$conn) {
        die("Error de conexión: " . mysqli_connect_error());
    }

    // VALIDAR LA CONEXIÓN PARA EL INICIO DE SESIÓN
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE Usuario=?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $usuario = $result->fetch_assoc();
        if (password_verify($password, $usuario['Password'])) {
            // INICIO DE SESIÓN EXITOSO
            session_start();
            $_SESSION['username'] = $username;
            header("Location: ../index.html");
            exit();
        } else {
            // INICIO DE SESIÓN FALLIDO - Contraseña incorrecta
            header("Location: ../login.html?form_error=Contraseña incorrecta");
            exit();
        }
    } else {
        // INICIO DE SESIÓN FALLIDO - Usuario no encontrado
        header("Location: ../login.html?form_error=Usuario no encontrado");
        exit();
    }

    $conn->close();
}
?>
