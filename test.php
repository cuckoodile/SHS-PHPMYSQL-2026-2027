<?php
require 'config.php';

$error = "";

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? "";
    $password = $_POST['password'] ?? "";

    if(isset($_POST['logout']) && isset($_SESSION['current_user'])) {
        unset($_SESSION['current_user']);
    }
    elseif(empty($username) || empty($password)) {
        $error = "Fields cannot be empty!";
    } 
    else {
        $stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE username = ?");
        mysqli_stmt_bind_param($stmt, "s", $username);
        mysqli_stmt_execute($stmt);

        $result = mysqli_stmt_get_result($stmt);
        $user = mysqli_fetch_assoc($result);
        mysqli_stmt_close($stmt);

        if($user && password_verify($password, $user['password'])) {
            $_SESSION['current_user'] = $user;
        } else {
            $error = "Invalid username or password!";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <main>
        <?php if ($error): ?>
            <h1><?= htmlspecialchars($error) ?></h1>
        <?php else: ?>
            <h1>Welcome!
                <?php if (isset($_SESSION['current_user'])): ?>
                    <span><?= htmlspecialchars($_SESSION['current_user']['username']) ?></span>
                <?php endif; ?>
            </h1>
        <?php endif; ?>

        <?php if (isset($_SESSION['current_user'])): ?>
            <pre><?php print_r($_SESSION['current_user']); ?></pre>
        <?php endif; ?>

        <form action="test.php" method="POST">
            <div>
                <label for="username">Username</label>
                <input type="text" name="username" id="username">
            </div>
            
            <div>
                <label for="password">Password</label>
                <input type="password" name="password" id="password">
            </div>

            <div>
                <button type="submit">Login</button>
                <?php if(isset($_SESSION['current_user'])): ?>
                    <button type="submit" name="logout" value="1" onclick="return confirm('Are you sure you want to logout?')">Logout</button>
                <?php endif; ?>
            </div>
        </form>
    </main>
</body>
</html>