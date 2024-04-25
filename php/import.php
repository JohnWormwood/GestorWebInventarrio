<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES['file'])) {
    // Verifica si se ha enviado un archivo
    if ($_FILES['file']['error'] == UPLOAD_ERR_OK && is_uploaded_file($_FILES['file']['tmp_name'])) {
        // Conexión a la base de datos
        $servername = "localhost";
        $username = "root";
        $password = "1234";
        $database = "epmtic_bdd";

        $conn = new mysqli($servername, $username, $password, $database);

        // Verifica la conexión
        if ($conn->connect_error) {
            die("Error de conexión: " . $conn->connect_error);
        }

        // Lee el archivo CSV y procesa los datos
        $csvFile = $_FILES['file']['tmp_name'];
        $handle = fopen($csvFile, 'r');

        if ($handle !== false) {
            // Inicia una transacción
            $conn->begin_transaction();

            // Prepara la consulta para insertar datos
            $insertQuery = "INSERT INTO inventario (Nombre, Descripcion, Cantidad, Fabricante, Estado, Stock, Valor, Grupo, SubGrupo, Dueno, Espacio, Armario, Caja) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($insertQuery);

            // Verifica si la consulta se preparó correctamente
            if (!$stmt) {
                die("Error al preparar la consulta: " . $conn->error);
            }

            // Vincula los parámetros de la consulta
            $stmt->bind_param('ssissssssssss', $Nombre, $Descripcion, $Cantidad, $Fabricante, $Estado, $Stock, $Valor, $Grupo, $SubGrupo, $Dueno, $Espacio, $Armario, $Caja);

            // Lee los datos del archivo CSV e inserta en la base de datos
            while (($data = fgetcsv($handle)) !== false) {
                // Asigna los valores de cada fila del CSV a las variables
                list($Nombre, $Descripcion, $Cantidad, $Fabricante, $Estado, $Stock, $Valor, $Grupo, $SubGrupo, $Dueno, $Espacio, $Armario, $Caja) = $data;

                // Ejecuta la consulta preparada
                if (!$stmt->execute()) {
                    // Si ocurre un error, hace rollback y muestra un mensaje de error
                    $conn->rollback();
                    die("Error al insertar datos: " . $stmt->error);
                }
            }

            // Commit la transacción si todo fue exitoso
            $conn->commit();

            // Cierra el archivo y la conexión a la base de datos
            fclose($handle);
            $stmt->close();
            $conn->close();

            // Mensaje de éxito
            echo "Datos importados correctamente.";

            exit(); // Detiene la ejecución del script después de la importación
        } else {
            echo "Error al abrir el archivo CSV.";
        }
    } else {
        echo "Por favor, selecciona un archivo CSV válido.";
    }
} else {
    echo "Error: Método de solicitud no válido.";
}
?>
