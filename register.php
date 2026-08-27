<?php
require "config.php";

session_start();

// Authentication Validator
// If user is logged in, redirect to index, else proceed
if(isset($_SESSION['current_user'])) {
    header("Location: index.php");
    exit;
}

// Handle POST Request
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $cpassword = $_POST['cpassword'];
    
    if(empty($username) || empty($password) || empty($cpassword)) {
        $_SESSION['error'] = "All fields must be filled up!";
    }
    elseif(strlen($username) < 3) {
        $_SESSION['error'] = "Username must be more than 3!";
    }
    elseif($password != $cpassword) {
        $_SESSION['error'] = "Password and Confirm Password does not match!";
    }
    else {
        $hasCaps = false;
        $hasSpChar = false;
        $hasNum = false;
        foreach(str_split($password) as $char) {
            // Password123!
            // pass

            // Must have 1 capitalized letter
            // Must have 1 special character
            // Must have 1 digit
            if(ctype_upper($char)) {
                $hasCaps = true;
            }
            if(!ctype_alnum($char)) {
                $hasSpChar = true;
            }
            if(ctype_digit($char)) {
                $hasNum = true;
            }
        }

        // if(!$hasCaps || !$hasSpChar || !$hasNum) {
        //     $_SESSION['error'] = "Password must have 1 Capitalized Letter, 1 Special Character, and 1 Digit!";
        // }
        if(!$hasCaps) {
            $_SESSION['error'] = "Password must have 1 capitalized letter";
        }
        elseif(!$hasSpChar) {
            $_SESSION['error'] = "Password must have 1 special character";
        }
        elseif(!$hasNum) {
            $_SESSION['error'] = "Password must have 1 digit";
        }
        else {
            // Check if the username exists.
            $stmt = mysqli_prepare($conn, "SELECT id FROM users WHERE username = ?");
            mysqli_stmt_bind_param($stmt, "s", $username);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);

            if(mysqli_stmt_num_rows($stmt) > 0) {
                $_SESSION['error'] = "{$username} already exists!";
            }
            else {
                // Encrypts the given password (hash)
                $hashed = password_hash($password, PASSWORD_DEFAULT);

                $insert = mysqli_prepare($conn, "INSERT INTO users (username, password) VALUES (?, ?)");
                mysqli_stmt_bind_param($insert, "ss", $username, $hashed);

                if(mysqli_stmt_execute($insert)) {
                    // Create user upon successful form fill up.
                    $_SESSION['current_user'] = $username;

                    // Clean previous error.
                    unset($_SESSION['error']);
                    
                    header('Location: index.php');
                    exit;
                }
                else {
                    $_SESSION['error'] = "Something went wrong. Please try again!";
                }
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="css/register.css">
</head>
<body>
    <main>
        <h2>Welcome New User!</h2>

        <?php if(isset($_SESSION['error'])): ?>
            <div>
                <p class="error-msg"><?= htmlspecialchars($_SESSION['error']) ?></p>
            </div>
        <?php endif; ?>

        <?php if(isset($_SESSION['current_user'])): ?>
            <div>
                <p class="error-msg"><?= htmlspecialchars($_SESSION['current_user']) ?></p>
            </div>
        <?php endif; ?>

        <form action="register.php" method="POST">
            <div>
                <label for="username">Username</label>
                <input type="text" name="username" id="username" required>
            </div>

            <div>
                <label for="password">Password</label>
                <input type="password" name="password" class="password" id="password" required>
                <button type="button" data-target="password" class="show-button">S</button>
            </div>

            <div>
                <label for="cpassword">Confirm Password</label>
                <input type="password" name="cpassword" class="password" id="cpassword" required>
                <button type="button" data-target="cpassword" class="show-button">S</button>
            </div>

            <div>
                <p>Already have an account? <a href="login.php">Login</a> </p>
                <button type="submit">Register</button>
            </div>
        </form>
    </main>

    <script>
        const showBtns = document.querySelectorAll(".show-button")
        // Collection of nodes (Collection of elements)
        // const showBtns = ["password-btn", "cpassword-btn"]

        showBtns.forEach(button => {
            button.addEventListener('click', () => {
                const targetInput = button.getAttribute('data-target')
                const input = document.getElementById(targetInput)

                if(input.getAttribute('type') === 'password') {
                    input.setAttribute('type', 'text')
                    button.innerText = 'H'
                } else {
                    input.setAttribute('type', 'password')
                    button.innerText = 'S'
                }
            })
        });
    </script>
</body>
</html>