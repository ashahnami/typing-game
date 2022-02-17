<?php

$wpm = $_POST['wpm']; // retrieves the latest achieved typing speed

session_start(); // starts the user's session

require "connection.php"; // includes the database connection

if(isset($_SESSION['userID'])) // checks if the userID session variable is set
{
    $id = $_SESSION['userID']; // copies userID session variable to id

    $date = date("d-M-y"); // gets current date

    $insert_query = "INSERT INTO tests(Date_d,Score,UserID) VALUES('$date','$wpm','$id')"; // query to insert into table
    mysqli_query($connection,$insert_query); // executes the above query

    $query = "SELECT * FROM Users WHERE UserID = '$id'"; // query to retrieve the user's row from the database
    $result = mysqli_query($connection,$query); // executes the above query
    $highscore = mysqli_fetch_assoc($result)['HighScore']; // holds the user's previous highscore

    if($wpm > $highscore)
        $update_query = "UPDATE Users SET HighScore='$wpm' WHERE UserID = '$id'"; // replaces the user's previous highscore with their new score
        mysqli_query($connection, $update_query); // executes the above query

}else{
    header("location: login.php"); // redirects to login page
    die;
}

?>


