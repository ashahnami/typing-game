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

    <style>

        *{
            margin: 0;
            box-sizing: border-box;
            font-family: JetBrains Mono; /* sets page font */
        }

        body{
            display: flex;
            align-items: center; /* aligns items towards the center */
            justify-content: center;
            background-color: #D3D3D3; /* sets background colour */
            min-height: 80vh;
        }

        .container{
            background-color: #FFFFFF; /* sets background colour of box */
            padding: 2rem; /* creates padding around box */
            border-radius: 0.3rem; /* curves edges of box */
            width: 400px; /* sets box width */
            max-width: 90%; /* sets maximum width of box */
            box-shadow: 0 10px 20px rgba(0,0,0,.13); /* creates shadow around box */
        }

        a{
            font-size:14px; /* sets hyperlink font size */
        }

    </style>

</head>
<body>
    <div class="container">
        <form method="post"> <!-- creates login form -->

            <input type="text" name="username" placeholder="Username"> <!-- creates username entry box -->
            <input type="password" name="password" placeholder="Password"> <!-- creates password entry box -->
            <input type="submit" value="Log in"> <!-- creates submit button -->

        </form>

        <a href="register.php">No account? Register here</a>

    </div>
</body>
</html>



