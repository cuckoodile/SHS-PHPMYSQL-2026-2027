<?php
session_start();

if(!isset($_SESSION['current_user'])) {
    header("Location: login.php");
    exit;
}

if($_SERVER['REQUEST_METHOD'] == "POST") {
    if(isset($_POST['logout'])) {
        unset($_SESSION['current_user']);
        header("Location: login.php");
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Homepage</title>
    <link rel="stylesheet" href="css/index.css">
</head>
<body>
    <p>Hello <?php echo $_SESSION['current_user']; ?></p>

    <form action="index.php" method="POST">
        <button type="submit" name="logout" value="1">Logout</button>
    </form>
</body>
</html>