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