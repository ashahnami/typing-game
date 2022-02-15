<?php

session_start(); // starts the session

require "connection.php"; // includes the database connection

if($_SERVER['REQUEST_METHOD'] == "POST") // checks if something has been posted
{
    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = "SELECT * FROM Users WHERE UserName = '$username'"; // selects the rows with same username
    $result = mysqli_query($connection,$query); // executes the above query
    
    if($result && mysqli_num_rows($result) > 0) // checks whether username exists
    {
        $hashed_password = hash('sha256',$password); // hashes the entered password

        $userdata = mysqli_fetch_assoc($result); // holds the row in an array form


        if($userdata['PasswordHash'] === $hashed_password) // compares entered password with password in database
        {
            $_SESSION['userID'] = $userdata['UserID']; // sets the session variable which is unique to the user
            header("Location: index.php"); // redirects to homepage
            die;
        }

    }else{
        echo "Incorrect login details";
    }

}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Log in</title>
    <link rel="stylesheet" href="styles.css"> <!-- link stylesheet -->
</head>
<body>
    <div class="container2">
        <form method="post"> <!-- creates login form -->

            <input type="text" name="username" placeholder="Username"> <!-- creates username entry box -->
            <input type="password" name="password" placeholder="Password"> <!-- creates password entry box -->
            <input type="submit" value="Log in"> <!-- creates submit button -->

        </form>

        <a href="register.php">No account? Register here</a>

    </div>
</body>
</html>



