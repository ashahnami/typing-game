<?php
session_start(); // starts a session
    
require "connection.php"; // includes the connection details

if($_SERVER['REQUEST_METHOD']=="POST") // checks whether something has been posted
{

    // retrieves the posted variables
    $fname = $_POST['fname'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    // checks if username is taken
    $s = "SELECT * FROM users WHERE UserName = '$username'";
    $result = mysqli_query($connection, $s);
    $num_of_rows = mysqli_num_rows($result);

    if($num_of_rows>0){
        echo "Username already taken. Please retry";
    }else{
        $password_hash = hash('sha256',$password); // hashes the password
        
        $register = "INSERT INTO users(FirstName,UserName,PasswordHash) VALUES('$fname','$username','$password_hash')";

        mysqli_query($connection,$register); // executes the above query 

        header("location: login.php"); // redirects to login page
        die;
        
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Register</title>

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
        <form method="post"> 

            <!-- first name field  -->
            <input type="text" name="fname" placeholder="First name" pattern="[A-Za-z]{1,20}" 
                title="First name must be at least 1 character long and only consist of letters" required>

            <!-- username field -->
            <input type="text" name="username" placeholder="Username" minLength='5' maxLength='20' required>

            <!-- password field -->
            <input type="password" name="password" placeholder="Password" pattern="(?=.*[a-z])(?=.*[A-Z]).{7,64}" 
                title="Password must contain be at least 7 characters long and one uppercase and lower letter" required>
            
                
            <input type="submit" value="Register"> <!-- creates submit button -->
        </form>
        <a href="login.php">Already have an account? Sign in here</a>
    </div>
</body>
</html>








<!--  

first name field with mininum length of 1 character and max. length 20
<input type="text" name="fname" placeholder="First name" id="fname" minLength="1" maxlength="20" required>

username field with min length of 5 and max length of 20
<input type="text" name="username" placeholder="Username" minLength="5" maxLength="20" required title="Username must be at least 5 characters long">

password field with several validation checks
<input type="password" name="password" placeholder="Password" pattern="(?=.*[a-z])(?=.*[A-Z]).{7,64}" 
    title="Password must contain be at least 7 characters long and one uppercase and lower letter" required>
 -->
