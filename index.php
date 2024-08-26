<?php
session_start(); // starts the session

require "connection.php"; // includes the database connection

if(isset($_SESSION['userID'])) // checks if the userID session variable is set
{
    
    $id = $_SESSION['userID']; // copies userID session variable to id

    $query = "SELECT * FROM Users WHERE UserID = '$id'";
    $result = mysqli_query($connection,$query);

    if($result && mysqli_num_rows($result) > 0) // checks if a user exists with this UserID
    {
        $userdata = mysqli_fetch_assoc($result); // stores the row in array form
    }
}else{
    header("location: login.php"); // redirects to login page
    die;
}

?>

