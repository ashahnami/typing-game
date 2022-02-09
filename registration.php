<?php

// establishes connection to server
$connection = mysqli_connect("eu-cdbr-west-02.cleardb.net", "b90a7a1ef0fb35", "6e62399d");

// selects which database to use
mysqli_select_db($connection, 'heroku_596c4064b5db331');

// retrieves the variables entered in the form
$first_name = $_POST['fname'];
$un = $_POST['username'];
$pw = $_POST['password'];

$hashed_password = hash('sha256', $pw);
echo $hashed_password;

// selects rows with same username as the entered username
$s = " SELECT * FROM users WHERE UserName = '$un'";

$result = mysqli_query($connection, $s);

// holds the number of rows with the same username as the entered username
$num_of_rows = mysqli_num_rows($result);

// checks whether an account with such username already exists
if($num_of_rows>0){
    echo "Username already taken";
}else{
    echo "Account created";
}

?>




