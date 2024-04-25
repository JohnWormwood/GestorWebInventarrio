<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/login.css">
    <script src="https://kit.fontawesome.com/488ca7d98c.js" crossorigin="anonymous"></script>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <title>Iniciar sesión</title>
</head>
<header>
    <nav>
        <img src="./img/logo.png" alt="Logo de Mi Empresa">
    </nav>
<body>
    <div class="contenido">
        <form id="formulario" action="./php/login.php" method="POST" class="form-box">
            <h1>Login</h1>
            
            <p name="form_error"></p>
            <div class="input-box">
                <input type="text" placeholder="Usuario" name="username" required>
                <i class='bx bxs-user'></i>
            </div>

            <div class="input-box">
                <input type="password" placeholder="Contraseña" name="password" required>
                <i class='bx bx-lock'></i>
            </div>

            <div class="remember-password">
                <label><input type="checkbox"> Recuérdame </label>
            </div>

            <button type="submit" class="btningresar">Inciar Sesión</button>
    </div>

</body>
</html>