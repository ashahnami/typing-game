<?php

session_start(); // starts the session

if(isset($_SESSION['userId'])) // checks whether session variable is  set
{
	unset($_SESSION['userId']); // unsets the session variable

}

header("Location: login.php"); // redirects to login page
die;

?>
