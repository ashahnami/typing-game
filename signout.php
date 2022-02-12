<?php

session_start(); // starts the session

if(isset($_SESSION['userID'])) // checks whether session variable is  set
{
	unset($_SESSION['userID']); // unsets the session variable

}

header("Location: login.php"); // redirects to login page
die;

?>


