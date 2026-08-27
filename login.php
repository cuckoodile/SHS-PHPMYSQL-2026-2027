<?php
require "config.php";

session_start();

if(isset($_SESSION['current_user'])) {
    header("Location: index.php");
    exit;
}

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        if(isset($_POST['logout'])) {
            // unset removes the given paramerter value.
            unset($_SESSION['current_user']);

            $_SESSION['error'] = "Logout successful";
            header("Location: login.php");
            exit;
        }

        $username = $_POST['username'];
        $password = $_POST['password'];

        if(empty($username) || empty($password)) {
            $_SESSION['error'] = "Fields cannot be empty!";
        }
        elseif(strlen($username) <= 3) {
            $_SESSION['error'] = "Username must be more than 3!";
        }
        // elseif($username != $uname || $password != $pass) {
        //     $_SESSION['error'] = "Given credential does not exist!";
        // }
        else {
            $stmt = mysqli_prepare($conn, "SELECT id, username, password FROM users WHERE username = ?");
            mysqli_stmt_bind_param($stmt, "s", $username);
            mysqli_stmt_execute($stmt);

            $result = mysqli_stmt_get_result($stmt);
            $user = mysqli_fetch_assoc($result);
            mysqli_stmt_close($stmt);

            if($user && password_verify($password, $user['password'])) {
                $_SESSION['current_user'] = $user['username'];
                $_SESSION['user_id'] = $user['id'];

                unset($_SESSION['error']);

                header('Location: index.php');
                exit;
            }
            else {
                $_SESSION['error'] = "Invalid Username or Password!";
            }
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="css/login.css">
</head>
<body>
    <main>
        <h1>Welcome Back User!</h1>

        <?php if(isset($_SESSION['error'])): ?>
            <div>
                <h4>
                    <center>
                        <?= 
                            htmlspecialchars($_SESSION['error']) 
                            // Converts the text to raw text.
                            // error = <p>Hello world!</p>
                        ?>
                    </center>
                </h4>
            </div>
        <?php endif; ?>

        <?php if(isset($_SESSION['current_user'])): ?>
            <div>
                <h4>
                    <center>
                        Hello
                        <?= 
                            htmlspecialchars($_SESSION['current_user']) 
                        ?>
                    </center>
                </h4>
            </div>
        <?php endif; ?>

        <form action="login.php" method="POST">
            <!-- action = Where would the form procedure goes? -->
            <!-- method = What is the form action? -->

            <!-- Username -->
            <?php if(!isset($_SESSION['current_user'])): ?>
                <div>
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" required>
                </div>

                <!-- Password -->
                <div>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" required>
                    <button type="button" id="password-btn" onclick="handleShowPassword()">S</button>
                </div>
            <?php endif; ?>

            <!-- Footer -->
            <div id="form-footer">
                <?php if(!isset($_SESSION['current_user'])): ?>
                    <p>Don't have an account yet? <a href="register.php">Register</a> </p>
                <?php endif; ?>

                <div id="footer-button">
                    <?php if(!isset($_SESSION['current_user'])): ?>
                        <button type="submit">Login</button>
                    <?php endif; ?>

                    <?php if(isset($_SESSION['current_user'])): ?>
                        <button type="submit" name="logout" value="1">Logout</button>
                    <?php endif; ?>
                </div>
            </div>
        </form>
    </main>

    <script>
        let passBtn = document.getElementById("password-btn");
        let passInp = document.getElementById("password");

        function handleShowPassword() {
            let type = passInp.getAttribute("type");

            if(type == "password") {
                passInp.setAttribute("type", "text")
            }
            // else if(type == "text") {
            else {
                passInp.setAttribute("type", "password")
            }

        }
    </script>
</body>
</html>