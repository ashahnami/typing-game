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

        $sql = "UPDATE Users SET HighScore='$wpm' WHERE UserID = '$id'"; // replaces the user's previous highscore with their new score
        mysqli_query($connection, $sql); // executes the above query

    };

}else{
    header("location: login.php"); // redirects to login page
    die;
}


