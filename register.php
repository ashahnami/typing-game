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
    <link rel="stylesheet" href="styles.css"> <!-- link stylesheet -->
</head>
<body>

    <h1 style="position:relative; bottom: 7rem; left: 10rem;">Register</h1>
    <div class="container2">
        <form method="post"> 

            <!-- first name field  -->
            <input type="text" name="fname" placeholder="First name" pattern="[A-Za-z]{1,20}" 
                title="First name must be at least 1 character long and only consist of letters" required>

            <!-- username field -->
            <input type="text" name="username" placeholder="Username" pattern="[A-Za-z0-9]{5,25}" 
                title="Username must contain be at least 5 characters long without any spaces" required>

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
