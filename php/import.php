<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//Primero verificamos si es tipo POST y si se ha enviado un archivo
if ($_SERVER["REQUEST_METHOD"] != "POST" || !isset($_FILES['file'])) {
    //En caso de que no sea tipo POST o no se ha enviado ningún archivo, mostrará el mensaje de error.
    die("Error: Método de solicitud no válido o archivo no enviado.");
}

//Se puede verificar si ha habido algún error subiendo el archivo
if ($_FILES['file']['error'] != UPLOAD_ERR_OK) {
    //En caso de que haya error, mostrará el mensaje de error.
    die("Error al subir el archivo.");
}

//puedes verificar que el archivo es tipo CSV
$mime_type = mime_content_type($_FILES['file']['tmp_name']);
if ($mime_type != 'text/csv' && $mime_type != 'text/plain') {
    //Si el archivo no es de tipo CSV, mostrará un mensaje de error.
    die("Error: El archivo no es un archivo CSV válido.");
}

//Nos conectamos a la base de datos
$servername = "localhost"; //Dirección del servidor de la BBDD
$username = "root"; //Nombre de usuario para acceder a la BBDD
$password = "1234"; //Contraseña para acceder a la BBDD
$database = "epmtic_bdd"; //Nombre de la BBDD

//Establecemos la conexión
$conn = new mysqli($servername, $username, $password, $database);

//Podemos verificar si nos hemos conectado correctamente o ha habido errores
if ($conn->connect_error) {
    //Si no se puede establecer conexión con la BBDD, muestrará un mensaje de erroe.
    die("Error de conexión: " . $conn->connect_error);
}

// Se lee el archivo CSV y procesa los datos
$csvFile = $_FILES['file']['tmp_name']; // Utilizamos una ruta temporal para el archivo CSV
$handle = fopen($csvFile, 'r'); // Y abrimos el archivo en modo lectura

// Verificamos si se ha podido abrir el CSV
if ($handle === false) {
    // En el caso de que no se haya podido abrir, mostrará un mensaje de error.
    die("Error al abrir el archivo CSV.");
}

// Saltamos la primera fila que contiene los encabezados
fgetcsv($handle);

// Iniciamos una transacción para garantizar la integridad de los datos
$conn->begin_transaction();

// Utilizamos la consulta SQL para insertar datos en la BBDD
$insertQuery = "INSERT INTO inventario (Nombre, descripcion, cantidad, fabricante, estado, Stock, Valor, Grupo, Subgrupo, dueno, LugarEspacio, LugarArmario, LugarCaja) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($insertQuery);

// Verificamos si la consulta está bien
if (!$stmt) {
    // Si no se pudo preparar la consulta, muestrará un mensaje de error.
    die("Error al preparar la consulta: " . $conn->error);
}

// Vinculamos los parámetros de la consulta preparada
$stmt->bind_param('ssissssssssss', $Nombre, $Descripcion, $Cantidad, $Fabricante, $Estado, $Stock, $Valor, $Grupo, $SubGrupo, $Dueno, $Espacio, $Armario, $Caja);

// Leemos los datos del archivo CSV y los insertamos en la BBDD
while (($data = fgetcsv($handle)) !== false) {
    // Asignamos los valores de cada fila del CSV a las variables
    list($Nombre, $Descripcion, $Cantidad, $Fabricante, $Estado, $Stock, $Valor, $Grupo, $SubGrupo, $Dueno, $Espacio, $Armario, $Caja) = $data;

    // Ejecutamos la consulta preparada para insertar los datos en la BBDD
    if (!$stmt->execute()) {
        // Si hay un error al insertar los datos se cancela la transacción y mostrará un mensaje de error.
        $conn->rollback();
        die("Error al insertar datos: " . $stmt->error);
    }
}

// Confirmamos permanentemente la transacción si todo fue exitoso
$conn->commit();

// Cerramos el archivo CSV y la conexión a la BBDD
fclose($handle);
$stmt->close();
$conn->close();

// Mostramos un mensaje de éxito si los datos se importaron correctamente
echo "Datos importados correctamente.";

// Detenemos la ejecución del script
exit();
?>
