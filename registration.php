<?php

// establishes connection to database
$connection = mysqli_connect("eu-cdbr-west-02.cleardb.net", "b90a7a1ef0fb35", "6e62399d");

// retrieves the variables entered in the form
$first_name = $_POST['fname'];
$un = $_POST['username'];
$pw = $_POST['password'];

// selects rows with same username as the entered username
$s = " SELECT * FROM Users WHERE UserName = '$un'";

$result = mysqli_query($con, $s);

$num = mysqli_num_rows($result);

// checks whether an account with such username already exists
if($num>0){
    echo "Username already taken";
}else{
    echo "Account created";
}

?>


