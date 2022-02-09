<?php

// establishes connection to database
$connection = mysqli_connect("eu-cdbr-west-02.cleardb.net", "b90a7a1ef0fb35", "6e62399d");

$fname = $_POST['fname'];
$username = $_POST['username'];
$password = $_POST['password'];

// selects rows with same username as the entered username
$s = " SELECT * FROM Users WHERE UserName = '$username'";

// checks whether an account with such username already exists
if($num==1){
    echo "Username already taken";
}else{
    echo "Account created";
}

?>

