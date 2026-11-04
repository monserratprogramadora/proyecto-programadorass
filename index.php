<?php
$conexion = new mysqli("localhost", "root", "", "programadorass");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$mensaje = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $apellidos = $_POST["apellidos"];

    $sql = "INSERT INTO integrantes (nombre, apellidos) VALUES (?, ?)";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("ss", $nombre, $apellidos);

    if ($stmt->execute()) {
        $mensaje = "¡Registro guardado correctamente!";
    } else {
        $mensaje = "Error al guardar: " . $stmt->error;
    }

    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registro de integrantes</title>
</head>
<body>

    <h1>Registro de integrantes</h1>

    <p><?php echo htmlspecialchars($mensaje); ?></p>

    <form method="POST">
        <label>Nombre:</label>
        <input type="text" name="nombre" required>
        <br><br>

        <label>Apellidos:</label>
        <input type="text" name="apellidos" required>
        <br><br>

        <button type="submit">Guardar información</button>
    </form>

</body>
</html>