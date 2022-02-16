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

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Typing Test</title> <!-- Sets text shown in the browser's title bar -->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script> 

    <link rel="stylesheet" href="styles.css"> <!-- links external style sheet file -->
    <script src="script.js" defer></script> <!-- links external script file -->

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet">

</head>
<body>

    <div class="navbar">
        <a href="signout.php"><button class="signout">Sign out</button></a> <!-- creates sign out button -->
    </div>

    <div class="parent">
        <h1>Welcome <?php echo $userdata['FirstName'];?>!</h1>
        <h2>Highscore: <?php echo $userdata['HighScore'];?></h2>

        <div class="timer" id="timer">15</div> <!-- creates timer element -->
        <div class="wpm" id="wpm"></div> <!-- creates typing speed element -->

        <div class="container">
            <div class="showQuote" id="showQuote"></div> <!-- creates element which displays the quote -->
            <textarea class="inputQuote" id="inputQuote"></textarea> <!-- creates area where quote can be typed out -->
        </div>


        <a href="leaderboard.php"><img src="leaderboard-icon.png" style="width:40px;padding-top:10px"></a>

    </div>

    

</body>
</html>







