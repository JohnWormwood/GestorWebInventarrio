<?php
ini_set('display_startup_errors',1); 
ini_set('display_errors',1);
error_reporting(E_ALL);

$error = '';
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $username = $_POST['username'];
    $password = $_POST['password'];
    $root = "admin";

    // DATABASE CONNECTION

    $host = "localhost";
    $dbusername = "root";
    $dbpassword = "1234";
    $dbname = "epmtic_bdd";

    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    if(!$conn){
        die("Connection failed: ". mysqli_connect_error());
    }

    //VALIDATE LOGIN CONNECTION
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE Usuarios=? AND Password=?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if($result->num_rows == 1){
        //LOGIN SUCCESS
        if($username == $root){
            header("Location: ../adminhome.html");
            exit();
        } 
        
        else {
            header("Location: ../home.html");
            exit();
        }
    }
        //LOGIN FAILED
    else {
        
        header("Location: ../index.html?form_error=Usuario o contraseña incorrectos");
        exit();
    }

$conn->close();
}
?>
