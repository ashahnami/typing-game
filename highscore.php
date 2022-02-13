<?php

session_start(); // starts the user's session

require "connection.php"; // includes the database connection

$wpm = $_POST['wpm']; // retrieves the latest achieved typing speed

if(isset($_SESSION['userID'])) // checks if the userID session variable is set
{

    $id = $_SESSION['userID']; // copies userID session variable to id

    $query = "SELECT * FROM Users WHERE UserID = '$id'"; // query to retrieve the user's row from the database
    $result = mysqli_query($connection,$query); // executes the above query
    $highscore = mysqli_fetch_assoc($result); // stores the row in array form

    if($wpm > $highscore){
        // replace database highscore with current one
    };

}else{
    header("location: login.php"); // redirects to login page
    die;
}


