<?php

$connection = mysqli_connect("eu-cdbr-west-02.cleardb.net", "b90a7a1ef0fb35", "6e62399d");

if($connection->connect_error){
    die("connection failed");
}
echo "connected successfully";


?>